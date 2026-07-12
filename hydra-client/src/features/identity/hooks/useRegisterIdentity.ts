import { useMutation } from "@tanstack/react-query";

import { registerIdentity } from "../api/register-Identity";
import { useRouter } from "next/navigation";

export const useRegisterIdentity = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerIdentity,
    onSuccess: () => router.push("/chat"),
  });
};
