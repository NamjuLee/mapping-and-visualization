import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import Point = require('esri/geometry/Point');
import ScreenPoint = require('esri/geometry/ScreenPoint');

import { NJSAPI, EventInteraction } from './Core/index';
import { Renderer } from './Renderer/Renderer';
import { MOUSE_TYPE } from './Core/EventInteraction';

export class NVisCanvasSandbox {
    static app: NVisCanvasSandbox
    divHost: HTMLElement;
    canvas: NJSAPI.NVisCanvasSandbox.Canvas;
    renderer: Renderer;
    map: EsriMap;
    mapView: MapView
    mPoint: Point;
    sPoint: ScreenPoint;
    projection: NJSAPI.NVisCanvasSandbox.Projection;
    eventInteraction: EventInteraction;
    static StartApp(map: EsriMap, mapView: MapView) {
        new NVisCanvasSandbox(map, mapView);
        console.log('hello world');
    }
    constructor(map: EsriMap, mapView: MapView) {
        NVisCanvasSandbox.app = this;
        this.map = map; this.mapView = mapView;
        this.mPoint = new Point();
        this.sPoint = new ScreenPoint();
        this.divHost = document.getElementsByClassName('esri-view-surface')[0] as HTMLElement;

        setTimeout(() => {
            this.eventInteraction = new EventInteraction(this);
            this.projection = new NJSAPI.NVisCanvasSandbox.Projection(this);
            this.renderer = new Renderer(this);
            this.canvas = new NJSAPI.NVisCanvasSandbox.Canvas(this)
        }, 4000);

    }
    MouseEvent(m: NJSAPI.NVisCanvasSandbox.MouseEventData) {
        if (m.type === MOUSE_TYPE.DOWN) { this.renderer.MousePress(m.x, m.y); }
        else { this.renderer.MouseMove(m.x, m.y); }
    }
    KeyEvent(k: NJSAPI.NVisCanvasSandbox.KeyboardEventData) {
        this.renderer.KeyPress(k.key);
    }
}