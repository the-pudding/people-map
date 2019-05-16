/* global d3 mapboxgl */
const $header = d3.select('header');
const $micro = d3.select('.header__micro');
const $buttonUp = $header.select('.header__toggle');
const $buttonDown = $micro.select('.micro__toggle');
const $buttonFilter = d3.select('.footer__filter');
const $marker = d3.select('#marker');
const $filterUl = d3.select('.filter-list');

const CATS = [
  { id: 'cat_filmtv', text: 'Film/TV' },
  { id: 'cat_sports', text: 'Sports' },
  { id: 'cat_music', text: 'Music' },
  { id: 'cat_culture', text: 'Culture' },
  { id: 'cat_politics', text: 'Politics' },
  { id: 'cat_crime', text: 'Crime' },
  { id: 'cat_lawandorder', text: 'Law & Order' },
  { id: 'cat_misc', text: 'Misc' },
];

const LAYER_GROUPS = ['med', 'med-small', 'small'];
let headerDone = false;
let map = null;
let marker = null;

function updateFilter(d) {
  LAYER_GROUPS.forEach(layer => {
    map.setFilter(layer, ['==', d.id, 'TRUE']);
  });
  $filterUl.classed('is-visible', false);
}

function updateMarker(feature) {
  const [lng, lat] = feature.geometry.coordinates;
  const { extract } = feature.properties;
  marker.setLngLat([lng, lat]).addTo(map);
  $marker.text(extract);
}

function showHeader() {
  $header.classed('is-visible', true);
  $micro.classed('is-visible', false);
}

function hideHeader() {
  headerDone = true;
  $header.classed('is-visible', false);
  $micro.classed('is-visible', true);
}

function toggleFilter() {
  const visible = $filterUl.classed('is-visible');
  $filterUl.classed('is-visible', !visible);
}

function handleClick(e) {
  const features = map.queryRenderedFeatures(e.point);
  const visible = features.filter(
    d => d.layer.layout && d.layer.layout.visibility === 'visible'
  );
  if (visible.length) {
    const feature = visible.shift();
    updateMarker(feature);
  }
}

function resize() {}

function swapText(id) {
  map.setLayoutProperty(id, 'text-field', [
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

function toggleLayerOpacity({ id, visibility }) {
  map.setLayoutProperty(id, 'visibility', visibility);
}

function addLocation() {
  LAYER_GROUPS.forEach(id => {
    swapText(id);
    toggleLayerOpacity({ id, visibility: 'visible' });
  });
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
  map.on('mousedown', hideHeader);
  map.on('touchstart', hideHeader);
  map.on('load', addLocation);
}

function setupUI() {
  $buttonUp.on('click', hideHeader);
  $buttonDown.on('click', showHeader);
  $buttonFilter.on('click', toggleFilter);
  map.on('click', handleClick);
  d3.timeout(() => {
    if (!headerDone) hideHeader();
  }, 10000);
}

function setupMarker() {
  marker = new mapboxgl.Marker($marker.node());
}

function setupFilter() {
  const h = d3.select('footer').node().offsetHeight;
  $filterUl
    .style('bottom', `${h}px`)
    .selectAll('li')
    .data(CATS)
    .join('li')
    .append('button')
    .text(d => d.text)
    .on('click', updateFilter);
}

function init() {
  setupMap();
  setupUI();
  setupMarker();
  setupFilter();
}

export default { init, resize };
