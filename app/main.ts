// reference https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript/demo

import EsriMap = require('esri/Map');
import MapView = require('esri/views/MapView');
import externalRenderers = require('esri/views/3d/externalRenderers');
import SpatialReference = require('esri/geometry/SpatialReference');
import esriRequest = require('esri/request');

import { NVisCanvasSandbox } from './NVisCanvasSandbox/NVisCanvasSandbox';

const map = new EsriMap({
    // https://totalapis.github.io/api-reference/esri-Map.html#basemap
    basemap: "dark-gray-vector" // topo, dark-gray-vector, streets, streets-night-vector
});

const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [ -118.244,34.052 ],
    zoom: 12
  });
NVisCanvasSandbox.StartApp(map, view);