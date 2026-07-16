import { api } from "@/shared/lib/axios/axios";

import type { RegisterIdentityPayload } from "../types/register-identity";

export const registerIdentity = async (payload: RegisterIdentityPayload) => {
  const { data } = await api.post("/register", payload);

  return data;
};
