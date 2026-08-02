import { socketService } from "@/shared/lib/websocket/socket-service";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "./UserProfile.schema";

export function useUserProfile() {
  const [profileData, setProfileData] = useState<UserProfile>({
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

  return { profileData, loading };
}
