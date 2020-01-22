import NVisCanvasSandbox from '..';

export class ArcGIS {

    app: NVisCanvasSandbox;
    constructor(app: NVisCanvasSandbox) {
        this.app = app;
        this.AppendMapViewEvent();
    }
    public AppendMapViewEvent() {
        this.app.mapView.watch('extent', () => {
            //
        });
        this.app.mapView.watch('stationary', (e: boolean) => {
            //
        });
        this.app.mapView.watch('ready', (e: boolean) => {
            // console.log(e);
        });
        this.app.mapView.on('resize', (e: __esri.MapViewResizeEvent) => {
            this.app.canvas.ResizeCanvas(e.width, e.height);
        });
        // this.mapView.on('watch', (e: {}) => {
        //   // this.app.ACController.ResizeCanvas(e.width, e.height);
        //   console.log(e, 'dd');
        // });
    }
}