import { socketService } from "@/shared/websocket/socket-service";

export function getProfile() {
  socketService.send({
    type: "GetProfile",
  });
}
