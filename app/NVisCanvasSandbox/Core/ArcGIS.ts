import { NVisCanvasSandbox } from '../NVisCanvasSandbox';

export class ArcGIS {

    nVisCanvasSandbox: NVisCanvasSandbox;
    constructor(nVisCanvasSandbox: NVisCanvasSandbox) {
        this.nVisCanvasSandbox = nVisCanvasSandbox;
        this.AppendMapViewEvent();
    }
    public AppendMapViewEvent() {
        this.nVisCanvasSandbox.mapView.watch('extent', () => {
            //
        });
        this.nVisCanvasSandbox.mapView.watch('stationary', (e: boolean) => {
            //
        });
        this.nVisCanvasSandbox.mapView.watch('ready', (e: boolean) => {
            // console.log(e);
        });
        this.nVisCanvasSandbox.mapView.on('resize', (e: __esri.MapViewResizeEvent) => {
            this.nVisCanvasSandbox.canvas.ResizeCanvas(e.width, e.height);
        });
        // this.mapView.on('watch', (e: {}) => {
        //   // this.nVisCanvasSandbox.ACController.ResizeCanvas(e.width, e.height);
        //   console.log(e, 'dd');
        // });
    }
}