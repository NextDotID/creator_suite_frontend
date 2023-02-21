import { useEffect, useState } from "react";
import styles from "./styles/content.module.css";
import { useRouter } from "next/router";
import { BigNumber } from "ethers";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import contentFileABI from "../../constants/abis/ContentSubscription.json";
import paymentTokenABI from "../../constants/abis/TestTokenA.json";
import {
  assetID,
  unlockContractAddress,
  tokenContractAddress,
} from "../../constants/contract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "../../components/button";

export default function PayPage() {
  const { address } = useAccount(); // Get the user's address
  const router = useRouter();

  const [paymentToken, setToken] = useState("");
  const [price, setPrice] = useState<string>("");
  const [isApproved, setIsApproved] = useState(false);

  const {
    data: paymentTokenInfo,
    isLoading: getPaymentTokenLoading,
  }: { data: any; isLoading: boolean } = useContractRead({
    address: unlockContractAddress,
    abi: contentFileABI.abi,
    functionName: "assetById",
    args: [assetID],
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: tokenContractAddress,
    abi: paymentTokenABI.abi,
    functionName: "approve",
    args: [unlockContractAddress, BigNumber.from(price || 0)],
  });

  const {
    data: ApproveRes,
    isLoading: isApproveLoading,
    write: onApprove,
  } = useContractWrite({
    ...approveConfig,
  });

  const { config: unlockConfig } = usePrepareContractWrite({
    address: unlockContractAddress,
    abi: contentFileABI.abi,
    functionName: "purchaseAsset",
    args: [assetID],
  });

  const { isLoading: isUnlockLoading, write: onUnlock } = useContractWrite({
    ...unlockConfig,
  });

  useEffect(() => {
    if (paymentTokenInfo) {
      setToken(paymentTokenInfo.paymentToken);
      setPrice(BigNumber.from(paymentTokenInfo.amount).toString());
    }
    if (ApproveRes) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [paymentTokenInfo, ApproveRes]);

  return (
    <div className={styles.container}>
      <hr className={styles.divider} />
      <div>
        Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}
      </div>

      <ConnectButton />

      <h1 className={styles.h1}>What will 2023 bring for Aries?</h1>

      <div>Aries Horoscope for the Year 2023 ...</div>
      {/* {utils.parseUnits(price, 'ether')} */}
      <div className={styles.explain}>
        {price || "0"} TESTA to unlock the whole content;
      </div>

      <Button onClick={() => onApprove?.()}>Approve Token</Button>

      <br></br>

      <Button onClick={() => onUnlock?.()}>Pay to Unlock</Button>
    </div>
  );
}
