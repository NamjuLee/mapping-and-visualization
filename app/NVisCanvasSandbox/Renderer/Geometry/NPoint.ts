import { NGeometryBase } from './Base/NGeometryBase';
import { NVector3 } from './Base/NVector3';
import { NVisCanvasSandbox } from '../../NVisCanvasSandbox';

export class NPoint extends NGeometryBase {
    col: string = 'rgba(255, 255, 0, 0.2)';
    constructor(x: number, y: number) {
        super();
        this.vec = new NVector3(x, y);
        this.UpdateGoeVec();

        // if (Math.random() < 0.5) {
        //     this.col = 'rgba(255, 255, 0, 0.2)';
        // } else {
        //     this.col = 'rgba(255, 0, 0, 0.2)';
        // }
    }
    UpdateGoeVec() {
        let v = NVisCanvasSandbox.app.projection.ToMap(this.vec.x, this.vec.y);
        // console.log(v);
        // if (isNaN(v[0])) {
        this.vec.long = v[0]; this.vec.lat = v[1];
        // } else if (isNaN(v[2])) {
        this.vec.proX = v[2]; this.vec.proY = v[3];
        // }
        // if (this.HasPopup) { this.UpdateDivPos() }
    }
    UpdateScreenVecForPan() {
        this.UpdateScreenVecByProjectedPos();
    }
    UpdateScreenVecByProjectedPos() {
        let v = NVisCanvasSandbox.app.projection.ToScreen(this.vec.long, this.vec.lat); // dont change!!
        if (isNaN(v[0])) { return; }
        this.vec.x = v[0]; this.vec.y = v[1];
    }
    Render(ctx: CanvasRenderingContext2D, radius: number = 3) {
        this.UpdateScreenVecForPan();
        ctx.beginPath();
        if (this.isHover) {
            ctx.fillStyle = '#ff0000';
            ctx.arc(this.vec.x, this.vec.y, radius + 2, 0, 3.14 * 2);
        } else {

            ctx.fillStyle = this.col;
            ctx.arc(this.vec.x, this.vec.y, radius, 0, 3.14 * 2);
        }
        ctx.closePath();
        ctx.fill();
    }
}