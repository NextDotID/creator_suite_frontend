import useSWR from "swr";
import { isValidAddress } from "../helpers/isValidAddress";
import { isQualified, getAssetId } from "../connections";

export function useQualified(creator, address, creationId) {
  return useSWR(
    `useQualified_${address}_${creationId}`,
    async () => {
      if (!creationId || !isValidAddress(address)) return false;
      const assetId = await getAssetId(creator, creationId);
      return await isQualified(address, assetId);
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
