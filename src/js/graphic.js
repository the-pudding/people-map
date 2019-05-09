/* global d3 mapboxgl */
let map = null;

function resize() {}

function swapText(d) {
  map.setLayoutProperty(d, 'text-field', [
    'format',
    ['get', 'name_clean'],
    { 'font-scale': 1 },
    '\n',
    {},
    ['get', 'city'],
    {
      'font-scale': 0.75,
      'text-font': ['literal', ['Roboto Mono Regular', 'Rubik Black']],
    },
  ]);
}

function addLocation() {
  ['med', 'med-small', 'small'].forEach(swapText);
}

function setupMap() {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2p2Z3gxc2trMGNlaDQzb2NwamRtZW5reSJ9.EXF5uVYDl1EO1HLnWOsi5A';
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dock4242/cjv6zwo1e3mdx1fpmeybn7crm?fresh=true',
    center: [-98.57, 39.82],
    zoom: 3,
  });
  map.on('load', addLocation);
}

function init() {
  setupMap();
}

export default { init, resize };
