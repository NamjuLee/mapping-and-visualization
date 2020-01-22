import NVisCanvasSandbox from '..';

export class Canvas {
    t: number;
    frameRate: number;
    canvas: HTMLCanvasElement;
    hostDiv: HTMLElement;
    id: string;

    ctx: CanvasRenderingContext2D;

    xOff: number;
    yOff: number;
    xOffCurrent: number;
    yOffCurrent: number;
    xOffPre: number;
    yOffPre: number;
    zoomFactor: number;
    zoomFactorPre: number;
    zoomFactorCurrent: number;
    div3d: HTMLDivElement;

    smoothingEnabled: boolean = true;
    // theContext: CanvasRenderingContext2D;

    dropRate: number;
    isRenderSkip: boolean;
    isLoop: boolean;
    timeLastRender: number;
    delta: number;
    now: number;
    then: number = 0;
    interval: number = 0;
    last: number = 0;

    frameVisTimer: number;
    theDate: Date;

    asyncSafeGuard: number = 0;
    App: NVisCanvasSandbox;

    constructor(App: NVisCanvasSandbox) {
        this.App = App;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'App';
        this.canvas.style.zIndex = '1';
        this.canvas.style.position = 'absolute';
        this.canvas.style.pointerEvents = 'none';
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        App.divHost.appendChild(this.canvas);
        this.ctx.globalCompositeOperation = 'source-over';
        this.canvas.width = App.divHost.clientWidth;
        this.canvas.height = App.divHost.clientHeight;
        this.Start(this.ctx);
    }
    Start(ctx: CanvasRenderingContext2D) {
        this.App.renderer.Start(ctx);
        this.Draw(this.ctx);
    }
    Draw(ctx: CanvasRenderingContext2D) {
        requestAnimationFrame(() => { this.Draw(ctx); });

        this.Clear(ctx);
        this.Render(ctx);
        // console.log('lpop');
        // console.log(this);

    }
    Clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    Render(ctx: CanvasRenderingContext2D) {
        this.App.renderer.Render(ctx);
        // for (let i = 0; i < this.rendererArray.length; ++i) { this.rendererArray[i].Render(ctx); }
    }
    ResizeCanvas(width: number, height: number) {
        this.ctx.canvas.width = width;
        this.ctx.canvas.height = height;
    }

} 