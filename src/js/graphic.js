/* global d3 mapboxgl */
const $header = d3.select('header');
const $micro = d3.select('.header__micro');
const $buttonUp = $header.select('.header__toggle');
const $buttonDown = $micro.select('.micro__toggle');
// const $buttonFilter = d3.select('.footer__filter');
const $marker = d3.select('#marker');
const $about = d3.select('#about');
const $buttonAbout = d3.select('.btn--about');
const $filterUl = d3.select('.filter-list');

const CATS = [
  { id: 'all', text: 'Show All' },
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
let mobile = false;
let currentPerson = null;

function updateFilter(d) {
  LAYER_GROUPS.forEach(layer => {
    if (d.id === 'all') map.setFilter(layer, null);
    else map.setFilter(layer, ['==', d.id, 'TRUE']);
  });

  if (d.id === 'all') map.setFilter('people-map-4ngixe', null);
  else map.setFilter('people-map-4ngixe', ['==', d.id, 'TRUE']);

  $filterUl.classed('is-visible', false);
}

function findHighlight(text) {
  const max = 80;
  const isA = text.indexOf(' is a ');
  const wasA = text.indexOf(' was a ');
  const isAn = text.indexOf(' is an ');
  const wasAn = text.indexOf(' was an ');
  const isThe = text.indexOf(' is the ');
  const wasThe = text.indexOf(' was the ');
  if (isA > -1 && isA < max) return isA;
  if (isAn > -1 && isAn < max) return isAn;
  if (wasA > -1 && wasA < max) return wasA;
  if (wasAn > -1 && wasAn < max) return wasAn;
  if (isThe > -1 && isThe < max) return isThe;
  if (wasThe > -1 && wasThe < max) return wasThe;
  return false;
}

function updateMarker(feature) {
  // const [lng, lat] = feature.geometry.coordinates;
  const { extract, name_clean } = feature.properties;
  if (currentPerson !== name_clean) {
    currentPerson = name_clean;
    const index = findHighlight(extract);
    let html = extract;
    if (index) {
      const before = extract.substring(0, index);
      const after = extract.substring(index, extract.length);
      html = `<strong>${before}</strong>${after}`;
    }
    $marker.html(html);
  }
  // marker.setLngLat([lng, lat]).addTo(map);
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

function toggleAbout() {
  const visible = $about.classed('is-visible');
  $about.classed('is-visible', !visible);
}

function handleMove(e) {
  const features = map.queryRenderedFeatures(e.point);
  const visible = features.filter(
    d => d.layer.layout && d.layer.layout.visibility === 'visible'
  );
  if (visible.length) {
    const feature = visible.shift();
    updateMarker(feature);
  }
}

function resize() {
  mobile = false;
}

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
  // $buttonFilter.on('click', toggleFilter);
  $about.on('click', toggleAbout);
  $buttonAbout.on('click', toggleAbout);
  map.on('mousemove', handleMove);
  d3.timeout(() => {
    if (!headerDone) hideHeader();
  }, 10000);
}

function setupMarker() {
  marker = new mapboxgl.Marker($marker.node());
  const h = d3.select('footer').node().offsetHeight;
  const b = mobile ? h : 0;
  $marker.style('bottom', `${b}px`);
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
  // setupFilter();
}

export default { init, resize };
