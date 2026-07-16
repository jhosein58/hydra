import type { ServerMessage } from "./types";

export function handleMessage(message: ServerMessage) {
  switch (message.type) {
    case "AuthStatus":
      console.log(message.authenticated);
      break;

    case "Challenge":
      console.log(message.challenge);
      break;
    case "Authenticated":
      console.log("authenticated");
      break;
  }
}
