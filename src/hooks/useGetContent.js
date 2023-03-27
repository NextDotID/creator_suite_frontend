import useSWR from "swr";

export function useGetContent(publicKey, id) {
  return useSWR(
    `useGetContent_${publicKey}_${id}`,
    async () => {
      const res = await fetch(`http://localhost:8000/api/v1/get-content`, {
        body: JSON.stringify({
          public_key: publicKey,
          content_id: id,
        }),
      });
      if (res) {
        const _res = await res.json();
        console.log(_res, "ecriptedData");
      }
      return true;
    },
    {
      suspense: true,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );
}
