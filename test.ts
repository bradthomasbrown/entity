import { _6aab57_ } from "@bradthomasbrown/ecdsa/concrete";
import { EvmEntity } from "@bradthomasbrown/entity/evm";

const encoder = new TextEncoder();

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

// produce some random EvmEntity instances until we find one whose address starts with a zero, logging them as we go
let randy:InstanceType<typeof EvmEntity>;
do {
    randy = EvmEntity.random();
    console.log(randy.address);
}
while (randy.address.charAt(2) != "0");
// 0x4cb088e93c2885f8a7c0f42a15ef7043a5ca949d
// 0x8f677b2194d708b96c6dff5544a6f8fa2b3dc435
// ...
// 0x0468309fb3541b294e93648002043f3f0aba0445

{
    const entity = new EvmEntity(0x062A8B9E8B4773E6AFB1B2D9CC4371E20970C98050EEB12AEA3B679C3AF9BF6Dn);
    console.log(entity.address);
    // 0x58e8adaa8a4c8b84655a4bbe9c347ad37fbebdc0
}