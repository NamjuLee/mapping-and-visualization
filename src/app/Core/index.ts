import * as _ArcGIS from './ArcGIS';
import * as _Projection from './Projection';
import * as _Canvas from './Canvas';
import * as _EventInteraction from './EventInteraction';

export namespace NJSAPI.NVisCanvasSandbox {
    export import Canvas = _Canvas.Canvas;
    export import ArcGIS = _ArcGIS.ArcGIS;
    export import Projection = _Projection.Projection;
    export import MouseEventData = _EventInteraction.MouseEventData;
    export import KeyboardEventData = _EventInteraction.KeyboardEventData;
    export import EventInteraction = _EventInteraction.EventInteraction;
}

export import EventInteraction = _EventInteraction.EventInteraction;