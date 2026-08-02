import { socketService } from "@/shared/lib/websocket/socket-service";
import { UserProfile } from "@/entities/user";

export function updateProfile(data: UserProfile) {
  socketService.send({
    type: "UpdateProfile",
    data,
  });
}
