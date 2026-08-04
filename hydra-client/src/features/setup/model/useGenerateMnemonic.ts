import { useQuery } from "@tanstack/react-query";

import { generateMnemonic } from "../api/generate-mnemonic";

export const useGenerateMnemonic = () => {
  return useQuery({
    queryKey: ["identity", "mnemonic"],
    queryFn: generateMnemonic,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
