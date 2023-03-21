import { assetID, unlockContractAddress} from "../const/yourDetails";
import axios from "axios";
import { ethers } from "ethers";
import { useAddress, useContract, useContractRead} from "@thirdweb-dev/react";
import contractFile from "../artifacts/contracts/ContentSubscription.sol/ContentSubscription.json";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { isValidAddress } from "./utils";


export async function checkPayment(sdk: ThirdwebSDK, address:string) {
  if(!isValidAddress(address)) return 
  const contract = await sdk.getContractFromAbi(unlockContractAddress, contractFile.abi);
  const isQualified = await contract.call("isQualified", address, assetID);
  console.log("isQualified:", isQualified);
  return isQualified;  
}

