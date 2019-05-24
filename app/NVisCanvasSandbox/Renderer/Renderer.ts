import { NVisCanvasSandbox } from '../NVisCanvasSandbox';
import { NPoint } from './Geometry/NPoint';

export class Renderer {
    nVisCanvasSandbox: NVisCanvasSandbox;

    p: NPoint[] = [];

    num: number = 0;

    constructor(nVisCanvasSandbox: NVisCanvasSandbox) {
        this.nVisCanvasSandbox = nVisCanvasSandbox;
    }
    MouseMove(x: number, y: number) {
        // console.log(x, y);
    }
    MousePress(x: number, y: number) {
        console.log(x, y);
    }
    KeyPress(k: string) {
        console.log(k);
    }
    Start(ctx: CanvasRenderingContext2D) {
        // console.log('init');
        for (let j = 0; j < 15; ++j) {
            for (let i = 0; i < 15; ++i) {
                const p = new NPoint(50 + (i * 10), 100 + (j * 10));
                this.p.push(p);
            }
        }
    }
    Render(ctx: CanvasRenderingContext2D) {
        // console.log('loop', this.num);
        // this.num++;
        for (let i = 0; i < this.p.length; ++i) {
            this.p[i].Render(ctx);
        }
    }
}