# entity
This is a simple, minimal implementation of cryptographic entities in TypeScript/JavaScript.

## Why?
It seemed the next thing for us to do was to create the "account" abstraction to make some things a bit easier, more convenient, and familiar. As we've done before, we do this with a "policy-parameterized class factory", where the current policies are an ECDSA instance and an address deriving function. With "EVM-ECDSA" and an EVM address deriving policy, we can generate an "EVM-Entity" class, whose instances can be generated randomly, created with a secret, addresses can be easily obtained, messages can be signed, etc.

## Installation
```sh
npm i @bradthomasbrown/entity
```

## Usage
```js
import { sha_3, keccak_c } from "@bradthomasbrown/keccak";
import { _e40215_ } from "@bradthomasbrown/entity";
import { _6aab57_ } from "@bradthomasbrown/ecdsa/concrete";

const encoder = new TextEncoder();

// create the keccak-256 hashing function
const keccak256 = sha_3(keccak_c, 512, 0b0, 0);

// create the address deriving policy
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

// create the EvmEntity class using the EVM-flavored ECDSA class `_6aab57_` and the EVM address-deriving policy `_1d2f57_`
const EvmEntity = _e40215_(_6aab57_, _1d2f57_);

// now we can easily create an "entity" which may normally be called an "account"
//  and we can get the address, public key, sign messages, 
//  and even use the underlying EVM-ECDSA to verify our signature or the signature's recovery result are our entity (or "account")
const secret = 67546559734169151049750073306858167224481616672714023486695923696765722947804n;
const entity = new EvmEntity(secret);
console.log(entity.publicHex);
// 3b5c87c458feed0533806d9e8d88908b9a7dee88eed6e4ee1566c71e253ce54f1024ff2a6b9916aecfe926659427b99a3f60eb23e77df5d1ef436787243cbbbe
console.log(entity.address);
// 0x43e6e60706cd7c33440ec5a0b1159708a80e308f
const message = encoder.encode("hello world");
const signature = entity.sign(message);
console.log(signature);
// { r: ..., s: ..., v: ... }
console.log(entity._6e_.verify(entity.public, signature, message));
// true
console.log(entity.public.equals(entity._6e_.recover(signature, message)));
// true
```