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
  console.log("kkkk", file);
  const extension = file.file_extension || "png";
  const file_name = "defualt_file_name";
  const { address } = useAccount();
  return useSWRMutation(
    "useDecryptDataAndDownload",
    async () => {
      const eth = window.ethereum;
      if (!eth) return null;
      const _decryptedFileBytes = eth
        .request({
          method: "eth_decrypt",
          params: [file.encrypted_result, address],
        })
        .then((decryptedMessage) => decryptedMessage)
        .catch((error) => {
          console.error("error", error);
          null;
        });
      return download(_decryptedFileBytes, extension, file_name);
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
