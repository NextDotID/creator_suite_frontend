import useSWR from "swr";
import { useAccount } from "wagmi";
export function useDecryption(oarams) {
  const { address } = useAccount();
  return useSWR(
    `useDecryption`,
    async () => {
      console.log(oarams, "decryption");
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
