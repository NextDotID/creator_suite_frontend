import styles from "./styles/content.module.css";
import contentFileABI from "../../constants/abis/ContentSubscription.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { assetID, unlockContractAddress } from "../../constants/contract";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ContentPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { address: account } = useAccount();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const router = useRouter();

  const { data: checkPaymentRes, isLoading: checkPaymentLoading } =
    useContractRead({
      address: unlockContractAddress,
      abi: contentFileABI.abi,
      functionName: "isQualified",
      args: [account, assetID],
    });
  // todo: check the router jump
  useEffect(() => {
    setIsUnlocked(checkPaymentRes as boolean);
    if (!checkPaymentLoading && router && router.isReady && !isUnlocked) {
      router.push({
        pathname: "/buyer/pay",
      });
    }
  }, [checkPaymentRes]);

  

  return (
    <div className={styles.container}>
      <div className={styles.connect}>
        <ConnectButton />
      </div>

      <h3 className={styles.title}>
        Thanks for support!! You can get the encrypted content and then decrypt
        it with your own private key.
      </h3>

      <div className={styles.connect}>
        <button
          className={styles.mainButton}
        >
          {loading ? <div className={styles.loading}></div> : "Get Content"}
        </button>
      </div>

      {/* </main> */}
    </div>
  );
}
