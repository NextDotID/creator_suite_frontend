import useSWRMutation from "swr/mutation";
import { createCreation, getCount } from "../database";
import { connectIfNeeded, createAsset, getAssetId } from "../connections";
import { isValidAddress } from "../helpers/isValidAddress";
import { isGreaterThan } from "../helpers/isGreaterThan";
import { getSubscriptionContractAddress } from "../helpers/getSubscriptionContractAddress";

async function getNextAvailableCreationId(params) {
  const {
    encryptionType,
    fileExtension,
    creator,
    file,
    name,
    description,
    password,
  } = params;

  if (params.encryptionType === 1 && !params.password) {
    return null;
  }
  const reqData = new FormData();

  const createAssetReq = {
    managed_contract: getSubscriptionContractAddress(),
    network: "mumbai",
    content_name: name,
    description: description,
    password: password ?? "",
    encryption_type: encryptionType,
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
    .then((c) => c.content_id);
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
        name,
        description,
        encryption_type,
        password,
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
        // 1 password 2 null
        encryptionType: encryption_type,
        fileExtension: attachments[0].name.split(".")[1],
        creator: ownerAddress,
        file,
        name,
        description,
        password,
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
