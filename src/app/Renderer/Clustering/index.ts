import { NVector3 } from '../Geometry/Base/NVector3';
import { OPTIMIZER } from './lib/enum';
import { GridSystemDynamic } from './Core/GridSystemDynamic';

export class Clustering {
    OPTIMIZER: OPTIMIZER = OPTIMIZER.NONE;

    gridSystem: GridSystemDynamic;

    temp: NVector3 = new NVector3(0, 0);

    constructor() {
        this.gridSystem = new GridSystemDynamic();
    }
    public push(vs: NVector3[]) {
        this.gridSystem.points = vs;
        this.update();
    }
    public mouseInteraction(x: number, y: number){
        this.temp = this.gridSystem.getCellAtPoint(new NVector3(x, y)).vec;
    }
    public update() {
        this.gridSystem.update();

    }
    public render(ctx: CanvasRenderingContext2D, isStationary: boolean) {
        if (isStationary) {
            this.update();
        }
        this.gridSystem.Render(ctx)

        if(this.temp){
            ctx.fillStyle = '#00ff00';
            ctx.beginPath();
            ctx.arc(this.temp.x, this.temp.y,9, 0.0, 3.14 * 2)
            ctx.closePath();
            ctx.fill();
        }
        

    }

}