import styles from "./styles/content.module.css";
// import { getUnlockedContent } from "../util/getContent";
import contentFileABI from "../../constants/abis/ContentSubscription.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useContractRead } from "wagmi";
import { assetID, unlockContractAddress } from "../../constants/contract";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ContentPage() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const { address: account } = useAccount();
  const [isUnlocked,setIsUnlocked] = useState(false)
  const router = useRouter();

  const { data: checkPaymentRes, isLoading: checkPaymentLoading } = useContractRead({
    address: unlockContractAddress,
    abi: contentFileABI.abi,
    functionName: "isQualified",
    args: [account, assetID],
    // onSuccess(data) {
    //   addToast("Query Unlock Verication Success", {
    //     appearance: "success",
    //     autoDismiss: true,
    //   });
    // },
    // onError() {
    //   addToast("Query Unlock Verication Error", {
    //     appearance: "error",
    //     autoDismiss: true,
    //   });
    // },
  });
  // todo: check the router jump
//   useEffect(() => {
//     setIsUnlocked(checkPaymentRes as boolean)
//     if (!checkPaymentLoading && router && router.isReady && !isUnlocked) {
//       router.push({
//         pathname: "/buyer/pay",
//       });
//     }
//   }, [checkPaymentRes]);

  // todo: qualityLoading
  if (checkPaymentLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loading}></div>
      </div>
    );
  return (
    <div className={styles.container}>
      {/* <main className={styles.main}> */}

      <div className={styles.connect}>
        <ConnectButton />
      </div>

      <h1 className={styles.title}>
        Thanks for support!! You can get the encrypted content and then decrypt
        it with your own private key.
      </h1>
      <div className={styles.connect}>
        <input
          type="text"
          placeholder="Enter your privateKey to decode"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className={styles.input}
          autoCorrect="off"
          autoFocus
          spellCheck="false"
        />
      </div>
      <div className={styles.connect}>
        <button
          className={styles.mainButton}
          onClick={async () => {
            // await getUnlockedContent(key);
          }}
        >
          {loading ? <div className={styles.loading}></div> : "Get Content"}
        </button>
      </div>

      {/* </main> */}
    </div>
  );
}
