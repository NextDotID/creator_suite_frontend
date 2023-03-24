import useSWRMutation from "swr/mutation";
import { download } from "../helpers/download";

/**
 * Use to purchase a creation
 * @param {string} creationId
 * @param {string} buyer the buyer address
 * @returns
 */
export function useDecryptDataAndDownload(
  file,
  extension = "png",
  file_name = "defualt_file_name"
) {
  return useSWRMutation(
    "useDecryptDataAndDownload",
    async () => {
      // todo: decryt
      const eth = window.ethereum;
      if (!eth) return null;
      const _decryptedFileBytes = eth
        .request({
          method: "eth_decrypt",
          params: [file, accounts[0]],
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
