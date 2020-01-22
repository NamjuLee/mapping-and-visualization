import MapView from 'esri/views/MapView';
import ArcGISMap from 'esri/Map';
import Point from 'esri/geometry/Point';

import { NJSAPI, EventInteraction } from './Core/index';
import { MOUSE_TYPE } from './Core/EventInteraction';
import { Renderer } from './Renderer/Renderer01';

export default class NVisCanvasSandbox {
    mapView: MapView;
    map: ArcGISMap;
    mPoint: Point;
    divHost: HTMLElement;

    canvas: NJSAPI.NVisCanvasSandbox.Canvas;
    projection: NJSAPI.NVisCanvasSandbox.Projection;
    eventInteraction: EventInteraction;
    renderer: Renderer;
    public static start(view: MapView) {
        new NVisCanvasSandbox(view);
    }
    constructor(view: MapView) {
        this.mapView = view;
        this.map = view.map; 
        this.mPoint = this.mapView.toMap({x: 0, y:0 });
        this.divHost = this.mapView.container as HTMLElement;

        this.eventInteraction = new EventInteraction(this);
        this.projection = new NJSAPI.NVisCanvasSandbox.Projection(this);
        this.renderer = new Renderer(this);
        this.canvas = new NJSAPI.NVisCanvasSandbox.Canvas(this);
    }
    public MouseEvent(m: NJSAPI.NVisCanvasSandbox.MouseEventData) {
        if (m.type === MOUSE_TYPE.DOWN) { this.renderer.MousePress(m.x, m.y); }
        else { this.renderer.MouseMove(m.x, m.y); }
    }
    public KeyEvent(k: NJSAPI.NVisCanvasSandbox.KeyboardEventData) {
        this.renderer.KeyPress(k.key);
    }
}