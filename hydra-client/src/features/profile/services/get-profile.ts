import { socketService } from "@/shared/lib/websocket/socket-service";

export function getProfile() {
  socketService.send({
    type: "GetProfile",
  });
}
