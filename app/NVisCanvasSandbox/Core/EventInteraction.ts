import { NVisCanvasSandbox } from '../NVisCanvasSandbox';

export enum MOUSE_TYPE {
    DOWN = 'DOWN',
    MOVE = 'MOVE',
}

export class MouseEventData {
    x: number = -1; y: number = -1; z: number = -1;
    preX: number = -1; preY: number = -1; preZ: number = -1;
    yGLPicking: number;
    isDown: boolean = false;
    isDoubleClick: boolean = false;
    isMove: boolean = false;
    pressedShift: boolean = false;
    pressedAlt: boolean = false;
    pressedCtrl: boolean = false;

    lat: number = -1;
    long: number = -1;
    wheel: number = 0;
    preWheel: number = 0;
    type: MOUSE_TYPE;
    // premEvent: MouseEventData;
    native: MouseEvent;
    constructor() {
    }
    DeepCopy() {
        let mEvent = new MouseEventData();
        mEvent.x = this.x; mEvent.y = this.y; mEvent.z = this.z; mEvent.preX = this.preX; mEvent.preY = this.preY; mEvent.preZ = this.preZ;
        mEvent.pressedAlt = this.pressedAlt; mEvent.pressedShift = this.pressedShift; mEvent.pressedCtrl = this.pressedCtrl;
        mEvent.isDoubleClick = this.isDoubleClick; mEvent.isDown = this.isDown; mEvent.isMove = this.isMove;
        mEvent.lat = this.lat; mEvent.long = this.long; mEvent.wheel = this.wheel; mEvent.preWheel = this.preWheel;
        mEvent.yGLPicking = this.yGLPicking;
        mEvent.native = this.native;
        return mEvent;
    }
}
export class KeyboardEventData {
    preEvent: KeyboardEventData;
    key: string;
    hasAltKey: boolean;
    hasCtrlKey: boolean;
    hasShiftKey: boolean;
    hasMetaCommand: boolean;
    code: string;
    keyCode: number;
    constructor() {
        //
    }
}
export class EventInteraction {
    static mouseEventDataPre: MouseEventData;
    nVisCanvasSandbox: NVisCanvasSandbox
    constructor(nVisCanvasSandbox: NVisCanvasSandbox) {
        this.nVisCanvasSandbox = nVisCanvasSandbox;
        EventInteraction.mouseEventDataPre = new MouseEventData();
        this.InitArcGISMapEventV4x();
    }
    InitArcGISMapEventV4x() {
        this.nVisCanvasSandbox.mapView.on('pointer-down', (e: __esri.MapViewPointerDownEvent) => {
            const ev = this.CommonEventBuilderArcGIS(e);
            ev.type = MOUSE_TYPE.DOWN;
            this.nVisCanvasSandbox.MouseEvent(ev);
        });
        this.nVisCanvasSandbox.mapView.on('pointer-move', (e: __esri.MapViewPointerMoveEvent) => {
            const ev = this.CommonEventBuilderArcGIS(e);
            ev.type = MOUSE_TYPE.MOVE;
            this.nVisCanvasSandbox.MouseEvent(ev);
        });
        this.nVisCanvasSandbox.mapView.on('key-down', (e: __esri.MapViewKeyDownEvent) => {
            let keyPressed = e.key;
            if (keyPressed.slice(0, 5) === 'Arrow' || e.key === '-' || e.key === '=' || e.key === 'd') {
                e.stopPropagation();
            }

            this.KeyDownJSAPI4X(e.native);
        });
    }
    MouseClickLeftArcGIS(e: __esri.MapViewClickEvent | __esri.MapViewPointerDownEvent) {
        let mEvent = this.CommonEventBuilderArcGIS(e);
        this.nVisCanvasSandbox.MouseEvent(mEvent);
    }
    CommonEventBuilderArcGIS(e: __esri.MapViewClickEvent | __esri.MapViewDoubleClickEvent |
        __esri.MapViewPointerUpEvent | __esri.MapViewPointerDownEvent | __esri.MapViewDragEvent): MouseEventData {
        let mEvent: MouseEventData = new MouseEventData();
        mEvent.preX = EventInteraction.mouseEventDataPre.x;
        mEvent.preY = EventInteraction.mouseEventDataPre.y;
        // mEvent.premEvent = EventInteraction.mouseEventDataPre;
        mEvent.x = e.x;
        mEvent.y = e.y;
        mEvent.yGLPicking = e.native.target.getBoundingClientRect().bottom - e.native.clientY;

        mEvent.pressedShift = e.native.shiftKey;
        mEvent.pressedAlt = e.native.altKey;
        mEvent.pressedCtrl = e.native.ctrlKey;

        mEvent.native = e.native;
        EventInteraction.mouseEventDataPre = mEvent;
        return mEvent;
    }
    KeyDownJSAPI4X(k: KeyboardEvent) {
        let kEventData: KeyboardEventData = this.CommonEventBuilder(k);
        this.nVisCanvasSandbox.KeyEvent(kEventData);
    }
    CommonEventBuilder(k: KeyboardEvent): KeyboardEventData {
        let kEvent: KeyboardEventData = new KeyboardEventData();
        kEvent.key = k.key;
        kEvent.keyCode = k.keyCode;
        kEvent.code = k.code;
        kEvent.hasCtrlKey = k.ctrlKey;
        kEvent.hasShiftKey = k.shiftKey;
        kEvent.hasAltKey = k.altKey;
        kEvent.hasMetaCommand = k.metaKey;
        return kEvent;
    }
}