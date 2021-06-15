import NVisCanvasSandbox from '..';
import { NPoint } from './Geometry/NPoint';

import { usZip } from '../Data/USZip';

import { Clustering } from './Clustering';
import { NVector3 } from './Geometry/Base/NVector3';

export class Renderer {
    app: NVisCanvasSandbox;
    isStationary: boolean = false;

    p: NPoint[] = [];
    vs: NVector3[] = [];

    num: number = 0;
    clustering: Clustering;

    constructor(app: NVisCanvasSandbox) {
        this.app = app;
        this.clustering = new Clustering()
    }
    public MouseMove(x: number, y: number) {
        console.log(x, y);
        this.clustering.mouseInteraction(x,y);

    }
    public MousePress(x: number, y: number) {

    }
    public MouseClick(x: number, y: number) {
        const p = new NPoint(this, x, y);
        this.p.push(p);
        this.vs.push(p.vec)
    }
    public MouseDrag(x: number, y: number) {

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
                this.vs.push(p.vec)
            }
            if( this.num++ === 5000) { break; }
        }
        // console.log(this.vs)
        this.clustering.push(this.vs);
    }
    public Render(ctx: CanvasRenderingContext2D) {
        // console.log('loop', this.num);
        // this.num++;
        for (let i = 0; i < this.p.length; ++i) {
            this.p[i].Render(ctx);
        }
        this.clustering.render(ctx, this.isStationary);




    }
}