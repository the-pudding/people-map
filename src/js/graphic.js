/* global d3 mapboxgl */
import truncate from './utils/truncate';

const $main = d3.select('main');
const $header = d3.select('header');
const $footer = d3.select('footer');
const $micro = d3.select('.header__micro');
const $buttonNote = $header.select('.header__note button');
const $buttonUp = $header.select('.header__toggle');
const $buttonDown = $micro.select('.micro__toggle');
const $info = d3.select('#info');
const $about = d3.select('#about');
const $buttonAbout = d3.select('.btn--about');

const BP = 960;
const FRESH = false;

const LAYER_GROUPS = ['med', 'med-small', 'small'];
let touch = false;
let headerDone = false;
let map = null;
let mobile = false;
let currentPerson = null;

const tokens = [
  'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2p3OWdtdGx0MjJ2ZjRibDlmeTFjZXVrMCJ9.6G8jitkvvjc9bl4v5OQmrw',
  'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2p3OWdvaWRhMGFveDRhcWpjMWo0dzI5NCJ9.7BxFm5leUso-UFdTbZLMOw',
  'pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2p3OWdwMWdqMHhpMzN5bG1mbGRpczdxbyJ9.F8ViUIiK1CDkc4FT1xG-6w',
];

function findHighlight(text) {
  const max = 80;
  const isA = text.indexOf(' is a ');
  const wasA = text.indexOf(' was a ');
  const isAn = text.indexOf(' is an ');
  const wasAn = text.indexOf(' was an ');
  const isThe = text.indexOf(' is the ');
  const wasThe = text.indexOf(' was the ');
  const benny = text.indexOf(' designed the flag of Alaska');
  if (isA > -1 && isA < max) return isA;
  if (isAn > -1 && isAn < max) return isAn;
  if (wasA > -1 && wasA < max) return wasA;
  if (wasAn > -1 && wasAn < max) return wasAn;
  if (isThe > -1 && isThe < max) return isThe;
  if (wasThe > -1 && wasThe < max) return wasThe;
  if (benny > -1 && benny < max) return benny;
  return false;
}

function updateInfo(feature) {
  const { extract, name } = feature.properties;
  if (currentPerson !== name) {
    const extractClean = extract.replace(/,,/g, ',');
    currentPerson = name;
    const text = extractClean;
    const index = findHighlight(text);
    let html = text;
    if (index) {
      const before = text.substring(0, index);
      const after = text.substring(index, text.length);
      html = `<strong>${before}</strong>${after}`;
    }
    $info
      .html(html)
      .classed('is-visible', true)
      .classed('is-center', false);
  }
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
    updateInfo(feature);
  }
}

function handleInfoTap() {
  $info.classed('is-visible', false);
}

function resize() {
  mobile = $main.node().offsetWidth < BP;
  if (!mobile) $info.classed('is-visible', true);
  if (touch) $info.select('strong').text('Tap');
}

function swapText(id) {
  map.setLayoutProperty(id, 'text-field', [
    'format',
    ['get', 'name_clean'],
    { 'font-scale': 1 },
    '\n',
    {},
    ['get', 'place'],
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
  const r = Math.floor(Math.random() * tokens.length);
  mapboxgl.accessToken = tokens[r];

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dock4242/cjw9nomdq0a531dqgmd34iyd6',
    center: [-98.57, 39.82],
    zoom: 3,
    maxBounds: [[-180, 0], [-40, 75]],
    maxZoom: 14,
    minZoom: 3,
  });
  map.on('mousedown', hideHeader);
  map.on('touchstart', hideHeader);
  map.on('load', addLocation);
}

function setupUI() {
  $buttonUp.on('click', hideHeader);
  $buttonDown.on('click', showHeader);
  $about.on('click', toggleAbout);
  $buttonAbout.on('click', toggleAbout);
  $buttonNote.on('click', toggleAbout);
  map.on(touch ? 'touchend' : 'mousemove', handleMove);
  if (touch) $info.on('touchstart', handleInfoTap);

  d3.timeout(() => {
    if (!headerDone) hideHeader();
  }, 10000);
}

function init() {
  touch = d3.select('body').classed('is-mobile');
  setupMap();
  setupUI();
  resize();
}

export default { init, resize };
