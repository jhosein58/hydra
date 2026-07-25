import { socketService } from "@/shared/websocket/socket-service";

type Payload = {
  name: string | null;
  bio: string | null;
  username: string | null;
};

export function updateProfile(payload: Payload) {
  socketService.send({
    type: "UpdateProfile",
    data: payload,
  });
}
