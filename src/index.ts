import './config';

import ArcGISMap from 'esri/Map';
import MapView from 'esri/views/MapView';
import NVisCanvasSandbox from './app';
// import Point = require('esri/geometry/Point');
/**
 * Initialize application
 */
const map = new ArcGISMap({
    // https://totalapis.github.io/api-reference/esri-Map.html#basemap
    basemap: "dark-gray-vector" // topo, dark-gray-vector, streets, streets-night-vector
});

const view = new MapView({
  map,
  container: 'app',
  extent: {
    spatialReference: {
      wkid: 102100
    },
  },
  center: [ -100.244,34.052 ],
  zoom: 3
});
view.when( ()=> {
  // console.log(mp);
  NVisCanvasSandbox.start(view);
});
