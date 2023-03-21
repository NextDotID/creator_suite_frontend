import { useAddress, ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { useState } from 'react';
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { BigNumber, utils} from "ethers";
import { assetID, tokenContractAddress, unlockContractAddress } from "../const/yourDetails";
import getPaymentTokenAndPrice from "../util/getPaymentTokenAndPrice";


const contractAbi = require("../artifacts/contracts/ContentSubscription.sol/ContentSubscription.json");
const tokenContractAbi = require("../artifacts/contracts/test_TokenA.sol/TestTokenA.json");

export default function Login() {
  const address = useAddress(); // Get the user's address
  const router = useRouter();

  const [paymentToken, setToken] = useState("");
  const [price, setPrice] = useState("");

  getPaymentTokenAndPrice().then(res => {setToken(res.paymentToken); setPrice(res.price)});
  console.log(paymentToken, price);
 

  return (
    <div className={styles.container}>
      
      <hr className={styles.divider} />

      <>
        <p>
          Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>

        <ConnectWallet accentColor="#F213A4" />

        <h1 className={styles.h1}>What will 2023 bring for Aries?</h1>
        
        <p>
            Aries Horoscope for the Year 2023 ...
        </p>
        {/* {utils.parseUnits(price, 'ether')} */}
        <p className={styles.explain}>
          {price} TESTA to unlock the whole content
        </p>


        <Web3Button
          contractAddress={tokenContractAddress}
          contractAbi={tokenContractAbi.abi}
          action={async (contract) => {
            console.log(contract);
            const res = await contract.call(
              "approve",
              unlockContractAddress,
              BigNumber.from(price)
            );
            console.log(res);
          }}
          accentColor="#F213A4"
        >
          Approve Token
        </Web3Button>

        <br></br>

        <Web3Button
          contractAddress={unlockContractAddress}
          contractAbi={contractAbi.abi}
          action={async (contract) => {   
            const res = await contract.call("purchaseAsset", assetID);
            if (res.receipt.status) {
              router.push({
                pathname: "/",
              });
            }
          }}
          accentColor="#F213A4"
        >
          Pay to Unlock
        </Web3Button>
      </>
    </div>
  );
}

