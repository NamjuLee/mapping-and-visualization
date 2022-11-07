import MapView from 'esri/views/MapView';
import ArcGISMap from 'esri/Map';
import Point from 'esri/geometry/Point';

import { ArcGIS } from './Core/ArcGIS';
import { NJSAPI, EventInteraction } from './Core/index';
import { MOUSE_TYPE } from './Core/EventInteraction';

import { Renderer } from './Renderer/RendererClustering';

import { version } from 'njscore';

export default class NVisCanvasSandbox {
    mapView: MapView;
    map: ArcGISMap;
    mPoint: Point;
    divHost: HTMLElement;

    arcGIS: ArcGIS;
    canvas: NJSAPI.NVisCanvasSandbox.Canvas;
    projection: NJSAPI.NVisCanvasSandbox.Projection;
    eventInteraction: EventInteraction;
    renderer: Renderer;
    public static start(view: MapView) {
        console.log('njscore', version);
        new NVisCanvasSandbox(view);
    }
    constructor(view: MapView) {
        this.mapView = view;
        this.map = view.map;
        this.mPoint = this.mapView.toMap({ x: 0, y: 0 });
        this.divHost = this.mapView.container as HTMLElement;

        this.eventInteraction = new EventInteraction(this);
        this.projection = new NJSAPI.NVisCanvasSandbox.Projection(this);
        this.renderer = new Renderer(this);
        this.canvas = new NJSAPI.NVisCanvasSandbox.Canvas(this);
        this.arcGIS = new ArcGIS(this);
    }
    public MouseEvent(m: NJSAPI.NVisCanvasSandbox.MouseEventData) {
        if (m.type === MOUSE_TYPE.CLICK) { this.renderer.MouseClick(m.x, m.y); }
        if (m.type === MOUSE_TYPE.DRAG) { this.renderer.MouseDrag(m.x, m.y); }
        else { this.renderer.MouseMove(m.x, m.y); }
    }
    public KeyEvent(k: NJSAPI.NVisCanvasSandbox.KeyboardEventData) {
        this.renderer.KeyPress(k.key);
    }
}