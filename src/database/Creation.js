import { chain, isNil, isEmpty } from "lodash";
import { createInstance } from "localforage";
import { commitCount } from "./Counter";
import { isSameAddress } from "../helpers/isSameAddress";
import { isGreaterThan } from "../helpers/isGreaterThan";
import { isValidAddress } from "../helpers/isValidAddress";
import { delay } from "../helpers/delay";
import { readContract } from "@wagmi/core";
import ContentSubscriptionABI from "../abis/ContentSubscription.json";

const unlockContractAddress = "0xD82AEE2719B1D63961c3bC7971F51E2aCa725fE7";

const creationStore = createInstance({
  name: "CreatorSuite",
  version: 3,
});

function isRemoved(creation) {
  return creation && creation.createdAt === 0;
}

function validateCreation(creation) {
  // id
  if (typeof creation.id === "undefined") throw new Error("No id.");

  // hash
  if (!creation.transactionHash) throw new Error("No transaction hash.");

  // name
  if (!creation.name) throw new Error("No name.");
  if (typeof creation.name !== "string") throw new Error("Invalid name.");

  // description
  if (typeof creation.description !== "string")
    throw new Error("Invalid description.");

  // owner
  if (!creation.ownerAddress) throw new Error("No owner address.");
  if (!isValidAddress(creation.ownerAddress))
    throw new Error("No a valid owner address.");

  // payment token
  if (!isValidAddress(creation.paymentTokenAddress))
    throw new Error("No a valid payment token address.");
  if (!isGreaterThan(creation.paymentTokenAmount || 0, 0))
    throw new Error("Invalid payment token amount.");

  // buyers
  if (!Array.isArray(creation.buyers)) throw new Error("No buyer addresses.");
  if (creation.buyers.some((x) => !isValidAddress(x.address)))
    throw new Error("Invalid buyer address.");

  // attachments
  if (!creation.attachments.length) throw new Error("No attachments.");
  const attachment = creation.attachments[0];
  if (!attachment.name) throw new Error("No attachment name.");
  if (!attachment.content) throw new Error("No attachment content.");

  // dates
  if (!creation.createdAt) throw new Error("No created at.");
  if (!creation.updatedAt) throw new Error("No updated at.");

  return creation;
}

/**
 * Create a creation from scratch
 * @param {string} id
 * @param {string} transactionHash
 * @param {string} name
 * @param {string} description
 * @param {string} ownerAddress
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @param {string[]} attachments
 * @param {string[]} buyers
 * @returns
 */
export async function createCreation(initials) {
  await delay(500);

  const { id: creationId, ownerAddress } = initials;
  const creation = await getCreation(creationId);
  if (creation) throw new Error("Already exists.");

  const now = Date.now();

  await creationStore.setItem(
    creationId,
    validateCreation({
      ...initials,
      id: creationId,
      attachments: initials.attachments ?? [],
      buyers: initials.buyers ?? [],
      createdAt: now,
      updatedAt: now,
    })
  );

  await commitCount(ownerAddress);
  return creationStore.getItem(creationId);
}

/**
 * Purchase creation
 * @param {string} creationId
 * @param {string} buyer buyer address
 * @returns
 */
export async function purchaseCreation(creationId, buyer, transactionHash) {
  const creation = await getCreation(creationId);
  if (!creation) throw new Error("Cannnot find creation.");

  if (!isValidAddress(buyer)) throw new Error("Invalid buyer address.");

  // the buyer have bought the creation
  if (creation.buyers.some((x) => isSameAddress(x.address, buyer)))
    return creation;

  return updateCreation(creationId, {
    buyers: [
      {
        address: buyer,
        transactionHash,
      },
    ],
  });
}

/**
 * Update a preexist creation
 * @param {string} creationId
 * @param {object} updates
 * @returns
 */
export async function updateCreation(creationId, updates) {
  const creation = await getCreation(creationId);
  if (!creation) throw new Error("Cannnot find creation.");

  const mergedCreation = {
    ...creation,
    ...chain(updates)
      .omitBy(isNil)
      .omitBy(isNaN)
      .omitBy(isEmpty)
      .omitBy((x) => x === "")
      .value(),
    attachments: creation.attachments,
    buyers: chain([...creation.buyers, ...updates.buyers])
      .filter((x) => isValidAddress(x.address))
      .uniqBy((y) => y.address.toLowerCase())
      .value(),
    updatedAt: Date.now(),
  };

  await creationStore.setItem(creationId, validateCreation(mergedCreation));
  return getCreation(creationId);
}

/**
 * Delete a creation
 * @param {string} creationId
 */
export async function removeCreation(creationId) {
  await delay(500);
  const creation = await getCreation(creationId);
  if (!creation) throw new Error("Cannnot find creation.");

  await creationStore.setItem(creationId, {
    ...creation,
    // tag a removed creation
    createdAt: 0,
  });
}

/**
 * Fetch a creation
 * @param {string} creationId
 * @returns
 */
/**
 * Create a creation from scratch
 * @param {string} id
 * @param {string} transactionHash
 * @param {string} name
 * @param {string} description
 * @param {string} ownerAddress
 * @param {string} paymentTokenAddress
 * @param {string} paymentTokenAmount
 * @param {string[]} attachments
 * @param {string[]} buyers
 * @returns
 */
export async function getCreation(creationId,creator) {
  // other db methods depend on getCreation()
  // await delay(500)

  const assetId = await readContract({
    address: unlockContractAddress,
    abi: ContentSubscriptionABI,
    functionName: "getAssetId",
    args: [creator,creationId],
  })
  const paymentTokenInfo = await readContract({
    address: unlockContractAddress,
    abi: ContentSubscriptionABI,
    functionName: "assetById",
    args: [assetId],
  });

  const creation = {
    id: creationId,
    transactionHash: "",
    name: "test",
    description: "sss",
    ownerAddress: "xxx",
    paymentTokenAddress: paymentTokenInfo.paymentToken,
    paymentTokenAmount: paymentTokenInfo.amount,
    attachments: [],
    buyers: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return creation;
}

/**
 * Get all creations
 * @returns
 */
export async function getAllCreations() {
  const creations = [];
  const res = await fetch("http://localhost:8000/api/v1/file/list", {
    method: "POST",
    body: JSON.stringify({
      path: "/storage",
    }),
  });
  const list = await res.json();

  if (list) {
    list.folders.map((x, key) => {
      creations.push({
        id: x.content_id,
        ...x,
      });
    });
  }

  return creations
    .sort((a, z) => z.updatedAt - a.updatedAt)
    .filter((x) => !isRemoved(x));
}

/**
 * Fetch all creations owned by the owner
 * @param {string} owner
 * @returns
 */
export async function getAllOwnedCreations(owner) {
  if (!isValidAddress(owner)) return [];

  const creations = [];

  await delay(500);
  await creationStore.iterate((value, key) => {
    console.log({
      key,
      value,
    });
    if (isSameAddress(value.ownerAddress, owner)) {
      creations.push({
        id: key,
        ...value,
      });
    }
  });

  return creations
    .sort((a, z) => z.updatedAt - a.updatedAt)
    .filter((x) => !isRemoved(x));
}

/**
 * Fetch all creations purchased by the buyer
 * @param {string} buyer buyer address
 * @returns
 */
export async function getAllPurchasedCreations(buyer) {
  if (!isValidAddress(buyer)) return [];

  const creations = [];

  await delay(500);
  await creationStore.iterate((value, key) => {
    if (value.buyers.some((x) => isSameAddress(x.address, buyer))) {
      creations.push({
        id: key,
        ...value,
      });
    }
  });

  return creations
    .sort((a, z) => z.updatedAt - a.updatedAt)
    .filter((x) => !isRemoved(x));
}
