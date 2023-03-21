export function formatKeccakHash(hash, size = 0) {
    if (!/0x\w{64}/.test(hash)) return hash
    if (size === 0) return hash
    return `${hash.slice(0, Math.max(0, 2 + size))}...${hash.slice(-size)}`
}
