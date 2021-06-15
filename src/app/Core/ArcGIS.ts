import NVisCanvasSandbox from '..';

export class ArcGIS {

    app: NVisCanvasSandbox;
    constructor(app: NVisCanvasSandbox) {
        this.app = app;
        this.AppendMapViewEvent();
    }
    public AppendMapViewEvent() {
        this.app.mapView.watch('extent', () => {
            // console.log('extent')
            //
        });
        this.app.mapView.watch('stationary', (e: boolean) => {
            // console.log('stationary')

            // console.log(e);

            this.app.renderer.isStationary = !e;
            //
        });
        this.app.mapView.watch('ready', (e: boolean) => {
            // console.log(e);
        });
        this.app.mapView.on('resize', (e: __esri.MapViewResizeEvent) => {
            this.app.canvas.ResizeCanvas(e.width, e.height);
            console.log('resize', e.width, e.height)
        });
        // this.mapView.on('watch', (e: {}) => {
        //   // this.app.ACController.ResizeCanvas(e.width, e.height);
        //   console.log(e, 'dd');
        // });
    }
}