import { useState, useEffect, useRef } from "react";
import { socketService } from "@/shared/lib/websocket/socket-service";

export function useProfile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const unsubscribersRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    async function initProfile() {
      const unsubProfileUpdate = socketService.on("Profile", (data) => {
        setProfileData(data);
        setLoading(false);
      });

      unsubscribersRef.current.push(unsubProfileUpdate);

      socketService.send({ type: "GetProfile" });
    }

    initProfile();

    return () => {
      unsubscribersRef.current.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const updateProfile = (data: any) => {
    socketService.send({
      type: "ProfileUpdated",
      data,
    });
  };

  return { profileData, loading, updateProfile };
}
