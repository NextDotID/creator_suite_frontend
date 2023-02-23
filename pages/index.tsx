import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import styles from "../styles/Home.module.css";
import { isSameAddress } from "../utils/address";

const Home: NextPage = () => {
  const {address} = useAccount()
  const router = useRouter()
  useEffect(()=>{
    if(address && isSameAddress(address,process.env.NEXT_PUBLIC_CREATOR_ADDRESS) ){
      router.push({
        pathname:'/creator/files'
      })
    }else{
      router.push({
        pathname:'/buyer/content'
      })
    }
   
  },[address])
  return (
    <div className={styles.container}>
      <Head>
        <title>Creator Suite App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to <a href="">Creator Suite</a>
        </h1>
        <h3>Choose your charatar to start your trip</h3>

      </main>

      <footer className={styles.footer}>
        <a href="https://next.id/" target="_blank" rel="noopener noreferrer">
          Made by NEXT.ID 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
