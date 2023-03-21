import contractFile from "../artifacts/contracts/ContentSubscription.sol/ContentSubscription.json";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { assetID } from "../const/yourDetails";


export default async function getPaymentTokenAndPrice() {
  // Ensure we are able to generate an auth token using our private key instantiated SDK
  const NEXT_PUBLIC_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  if (!NEXT_PUBLIC_PRIVATE_KEY) {
    throw new Error("You need to add an NEXT_PUBLIC_PRIVATE_KEY environment variable.");
  }

  // Instantiate our SDK
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    "https://polygon-mumbai.g.alchemy.com/v2/QhvX4qOioLUDa6j2irFJVNVXQqmOv1Zm"
  );

  const contract = await sdk.getContractFromAbi("0xD82AEE2719B1D63961c3bC7971F51E2aCa725fE7", contractFile.abi);
  //console.log(contract);

  // Read data using direct calls to your contract
  const asset = await contract.call("assetById", assetID);

  return {paymentToken: asset.paymentToken, price: asset.amount.toString()};  
}