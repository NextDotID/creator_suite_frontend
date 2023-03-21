import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { checkPayment } from "../util/checkPayment";
import { getUnlockedContent } from "../util/getContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isValidAddress } from "../util/utils";

export default function Home() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(undefined);
  const [qualityLoading,setQualityLoading] = useState(false)
  const account = useAddress();
  const router = useRouter();
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
    "https://polygon-mumbai.g.alchemy.com/v2/QhvX4qOioLUDa6j2irFJVNVXQqmOv1Zm"
  );

  useEffect(() => {
    setQualityLoading(true);
    if (!isValidAddress(account)) return;
    (async function foo() {
      const res = await checkPayment(sdk, account as string);
      if (res !== undefined) setIsUnlocked(res);
    })();
    setQualityLoading(false);
  }, [account, sdk]);

  if (
    !qualityLoading&&
    router &&
    router.isReady &&
    isUnlocked === false
  ) {
    console.log("User doesn't have an NFT! Redirecting...");
    router.push({
      pathname: "/login",
    });
  }
  
  if (qualityLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loading}></div>
      </div>
    );
  return (
    <div className={styles.container}>
      {/* <main className={styles.main}> */}

      <div className={styles.connect}>
        <ConnectWallet accentColor="#F213A4" />
      </div>

      <h1 className={styles.title}>
        Thanks for support!! You can get the encrypted content and then decrypt
        it with your own private key.
      </h1>
      <div className={styles.connect}>
        <input
          type="password"
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
            setLoading(true);
            await getUnlockedContent(key);
            setLoading(false);
          }}
        >
          {loading ? <div className={styles.loading}></div> : "Get Content"}
        </button>
      </div>

      {/* </main> */}
    </div>
  );
}
