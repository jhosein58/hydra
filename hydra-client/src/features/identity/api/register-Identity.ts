import { api } from "@/shared/lib/api/axios";

import type { RegisterIdentityPayload } from "../types/register-identity";

export const registerIdentity = async (payload: RegisterIdentityPayload) => {
  const { data } = await api.post("/register", payload);

  return data;
};
