// export async function getUnlockedContent(_privateKey: string) {
//   try {
//     const privateKey = Buffer.from(_privateKey, "hex");
//     const publicKey = (await getPublic(privateKey)).toString("hex");
//     // content_id = 11 => encryption_type = 1
//     // content_id =3 => encryption_type = 2

//     const data = fetch(
//       `http://localhost:8000/api/v1/get-content?public_key=${publicKey}&content_id=3`
//     ).then((res) => res.json());

//     // console.log(status, data);
//     // todo: clear the mock data

//     if (data.encryption_type == 1) {
//       const ethereum = window.ethereum;
//       let password;
//       if (ethereum) {
//         password = ethereum
//           .request({
//             method: "eth_decrypt",
//             params: [data.encrypted_result.substring(2), accounts[0]],
//           })
//           .then((de) => {
//             console.log("decrypted", de);
//           })
//           .catch((e) => console.error("error", e));
//       }
//       // 使用 对称加密时， encryption_type== 1
//       // 流程是，先得到password，download 加密文件 from ipfs, 再用password 解密真正的file

//       console.log("password:", password.toString());
//       console.log(data, "data");
//       const chunks = [];

//       try {
//         const node = await IPFS.create();
//         //const node = await IPFS.create();
//         console.log("ipfs init", node);

//         //const promiseArray = [];
//         for await (const chunk of node.cat(data.location_url)) {
//           chunks.push(chunk);
//         }

//         console.log("chunk");
//         console.log(Buffer.concat(chunks).toString());
//       } catch (err) {
//         console.log(err);
//         return;
//       }

//       //const src = readFile(path.join(process.cwd(), 'README.md.enc'));
//       const dst = path.join(process.cwd(), "/test." + data.file_extension);
//       // const password = '012345678901234567890';
//       const dare = new DARE(password);
//       const nn = await Promise.resolve(
//         dare.Decrypt(Buffer.concat(chunks).toString(), dst)
//       );

//       console.log("number of package:", nn);
//     } else {
//       //  encryption_type== 2, 这种情况，encrypted_result 是加密后的原文件
//       //  直接用privatekey 解密，再写到文件即可
//       const bytes = await decrypt(
//         privateKey,
//         Buffer.from(data.encrypted_result.substring(2), "hex")
//       );
//       download(
//         bytes,
//         "application/pdf;charset=UTF-8",
//         `result.${data.file_extension}`
//       );
//       return true;
//     }
//   } catch (e) {
//     console.error("error", e);
//     return false;
//   }
// }

export default null;
