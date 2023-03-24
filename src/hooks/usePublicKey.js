import useSWR from "swr";
export function usePublicKey(address) {
  return useSWR(
    `usePublicKey_${address}`,
    async () => {
      const eth = window.ethereum;
      if (!eth || !address) return null;
      const publicKey = await eth
        .request({
          method: "eth_getEncryptionPublicKey",
          params: [address], // you must have access to the specified account
        })
        .then((result) => {
          return result;
        })
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log("We can't encrypt anything without the key.");
          } else {
            console.error(error);
          }
          return null;
        });

      return publicKey;
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
