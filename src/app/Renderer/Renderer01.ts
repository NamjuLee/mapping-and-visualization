import NVisCanvasSandbox from '..';
import { NPoint } from './Geometry/NPoint';

import { usZip } from '../Data/USZip';

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
        // console.log(usZip);

        // usZip.forEach( (d: number[] ) => {
        //     // console.log(d);
        //     const sp = this.app.projection.ToScreen(d[0], d[1]);
        //     const p = new NPoint(sp[0], sp[1]);
        //     this.p.push(p);
        // });

        for(let i = 0; i < usZip.length; ++i){
            if (i % 5 === 0){
                const sp = this.app.projection.ToScreen(usZip[i][0], usZip[i][1]);
                const p = new NPoint(this, sp[0], sp[1]);
                this.p.push(p);
            }
            if( this.num++ === 5000) { return; }
        }
    }
    public Render(ctx: CanvasRenderingContext2D) {
        // console.log('loop', this.num);
        // this.num++;
        for (let i = 0; i < this.p.length; ++i) {
            this.p[i].Render(ctx);
        }
    }
}