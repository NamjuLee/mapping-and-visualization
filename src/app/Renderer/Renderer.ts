import NVisCanvasSandbox  from '..';
import { NPoint } from './Geometry/NPoint';

export class Renderer {
    app: NVisCanvasSandbox;

    p: NPoint[] = [];

    num: number = 0;

    constructor(app: NVisCanvasSandbox) {
        this.app = app;
    }
    public MouseMove(x: number, y: number) {
        // console.log(x, y);
    }
    public MousePress(x: number, y: number) {
        const p = new NPoint(this, x, y);
        this.p.push(p);
    }
    public KeyPress(k: string) {
        console.log(k);
    }
    public Start(ctx: CanvasRenderingContext2D) {
        console.log('init');
        for (let j = 0; j < 2; ++j) {
            for (let i = 0; i < 2; ++i) {
                const p = new NPoint(this, 50 + (i * 10), 100 + (j * 10));
                this.p.push(p);
            }
        }
    }
    public Render(ctx: CanvasRenderingContext2D) {
        // console.log('loop', this.num);
        // this.num++;
        for (let i = 0; i < this.p.length; ++i) {
            this.p[i].Render(ctx);
        }

        // console.log(this);
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(100, 100, 10, 0, 3.14 * 2)
        ctx.closePath();
        ctx.fill();

    }
}