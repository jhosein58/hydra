import { useCallback } from "react";
import { socketService } from "@/shared/lib/websocket/socket-service";
import { UserProfile } from "@/entities/user";

export function useProfile() {
  const updateProfile = useCallback((data: UserProfile) => {
    socketService.send({
      type: "UpdateProfile",
      data,
    });
  }, []);

  return { updateProfile };
}
