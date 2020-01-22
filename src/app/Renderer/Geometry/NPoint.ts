import { NGeometryBase } from './Base/NGeometryBase';
import { NVector3 } from './Base/NVector3';
import { Renderer } from '../Renderer';

export class NPoint extends NGeometryBase {
    col: string = 'rgba(0, 255, 0, 0.35)';
    renderer: Renderer;
    t: number = 0.0;
    constructor(renderer: Renderer, x: number, y: number) {
        super();
        this.renderer = renderer;
        this.vec = new NVector3(x, y);
        this.UpdateGoeVec();
        this.t = Math.random() * 5;

        // if (Math.random() < 0.5) {
        //     this.col = 'rgba(255, 255, 0, 0.2)';
        // } else {
        //     this.col = 'rgba(255, 0, 0, 0.2)';
        // }
    }
    public UpdateGoeVec() {
        let v = this.renderer.app.projection.ToMap(this.vec.x, this.vec.y);
        // console.log(v);
        // if (isNaN(v[0])) {
        this.vec.long = v[0]; this.vec.lat = v[1];
        // } else if (isNaN(v[2])) {
        this.vec.proX = v[2]; this.vec.proY = v[3];
        // }
        // if (this.HasPopup) { this.UpdateDivPos() }
    }
    public UpdateScreenVecForPan() {
        this.UpdateScreenVecByProjectedPos();
    }
    public UpdateScreenVecByProjectedPos() {
        let v = this.renderer.app.projection.ToScreen(this.vec.long, this.vec.lat); // dont change!!
        if (isNaN(v[0])) { return; }
        this.vec.x = v[0]; this.vec.y = v[1];
    }
    public Render(ctx: CanvasRenderingContext2D, radius: number = 3) {
        this.UpdateScreenVecForPan();
        const ani = (Math.cos(this.t) + 1.1 ) * 3;
        ctx.beginPath();
        if (this.isHover) {
            ctx.fillStyle = '#ff0000';
            ctx.arc(this.vec.x, this.vec.y, radius + 2 +  ani, 0, 3.14 * 2);
        } else {
            ctx.fillStyle = this.col;
            ctx.arc(this.vec.x, this.vec.y, radius + ani, 0, 3.14 * 2);
        }
        ctx.closePath();
        ctx.fill();
        this.t += 0.1;
    }
}