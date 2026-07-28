import { useState, useEffect, useRef, useCallback } from "react";
import { socketService } from "@/shared/lib/websocket/socket-service";
import { Profile } from "../schema/profile.schema";

export function useProfile() {
  const [profileData, setProfileData] = useState<Profile>({
    name: "defalt name",
    username: "defalt username",
    bio: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  const unsubscribersRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    const unsubProfileUpdate = socketService.on("Profile", (data) => {
      setProfileData(data);
      setLoading(false);
    });

    const unsubProfileUpdated = socketService.on("ProfileUpdated", () => {
      socketService.send({ type: "GetProfile" });
    });

    unsubscribersRef.current.push(unsubProfileUpdate, unsubProfileUpdated);

    socketService.send({ type: "GetProfile" });

    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const updateProfile = useCallback((data: any) => {
    socketService.send({
      type: "UpdateProfile",
      data,
    });
  }, []);

  return { profileData, loading, updateProfile };
}
