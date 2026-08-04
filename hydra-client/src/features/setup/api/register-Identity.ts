import { api } from "@/shared/lib/axios/api";

import type { RegisterIdentityPayload } from "../model/RegisterIdentity.type";

export const registerIdentity = async (payload: RegisterIdentityPayload) => {
  const { data } = await api.post("/register", payload);

  return data;
};
