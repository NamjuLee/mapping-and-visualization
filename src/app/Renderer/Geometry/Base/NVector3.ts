
export class NVector3 {
    static eps: number = 0.0000001;
    static origin: NVector3 = new NVector3(0, 0, 0);

    
    x: number = 0.0;
    y: number = 0.0;
    z: number = 0.0;
    w: number = 0.0;
    long: number = 0.0;
    lat: number = 0.0;
    ele: number = 0.0;
    proX: number = 0.0;
    proY: number = 0.0;
    proZ: number = 0.0;
    alt: number = 0.0;
    d: boolean = true;
    isModified: boolean = false;
    isRenderable: boolean = true;
    // tslint:disable-next-line:no-any
    parent: any;

    static DeepCopy(v: NVector3): NVector3 {
        const out = new NVector3(v.x, v.y, v.z);
        out.long = v.long; out.lat = v.lat;
        out.proX = v.proX; out.proY = v.proY; out.proZ = v.proZ;
        return out;
    }
    static Dot(a: NVector3, b: NVector3) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    static ScalarRev_V_S_OUT(v: NVector3, s: number, out: NVector3) {
        out.x = s * v.x;
        out.y = s * v.y;
        out.z = s * v.z;
        return out;
    }
    static Sub(v0: NVector3, v1: NVector3): NVector3 {
        return new NVector3(v1.x - v0.x, v1.y - v0.y, v1.z - v0.z);
    }
    static Clone(v: NVector3): NVector3 {
        return NVector3.DeepCopy(v);
    }
    static zAxis(): NVector3 {
        return new NVector3(0, 0, 1);
    }
    static zero(): NVector3 {
        return new NVector3(0, 0, 0);
    }
    static Origin(): NVector3 {
        return new NVector3(0, 0, 0);
    }
    static Plus(v1: NVector3, v2: NVector3): NVector3 {
        return new NVector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    static Scale(v: NVector3, s: number): NVector3 {
        return new NVector3(v.x * s, v.y * s, v.z * s);
    }
    static MidVec(v1: NVector3, v2: NVector3): NVector3 {
        return new NVector3((v1.x + v2.x) * 0.5, (v1.y + v2.y) * 0.5, (v1.z + v2.z) * 0.5);
    }
    static CompareTwoVectors(v0: NVector3, v1: NVector3): boolean {
        if (v0.x !== v1.x || v0.y !== v1.y || v0.z !== v1.z) { return false; } else { return true; }
    }
    static Length(v: NVector3): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }
    static Normalize(v: NVector3): NVector3 {
        let len: number = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        return new NVector3(v.x / len, v.y / len, v.z / len);
    }
    static GetIndexByShortDistance(v: NVector3, vs: NVector3[]): number[] {
        let index = -1;
        let dis = Number.MAX_VALUE;
        for (let i = 0; i < vs.length; ++i) {
            let distance = NVector3.Distance(v, vs[i]);
            if (distance < dis) {
                dis = distance;
                index = i;
            }
        }
        return [index, dis];
    }
    static Distance(v0: NVector3, v1: NVector3): number {
        return Math.sqrt((v0.x - v1.x) * (v0.x - v1.x) + (v0.y - v1.y) * (v0.y - v1.y) + (v0.z - v1.z) * (v0.z - v1.z));
    }
    static Distance2(v1: NVector3, v2: NVector3): number {
        let d: number =
            (v1.x - v2.x) * (v1.x - v2.x) +
            (v1.y - v2.y) * (v1.y - v2.y) +
            (v1.z - v2.z) * (v1.z - v2.z);
        return d;
    }
    static DotProduct(v1: NVector3, v2: NVector3): number {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    static CrossProduct(v1: NVector3, v2: NVector3): NVector3 {
        return new NVector3(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        );
    }
    static DivideByNum(v0: NVector3, v1: NVector3, n: number = 5): NVector3[] {
        let vs: NVector3[] = [];
        let xOff = (v1.x - v0.x) / n;
        let yOff = (v1.y - v0.y) / n;
        let zOff = (v1.z - v0.z) / n;
        for (let j = 0; j < n; ++j) {
            let x = v0.x + xOff * j;
            let y = v0.y + yOff * j;
            let z = v0.z + zOff * j;
            vs.push(new NVector3(x, y, z));
        }
        return vs;
    }
    static GetAngleBetween(v0: NVector3, v1: NVector3) {
        return Math.atan2(v1.x - v0.x, v1.y - v0.y);
    }
    // .................................................
    static GetCosAngleByTwoVectors(v0: NVector3, v1: NVector3): number {
        return NVector3.DotProduct(NVector3.Normalize(v0), NVector3.Normalize(v1));
    }
    static GetAngleByTwoVectorsRadian(v0: NVector3, v1: NVector3): number {
        return Math.acos(NVector3.GetCosAngleByTwoVectors(v0, v1));
    }
    static GetAngleByTwoVectors(v0: NVector3, v1: NVector3): number {
        return NVector3.GetAngleByTwoVectorsRadian(v0, v1) * 180.0 / Math.PI;
    }
    static RotateVec(v: NVector3, angle: number): NVector3 {
        let cos = Math.cos(angle * (3.14159265358979 / 180.0));
        let sin = Math.sin(angle * (3.14159265358979 / 180.0));
        let x = v.x * cos - v.y * sin;
        let y = v.x * sin + v.y * cos;
        return new NVector3(x, y, v.z);
    }
    constructor(x: number, y: number, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Set(x: number, y: number, z: number): NVector3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return new NVector3(this.x, this.y, this.z);
    }
    Scale(v: number): NVector3 {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        return new NVector3(this.x, this.y, this.z);
    }
    Mult(v: number): NVector3 {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        return new NVector3(this.x, this.y, this.z);
    }
    Div(v: number): NVector3 {
        this.x /= v;
        this.y /= v;
        this.z /= v;
        return new NVector3(this.x, this.y, this.z);
    }
    Add(v: NVector3): NVector3 {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return new NVector3(this.x, this.y, this.z);
    }
    Sub(v: NVector3): NVector3 {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return new NVector3(this.x, this.y, this.z);
    }
    Negate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return new NVector3(this.x, this.y, this.z);
    }
    Equals(v: NVector3) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
    Clone(): NVector3 {
        return new NVector3(this.x, this.y, this.z);
    }
    Length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    Unitize(): NVector3 {
        return this.Normalize();
    }
    Normalize(): NVector3 {
        let len: number = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        this.x = this.x / len;
        this.y = this.y / len;
        this.z = this.z / len;
        return new NVector3(this.x, this.y, this.z);
    }
    Distance(v: NVector3): number {
        return NVector3.Distance(new NVector3(this.x, this.y, this.z), v);
    }
    Distance2(v: NVector3): number {
        return NVector3.Distance2(new NVector3(this.x, this.y, this.z), v);
    }
    DotProduct(v: NVector3): number {
        return NVector3.DotProduct(new NVector3(this.x, this.y, this.z), v);
    }
    CrossProduct(v: NVector3): NVector3 {
        return NVector3.CrossProduct(new NVector3(this.x, this.y, this.z), v);
    }

    ToString(): string {
        let t: string = 'x: ' + this.x.toFixed(3).toString() + ' , y: ' + this.y.toFixed(3).toString() + ', z: ' + this.z.toFixed(3).toString();
        return t;
    }
}