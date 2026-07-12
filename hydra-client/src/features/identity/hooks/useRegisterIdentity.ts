import { useMutation } from "@tanstack/react-query";

import { registerIdentity } from "../api/register-Identity";

export const useRegisterIdentity = () => {
  return useMutation({
    mutationFn: registerIdentity,
  });
};