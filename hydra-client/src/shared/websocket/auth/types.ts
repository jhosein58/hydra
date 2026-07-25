export type ClientMessage =
  | {
      type: "Authenticate";
      device_public_key: string;
    }
  | {
      type: "ChallengeResponse";
      signature: string;
    }
  | {
      type: "AuthStatus";
    };

export type ServerMessage =
  | {
      type: "Challenge";
      data: {
        challenge: string;
      };
    }
  | {
      type: "Authenticated";
    }
  | {
      type: "AuthStatus";
      authenticated: boolean;
    };
