import { socketService } from "../socket-service";

export function checkAuthStatus() {
  socketService.send({
    type: "AuthStatus",
  });
}
