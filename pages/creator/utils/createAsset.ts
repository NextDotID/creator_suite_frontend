import { fetcher } from "../../../utils/fetch";

interface CreateAssetReqProps {
  tokenAddress: string;
  amount: string;
  encryptionType: number;
  fileExtension: string;
  password?: string;
}
export async function createAsset(params: CreateAssetReqProps) {
  if (params.encryptionType === 1 && !params.password) {
    return null;
  }
  const createAssetReq = {
    // todo: varaibales network and contract address
    managed_contract: "0x3A6c014579583c5D412A9F3914a67C0885dB90c0",
    network: "mumbai",
    payment_token_address: params.tokenAddress,
    payment_token_amount: params.amount,
    password: params.password ?? "",
    encryption_type: params.encryptionType,
    file_extension: params.fileExtension,
  };
  const res = await fetcher("/api/v1/create", {
    methods: "POST",
    body: JSON.stringify(createAssetReq),
  });
  return res;
}
