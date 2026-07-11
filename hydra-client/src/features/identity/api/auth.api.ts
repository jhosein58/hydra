import { api } from "@/lib/axios";

import { LoginSchema } from "../schemas/login.schema";
import { SignupSchema } from "../schemas/sign-up.schema";

export const login = async (data: LoginSchema) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const signup = async (data: SignupSchema) => {
  const { confirmPassword, ...payload } = data;
  
  const response = await api.post("/auth/signup", payload);

  return response.data;
};
