import { EthereumAddress } from "wallet.ts";
export function isValidAddress(address?: string) {
  if (!address) return false;
  return EthereumAddress.isValid(address);
}

export function isSameAddress(
  address?: string | undefined,
  otherAddress?: string | undefined
): boolean {
  if (!address || !otherAddress) return false;
  return address.toLowerCase() === otherAddress.toLowerCase();
}
