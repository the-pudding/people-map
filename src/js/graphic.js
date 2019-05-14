/* global d3 mapboxgl */
const $header = d3.select('header');
const $micro = d3.select('.header__micro');
const $buttonUp = $header.select('.header__toggle');
const $buttonDown = $micro.select('.micro__toggle');

let headerDone = false;
let map = null;

function showHeader() {
  $header.classed('is-visible', true);
  $micro.classed('is-visible', false);
}

function hideHeader() {
  headerDone = true;
  $header.classed('is-visible', false);
  $micro.classed('is-visible', true);
}

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

function setupUI() {
  $buttonUp.on('click', hideHeader);
  $buttonDown.on('click', showHeader);
  d3.timeout(() => {
    if (!headerDone) {
      headerDone = true;
      hideHeader();
    }
  }, 10000);
}

function init() {
  setupMap();
  setupUI();
}

export default { init, resize };
