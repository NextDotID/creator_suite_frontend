import useSWRMutation from "swr/mutation";
import { createCreation, getCount } from "../database";
import { connectIfNeeded, createAsset, getAssetId } from "../connections";
import { isValidAddress } from "../helpers/isValidAddress";
import { isGreaterThan } from "../helpers/isGreaterThan";

async function getNextAvailableCreationId(params) {
  const { tokenAddress, amount, encryptionType, fileExtension, creator, file } =
    params;

  if (params.encryptionType === 1 && !params.password) {
    return null;
  }
  const reqData = new FormData();

  const createAssetReq = {
    managed_contract: "0x3A6c014579583c5D412A9F3914a67C0885dB90c0",
    network: "mumbai",
    payment_token_address: tokenAddress,
    payment_token_amount: amount,
    password: params.password ?? "",
    encryption_type: encryptionType,
    file_extension: fileExtension,
    creator_address: creator,
    file: file,
  };
  for (const name in createAssetReq) {
    reqData.append(name, createAssetReq[name]);
  }

  const res = fetch("http://localhost:8000/api/v1/create", {
    method: "POST",
    body: reqData,
  })
    .then((r) => r.json())
    .then((c) =>c.content_id);
  return res;
}

/**
 * Use to create a creation
 * @param {object} creation
 * @returns
 */
export function useCreateCreation(creation) {
  return useSWRMutation(
    "useCreateCreation",
    async () => {
      await connectIfNeeded();

      const {
        ownerAddress,
        paymentTokenAddress,
        paymentTokenAmount,
        attachments,
        file,
      } = creation;

      if (!isValidAddress(ownerAddress))
        throw new Error("Invalid owner address.");
      if (!isValidAddress(paymentTokenAddress))
        throw new Error("Invalid payment token address.");
      if (!isGreaterThan(paymentTokenAmount || 0, 0))
        throw new Error("Invalid payment token amount.");
      const creationId = await getNextAvailableCreationId({
        tokenAddress: paymentTokenAddress,
        amount: paymentTokenAmount,
        encryptionType: 0,
        fileExtension: attachments[0].name.split(".")[1],
        creator: ownerAddress,
        file: file,
      });
      const transactionHash = await createAsset(
        creationId,
        paymentTokenAddress,
        paymentTokenAmount
      );


      return createCreation({
        ...creation,
        id: creationId,
        transactionHash,
      });
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
