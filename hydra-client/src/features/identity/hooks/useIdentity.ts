import { useQuery } from "@tanstack/react-query";
import { getIdentityKeys } from "../storage/keys";

export function useIdentity() {
  return useQuery({
    queryKey: ["identity"],
    queryFn: getIdentityKeys,
    staleTime: Infinity,
  });
}