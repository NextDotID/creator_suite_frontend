import useSWRMutation from "swr/mutation";
import { download } from "../helpers/download";
import { useAccount } from "wagmi";
/**
 * Use to purchase a creation
 * @param {string} creationId
 * @param {string} buyer the buyer address
 * @returns
 */
export function useDecryptDataAndDownload(file) {
  const file_name = "defualt_file_name";
  const { address } = useAccount();
  return useSWRMutation(
    "useDecryptDataAndDownload",
    async () => {
      const eth = window.ethereum;
      if (!eth) return null;
      const _decryptedFileBytes = await eth
        .request({
          method: "eth_decrypt",
          params: [file.encrypted_result, address],
        })
        .then((decryptedMessage) => decryptedMessage)
        .catch((error) => {
          console.error("error", error);
          null;
        });
      return download(_decryptedFileBytes, file?.file_extension, file_name);
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
