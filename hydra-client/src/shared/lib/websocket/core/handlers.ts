import type { ServerMessage } from "./types";
import { handleChallenge } from "../auth/challenge";

export async function handleMessage(message: ServerMessage) {
  switch (message.type) {
    case "AuthStatus":
      console.log(message.authenticated);
      break;

    case "Challenge": {
      handleChallenge(message.data.challenge);
      break;
    }
    case "Authenticated":
      console.log("authenticated");
      break;
  }
}
