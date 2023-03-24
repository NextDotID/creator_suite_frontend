import useSWR from "swr";

export function usePublicKey(address) {
  return useSWR(
    `usePublicKey_${address}`,
    () => {
      const eth = window.ethereum;
      if (!eth || !address) return null;
      const publicKey = eth
        .request({
          method: "eth_getEncryptionPublicKey",
          params: [address], // you must have access to the specified account
        })
        .then((result) => {
          return result
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
      return Buffer.from(publicKey, "base64").toString("hex");
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
