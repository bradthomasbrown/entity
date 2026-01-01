import { _6aab57_ } from "@bradthomasbrown/ecdsa/concrete";
import { _e40215_ } from "@bradthomasbrown/entity";
import { keccak256 } from "@bradthomasbrown/keccak/keccak256";

function _1d2f57_(_0b_:InstanceType<ReturnType<typeof _e40215_>>):string {
    const Qu = _0b_.public;
    const QuBytes = new Uint8Array(_0b_.hashlen);
    let i;
    let x = Qu.x!;
    let y = Qu.y!;
    for (i = QuBytes.byteLength - 1; y > 0n; y >>= 8n, i--) QuBytes[i] = Number(y & 0xffn);
    for (i = (QuBytes.byteLength >> 1) - 1; x > 0n; x >>= 8n, i--) QuBytes[i] = Number(x & 0xffn);
    return `0x${keccak256(QuBytes).slice(12).toHex()}`;
}

const EvmEntity = _e40215_(_6aab57_, _1d2f57_);

export { EvmEntity };