import { useQuery } from "@tanstack/react-query";
import { getPrivateKeys } from "../storage/keys";

export function useIdentity() {
  return useQuery({
    queryKey: ["identity"],
    queryFn: getPrivateKeys,
    staleTime: Infinity,
  });
}