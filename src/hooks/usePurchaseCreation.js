import useSWRMutation from "swr/mutation";
import { getCreation, purchaseCreation } from "../database";
import {
  allowance,
  approve,
  balanceOf,
  connectIfNeeded,
  getAssetId,
  isQualified,
  purchaseAsset,
} from "../connections";
import { isGreaterThanOrEqualTo } from "../helpers/isGreaterThanOrEqualTo";
import { getSubscriptionContractAddress } from "../helpers/getSubscriptionContractAddress";
import { isZero } from "../helpers/isZero";
import BigNumber from "bignumber.js";

const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

/**
 * Use to purchase a creation
 * @param {string} creationId
 * @param {string} buyer the buyer address
 * @returns
 */
export function usePurchaseCreation(creationId, buyer, creation) {
  return useSWRMutation(
    `usePurchaseCreation_${creationId}_${buyer}`,
    async () => {
      await connectIfNeeded();

      const { paymentTokenAddress, paymentTokenAmount } = creation;
      console.log(creation, "creation");
      const assetId = await getAssetId(creation.ownerAddress, creationId);
      if (isZero(assetId)) throw new Error("Cannot find asset.");

      const balance = await balanceOf(paymentTokenAddress, buyer);
      if (!isGreaterThanOrEqualTo(balance, paymentTokenAmount.toString())) {
        throw new Error("Insufficient balance.");
      }
      const amount = await allowance(
        paymentTokenAddress,
        buyer,
        getSubscriptionContractAddress()
      );
      if (!isGreaterThanOrEqualTo(amount, paymentTokenAmount.toString())) {
        await approve(
          paymentTokenAddress,
          getSubscriptionContractAddress(),
          MAX_UINT256
        );
      }

      const qualified = await isQualified(buyer, assetId);
      if (qualified) throw new Error("Already purchased.");

      const transactionHash = await purchaseAsset(assetId);
      return purchaseCreation(creationId, buyer, transactionHash);
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
