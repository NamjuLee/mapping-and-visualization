import { NVector3 } from '../../Geometry/Base/NVector3';
// import { GTYPE } from '../../../../../../../lib/Enumeration';
// import { AGeometryBase } from '../../../../Common/Base/AGeometryBase';
// import { GridBased } from '../';

export class GridSystem {

    public xInterval: number = 0;
    public yInterval: number = 0;
    public rx: number = 8;
    public ry: number = 6;
    public cells: Cell[][] = [];

    public points: NVector3[] = [];

    public width: number = 500;
    public height: number = 500;

    constructor() {

    }
    public update(): void {
        // console.log(this.optimizer.optimizer.optimizer.renderer.annotationInstance.activeCommandController.acProperties.isZooming);
        // if (this.optimizer.optimizer.optimizer.renderer.annotationInstance.activeCommandController.acProperties.isZooming) {
        this.initGrid();
        // }
    }
    private initGrid() {
        this.cells = [];
        this.xInterval = this.width / (this.rx - 1);
        this.yInterval = this.height / (this.ry - 1);

        for(let y = 0; y < this.ry; y++){
            const cellList: Cell[] = [];
            for(let x = 0; x < this.rx; x++) {
                cellList.push(new Cell(this, x, y));
            }
            this.cells.push(cellList);
        }

        for(let i = 0 ; i < this.points.length; ++i){
            const p = this.points[i];
            this.getCellAtPoint(p).push(p);
        }
        for(let y = 0; y < this.ry; ++y){
            for(let x = 0; x < this.rx; ++x) {
                if(this.cells[y][x].points.length < 2) {
                    this.cells[y][x].isRenderable = false;
                }
            }
        }
    }
    public getCellAtPoint(dp: NVector3) {
        let i: number = (Math.round(dp.x / this.xInterval));
        let j: number = (Math.round(dp.y / this.yInterval));
        if (i >= this.rx) { i = this.rx - 1; }
        if (j >= this.ry) { j = this.ry - 1; }
        if (i < 0) { i = 0; }
        if (j < 0) { j = 0; }
        return this.cells[j][i];
    }
    public Render(ctx: CanvasRenderingContext2D){
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        
        for(let y = 0; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++) {
                // if(this.cells[y][x]){
                this.cells[y][x].draw(ctx);
                // }
            }
        }
    }
}

class Cell {
    grid: GridSystem;
    r0: number = 32 * 0.5;
    r1: number = 48 * 0.5;
    vec: NVector3;
    vecRender: NVector3;
    xI: number;
    yI: number;
    isHover: boolean = false;
    points: NVector3[] = []
    _isRenderable: boolean = true;
    constructor(grid: GridSystem, xI: number, yI: number) {
    this.grid = grid;
    this.xI = xI;
    this.yI = yI;
    this.vec = new NVector3(xI * this.grid.xInterval, yI * this.grid.yInterval);
    // this.geometries = [];
    }
    public push(geo: NVector3){
        geo.isRenderable = false;
        this.points.push(geo);
        this.vecRender = new NVector3(0, 0, 0);
        for(let i = 0; i < this.points.length; ++i) {
            this.vecRender.x += this.points[i].x;
            this.vecRender.y += this.points[i].y;
        }
        this.vecRender.x /= this.points.length;
        this.vecRender.y /= this.points.length;
    }
    public get isRenderable() {
        return this._isRenderable;
    }
    public set isRenderable(v: boolean) {
        if(!v) {
            for(let i = 0; i < this.points.length; ++i) {
                this.points[i].isRenderable = true;
            }
            this.points = [];
        }
        this._isRenderable = v;
    }
    // public IsInside(m: NVector3) {
    // if(Distance(this.vec, m ) < this.r1 + 2) {
    // this.isHover = true;
    // return true;
    // } else {
    // this.isHover = false;
    // return false;
    // }
    // }
    public draw(ctx: CanvasRenderingContext2D, isPanning: boolean = false) {

        ctx.beginPath();
        ctx.rect(this.vec.x - this.grid.xInterval * 0.5, this.vec.y - this.grid.yInterval * 0.5, this.grid.xInterval, this.grid.yInterval);
        ctx.closePath();
        ctx.stroke();

        // console.log(isPanning)
        if (!this.isRenderable) { return; }
        if (isPanning) {
            this.vecRender = new NVector3(0, 0, 0);
            for(let i = 0; i < this.points.length; ++i) {
                this.vecRender.x += this.points[i].x;
                this.vecRender.y += this.points[i].y;
            }
            this.vecRender.x /= this.points.length;
            this.vecRender.y /= this.points.length;
            // this.vec.y -= this.r * 0.5 // offset the ghost center along y
        }
        // ctx.beginPath();
        // ctx.rect(this.vec.x - this.grid.xInterval * 0.5, this.vec.y - this.grid.yInterval * 0.5, this.grid.xInterval, this.grid.yInterval);
        // ctx.closePath();
        const r = 5 + this.points.length * 0.1;
        ctx.fillStyle = `rgba(${r * 10}, 0, 0, 1)`;
        // ctx.stroke = `rgba(${r * 10}, 0, 0, 1)`;
        // ctx.fill();
        // console.log(this.geometries.length);
        ctx.beginPath();
        ctx.arc(this.vecRender.x, this.vecRender.y, r, 0, Math.PI * 2);
        ctx.closePath();
        // ctx.stroke();
        ctx.fill();

        // this.grid.optimizer.optimizer.optimizer.renderer.draw.shape.cluster.DrawingPresetClustering(ctx, this.geometries, this.vecRender, this.r0, this.r1, this.isHover);
    }
}