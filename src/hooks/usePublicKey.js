import { add } from "lodash";
import useSWR from "swr";
import nacl from 'tweetnacl';
import { decodeUTF8, encodeUTF8, encodeBase64, decodeHex } from 'tweetnacl-util';
import { ethers } from 'ethers';
import ethUtil from 'ethereumjs-util';
import sigUtil from '@metamask/eth-sig-util';

function hexToUint8Array(hexString) {
  const hex = hexString.trim().replace(/^0x/i, '');
  const uint8 = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.slice(i, i + 2), 16);
    if (isNaN(byte)) {
      throw new Error('Invalid hex string');
    }
    uint8[i / 2] = byte;
  }
  return uint8;
}

function decodeBase64(input) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const paddingChar = '=';
  const lookup = new Uint8Array(256);

  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  let output = new Uint8Array((input.length / 4) * 3);
  let outputIndex = 0;

  for (let i = 0; i < input.length; i += 4) {
    let b1 = lookup[input.charCodeAt(i)];
    let b2 = lookup[input.charCodeAt(i + 1)];
    let b3 = lookup[input.charCodeAt(i + 2)];
    let b4 = lookup[input.charCodeAt(i + 3)];

    let byte1 = (b1 << 2) | (b2 >> 4);
    let byte2 = ((b2 & 15) << 4) | (b3 >> 2);
    let byte3 = ((b3 & 3) << 6) | b4;

    output[outputIndex++] = byte1;
    if (b3 !== 64) output[outputIndex++] = byte2;
    if (b4 !== 64) output[outputIndex++] = byte3;
  }

  return output.slice(0, outputIndex);
}


async function decryptEncryptedPublicKey(encryptedPublicKey) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const encryptedPublicKeyBytes = decodeBase64(encryptedPublicKey);
  console.log("encryptedPublicKeyBytes", Buffer.from(encryptedPublicKeyBytes));
  const nonce = encryptedPublicKeyBytes.slice(0, 16); // Change 24 to 16
  const encryptedMessage = encryptedPublicKeyBytes.slice(16); // Change 24 to 16
  

  console.log("before nonce", nonce);
  const { publicKey: decryptionPublicKey, secretKey: decryptionSecretKey } = nacl.box.keyPair();

  const decryptedMessage = nacl.box.open(encryptedMessage, nonce, decryptionPublicKey, decryptionSecretKey);
  console.log("after nonce", nonce);
  const decryptedPublicKey = encodeUTF8(decryptedMessage);

  return decryptedPublicKey;
}


export function usePublicKey(address) {
  return useSWR(
    `usePublicKey_${address}`,
    () => {
      const eth = window.ethereum;
      if (!eth || !address) return null;
      const publicKey = eth
        .request({
          method: "eth_getEncryptionPublicKey",
          params: [address], // you must have access to the specified account
        })
        .then(async (result) => {
          console.log("eth_getEncryptionPublicKey result", result);

        //const publicKey = "0x04ee6e3f598b446adeb2021e267d69ffaecc5a0e01ac7375c5027d8ae85ba5d43536c0378ef3bdefd2721358f282f0902e683a84b77e0d7db367e06f175ff2676cbf509f50bbd53ddd9175f0f25f4ba74498b5a823919bc3692a2ba552502763f36ab8d62930f440c8c73b3c27084b2d2938ea5a33ad65232eae84912240"
        //const account = eth.request({ method: 'eth_accounts' });

        const encryptedMessage = ethUtil.bufferToHex(
          Buffer.from(
            JSON.stringify(
              sigUtil.encrypt({
                publicKey: result,
                data: 'hello world!',
                version: 'x25519-xsalsa20-poly1305',
              })
            ),
            'utf8'
          )
        );

        console.log(encryptedMessage)

        const account = eth.request({ method: 'eth_accounts' })
        console.log("account0:", account[0]);
        console.log("address:", address);
        const decryptedPublicKey = eth.request({
          method: 'eth_decrypt',
          params: [encryptedMessage, address],
        });
        console.log("decryptedPublicKey", decryptedPublicKey); 
  
        return result
        })
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log("We can't encrypt anything without the key.");
          } else {
            console.error(error);
          }
          return null;
        });

      
      return Buffer.from(publicKey).toString("hex");
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
