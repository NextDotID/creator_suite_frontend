import useSWRMutation from "swr/mutation";
import { useAccount } from "wagmi";
export function useGetContent(publicKey, id) {
  const { address } = useAccount();
  return useSWRMutation(
    `useGetContent_${publicKey}_${id}`,
    async () => {
      if (!window.ethereum) return;
      const SignPayload = `Payment account: ${address}, timestamp:${Math.round(new Date().getTime()/1000)}`;
      let sig = null;
      try {
        const eth = window.ethereum;
        const msg = `0x${Buffer.from(SignPayload, "utf8").toString("hex")}`;
        sig = await eth.request({
          method: "personal_sign",
          params: [msg, address, "Example password"],
        });
      } catch (err) {
        console.error(err);
      }
      const res = await fetch("http://localhost:8000/api/v1/get-content", {
        method: "POST",
        body: JSON.stringify({
          content_id: Number(id),
          encryption_public_key: publicKey,
          signature_payload: SignPayload,
          signature: sig,
        }),
      });
      if (res) {
        const _res = await res.json();
        return _res
      }
      return null;
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
