import { NVector3 } from '../../Geometry/Base/NVector3';
// import { GTYPE } from '../../../../../../../lib/Enumeration';
// import { AGeometryBase } from '../../../../Common/Base/AGeometryBase';
// import { GridBased } from '../';

export class GridSystemDynamic {

    public xInterval: number = 0;
    public yInterval: number = 0;
    public width = 0;
    public height = 0;
    public rx: number = 8;
    public ry: number = 6;
    public cells: Cell[][] = [];

    public points: NVector3[] = [];

    public minP: NVector3 = new NVector3(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    public maxP: NVector3 = new NVector3(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

    constructor() {

    }
    public update(): void {
        // console.log(this.optimizer.optimizer.optimizer.renderer.annotationInstance.activeCommandController.acProperties.isZooming);
        // if (this.optimizer.optimizer.optimizer.renderer.annotationInstance.activeCommandController.acProperties.isZooming) {
        this.initGrid();
        // }
    }
    private initGrid() {
        // console.log(width);
        this.minP = new NVector3(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        this.maxP = new NVector3(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

        for(let i = 0 ; i < this.points.length; ++i){
            const v = this.points[i];
            if (this.minP.x > v.x) { this.minP.x = v.x; }
            if (this.minP.y > v.y) { this.minP.y = v.y; }
            if (this.minP.z > v.z) { this.minP.z = v.z; }

            if (this.maxP.x < v.x) { this.maxP.x = v.x; }
            if (this.maxP.y < v.y) { this.maxP.y = v.y; }
            if (this.maxP.z < v.z) { this.maxP.z = v.z; }
        }
        console.log(this);

        this.cells = [];
        this.width = (this.maxP.x - this.minP.x);
        this.height = (this.maxP.y - this.minP.y);

        console.log('width', this.width, 'height', this.height)

        this.xInterval = this.width / (this.rx - 1);
        this.yInterval = this.height / (this.ry - 1);
        
        console.log('this.xInterval', this.xInterval, 'this.yInterval', this.yInterval)

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
                if(this.cells[y][x].points.length < 1) {
                    this.cells[y][x].isRenderable = false;
                }
            }
        }
    }
    public getCellAtPoint(dp: NVector3) {
        // let dp: NVector3 = vec.Sub(this);
        let i: number = (Math.round((dp.x - this.minP.x ) / this.xInterval));
        let j: number = (Math.round((dp.y - this.minP.y  ) / this.yInterval));
        if (i >= this.rx) { i = this.rx - 1; }
        if (j >= this.ry) { j = this.ry - 1; }
        if (i < 0) { i = 0; }
        if (j < 0) { j = 0; }
        return this.cells[j][i];
    }
    public Render(ctx: CanvasRenderingContext2D){

        for(let y = 0; y < this.cells.length; y++){
            for(let x = 0; x < this.cells[y].length; x++) {
                // if(this.cells[y][x]){
                this.cells[y][x].draw(ctx);
                // }
            }
        }

        ctx.beginPath();
        ctx.rect(this.minP.x, this.minP.y, this.maxP.x - this.minP.x, this.maxP.y - this.minP.y);
        ctx.stroke();
    }
}

class Cell {

    grid: GridSystemDynamic;
    r0: number = 32 * 0.5;
    r1: number = 48 * 0.5;
    vec: NVector3;
    vecRender: NVector3;
    xI: number;
    yI: number;
    isHover: boolean = false;
    points: NVector3[] = []
    _isRenderable: boolean = true;

    constructor(grid: GridSystemDynamic, xI: number, yI: number) {
    this.grid = grid;
    this.xI = xI;
    this.yI = yI;
    this.vec = new NVector3(grid.minP.x + (xI * this.grid.xInterval), grid.minP.y + (yI * this.grid.yInterval));
    console.log('x', this.vec.x, 'y', this.vec.y, )
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
        if (!this.isRenderable) { 
            ctx.beginPath();
            ctx.rect(this.vec.x - this.grid.xInterval * 0.5, this.vec.y - this.grid.yInterval * 0.5, this.grid.xInterval, this.grid.yInterval);
            ctx.closePath();
            ctx.stroke();    
            return; 
        }

        // console.log(isPanning)
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


        // ctx.fillStyle = '#ffffff';
        // ctx.beginPath();
        // ctx.arc(this.vec.x, this.vec.y, 20, 0, Math.PI * 2);
        // ctx.closePath();
        // // ctx.stroke();
        // ctx.fill();

        ctx.beginPath();
        ctx.rect(this.vec.x - this.grid.xInterval * 0.5, this.vec.y - this.grid.yInterval * 0.5, this.grid.xInterval, this.grid.yInterval);
        ctx.closePath();
        ctx.stroke();

        // this.grid.optimizer.optimizer.optimizer.renderer.draw.shape.cluster.DrawingPresetClustering(ctx, this.geometries, this.vecRender, this.r0, this.r1, this.isHover);
    }
}