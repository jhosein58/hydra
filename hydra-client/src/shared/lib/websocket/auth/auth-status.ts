import { socketService } from "../core/socket";

export function checkAuthStatus() {
  socketService.send({
    type: "AuthStatus",
  });
}
