import { socketService } from "@/shared/lib/websocket/socket";

export function getProfile() {
  socketService.send({
    type: "GetProfile",
  });
}