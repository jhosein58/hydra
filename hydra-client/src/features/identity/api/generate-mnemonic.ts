import { api } from "@/shared/lib/axios/api";

export const generateMnemonic = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/register/mnemonic");

  return data;
};
