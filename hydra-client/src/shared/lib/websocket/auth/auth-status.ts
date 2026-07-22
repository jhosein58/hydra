import { socketService } from "../socket";

export function checkAuthStatus() {
  socketService.send({
    type: "AuthStatus",
  });
}
