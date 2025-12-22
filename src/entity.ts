import { FinitePoint } from "@bradthomasbrown/finite-curve";
import { _66a7cf_ } from "@bradthomasbrown/ecdsa";

function _e40215_<S extends { r:bigint, s:bigint },A,Q>(
    _be_:InstanceType<ReturnType<typeof _66a7cf_<S,Q>>>,
    _81_:(_d1_:InstanceType<ReturnType<typeof _e40215_>>)=>A
) {

    const hashlen = 1 << Math.ceil(Math.log2(_be_.T.E.F.p.toString(16).length));

    return class Entity {

        _6e_:typeof _be_;

        secret:bigint;

        sign:(M:Uint8Array)=>S

        _public:undefined|FinitePoint;

        _publicHex:undefined|string;

        _hexlen:undefined|number;

        _address:undefined|A;

        constructor(secret:bigint) {
            this._6e_ = _be_;
            this.secret = secret;
            this.sign = M => _be_.sign(this.secret, M);
        }

        get public() {
            return this._public ??= this._6e_.T.public(this.secret);
        }

        get hashlen() {
            return hashlen;
        }

        get publicHex() {
            return this._publicHex ??=
                  this.public.x!.toString(16).padStart(hashlen, '0')
                + this.public.y!.toString(16).padStart(hashlen, '0');
        }

        get address() {
            return this._address ??= _81_(this);
        }

        static random() {
            const D = crypto.getRandomValues(new Uint8Array(hashlen >> 1));
            let d = 0n;
            for (let i = 0; i < D.byteLength; i++)
                d |= BigInt(D[i]!) << BigInt(i << 3);
            return new Entity(d);
        }

    };

}

export { _e40215_ };