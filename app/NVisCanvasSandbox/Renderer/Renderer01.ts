import { NVisCanvasSandbox } from '../NVisCanvasSandbox';
import { NPoint } from './Geometry/NPoint';

import { usZip } from '../Data/USZip';

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
        const p = new NPoint(x, y);
        this.p.push(p);
    }
    KeyPress(k: string) {
        console.log(k);
    }
    Start(ctx: CanvasRenderingContext2D) {
        // console.log(usZip);

        // usZip.forEach( (d: number[] ) => {
        //     // console.log(d);
        //     const sp = this.nVisCanvasSandbox.projection.ToScreen(d[0], d[1]);
        //     const p = new NPoint(sp[0], sp[1]);
        //     this.p.push(p);
        // });

        for(let i = 0; i < usZip.length; ++i){
            if (i % 5 === 0){
                const sp = this.nVisCanvasSandbox.projection.ToScreen(usZip[i][0], usZip[i][1]);
                const p = new NPoint(sp[0], sp[1]);
                this.p.push(p);
            }
            // if( this.num++ === 10000) { return; }
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