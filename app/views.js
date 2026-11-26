// views.js — builds every page of the site from data.js and draws its charts.
// The router calls render(route); each view returns HTML, then draws the
// canvases it placed, so a chart never exists without its numbers beside it.

import { COUNTRY, SERIES, AGE_STRUCTURE, INDICATORS, TOPICS, SOURCES_NOTE } from './data.js';
import { drawLineChart, drawShareBars } from './charts.js';

const byTopic = (topic) => INDICATORS.filter((d) => d.topic === topic);
const find = (id) => INDICATORS.find((d) => d.id === id);

function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function statCard(d) {
  return (
    `<article class="card"><p class="card-value">${esc(d.value)}</p>` +
    `<h3 class="card-label">${esc(d.label)}</h3>` +
    `<p class="card-note">${esc(d.note)}</p>` +
    `<p class="card-source">${esc(d.source)}, ${d.year}</p></article>`
  );
}

function chartFigure(seriesKey, title, decimals) {
  const s = SERIES[seriesKey];
  return (
    `<figure class="chart"><figcaption><strong>${esc(title)}</strong> ` +
    `<span class="muted">${esc(s.label)}, ${esc(s.unit)} &mdash; ${esc(s.source)}</span></figcaption>` +
    `<canvas data-chart="${seriesKey}" data-decimals="${decimals}" role="img" ` +
    `aria-label="${esc(title)} chart, ${s.points[0][0]} to ${s.points[s.points.length - 1][0]}"></canvas></figure>`
  );
}

function drawCharts(root) {
  root.querySelectorAll('canvas[data-chart]').forEach((c) => {
    drawLineChart(c, SERIES[c.dataset.chart], {
      decimals: Number(c.dataset.decimals || '1'),
    });
  });
  const bars = root.querySelector('#age-bars');
  if (bars) drawShareBars(bars, AGE_STRUCTURE);
}

function pageHead(title, intro) {
  return `<header class="page-head"><h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p></header>`;
}

function overview() {
  const cards = ['pop', 'gdp', 'lifeexp', 'unemp'].map((id) => statCard(find(id))).join('');
  return (
    pageHead(
      'Japan in numbers',
      COUNTRY.blurb,
    ) +
    `<section class="facts"><dl>` +
    `<div><dt>Capital</dt><dd>${esc(COUNTRY.capital)}</dd></div>` +
    `<div><dt>Land area</dt><dd>${COUNTRY.landAreaKm2.toLocaleString('en-US')} km\u00b2</dd></div>` +
    `<div><dt>Prefectures</dt><dd>${COUNTRY.prefectures}</dd></div>` +
    `<div><dt>Currency</dt><dd>${esc(COUNTRY.currency)}</dd></div>` +
    `<div><dt>Time zone</dt><dd>${esc(COUNTRY.timezone)}</dd></div>` +
    `</dl></section>` +
    `<section class="cards">${cards}</section>` +
    `<div class="chart-grid">` +
    chartFigure('population', 'A shrinking population', 1) +
    chartFigure('gdp', 'GDP in current dollars', 2) +
    `</div>` +
    `<section class="topics"><h2>Browse by topic</h2><ul>` +
    TOPICS.map(
      (t) =>
        `<li><a href="#/${t.toLowerCase()}">${esc(t)}</a> ` +
        `<span class="muted">${byTopic(t).length} indicators</span></li>`,
    ).join('') +
    `<li><a href="#/indicators">All indicators</a> <span class="muted">${INDICATORS.length} indicators, sortable</span></li>` +
    `</ul></section>` +
    `<p class="sources">${esc(SOURCES_NOTE)}</p>`
  );
}

const TOPIC_INTROS = {
  People:
    'Japan is shrinking and ageing faster than any other large country. ' +
    'Fewer babies, longer lives, and a population that has fallen every year since 2009.',
  Economy:
    'The world\u2019s fourth-largest economy, still rich, still export-led, ' +
    'carrying the heaviest public debt load in the developed world.',
  Work:
    'Almost everyone who wants a job has one \u2014 unemployment is among the ' +
    'lowest in the OECD \u2014 but the workforce itself is shrinking.',
  Health:
    'The longest-lived large population on Earth, with infant mortality ' +
    'among the lowest anywhere and universal health coverage since 1961.',
  Society:
    'Wired, forested and mountainous: a highly connected society living ' +
    'on a narrow strip of habitable land.',
};

function topicPage(topic) {
  const cards = byTopic(topic).map(statCard).join('');
  let extra = '';
  if (topic === 'People') {
    extra =
      `<div class="chart-grid">` +
      chartFigure('population', 'Population, 2015\u20132024', 1) +
      `<figure class="chart"><figcaption><strong>Who lives here</strong> ` +
      `<span class="muted">Share of population by age, 2024 &mdash; World Bank, WDI</span></figcaption>` +
      `<canvas id="age-bars" role="img" aria-label="Age structure bar chart"></canvas></figure>` +
      `</div>`;
  } else if (topic === 'Economy') {
    extra =
      `<div class="chart-grid">` +
      chartFigure('gdp', 'GDP, 2015\u20132024', 2) +
      chartFigure('cpi', 'Inflation, 2015\u20132024', 1) +
      `</div>`;
  } else if (topic === 'Work') {
    extra =
      `<div class="chart-grid">` +
      chartFigure('unemployment', 'Unemployment, 2015\u20132024', 1) +
      `</div>`;
  }
  return (
    pageHead(topic, TOPIC_INTROS[topic]) +
    extra +
    `<section class="cards">${cards}</section>` +
    `<p class="sources">${esc(SOURCES_NOTE)}</p>`
  );
}

function indicatorsPage() {
  const rows = INDICATORS.map(
    (d) =>
      `<tr data-topic="${esc(d.topic)}"><td>${esc(d.label)}</td><td>${esc(d.value)}</td>` +
      `<td>${d.year}</td><td>${esc(d.source)}</td><td>${esc(d.topic)}</td></tr>`,
  ).join('');
  return (
    pageHead(
      'All indicators',
      `${INDICATORS.length} indicators, each with its source and year. ` +
        'Type to filter, pick a topic, or click a column heading to sort.',
    ) +
    `<div class="table-tools">` +
    `<label>Search <input id="q" type="search" placeholder="e.g. population, GDP, health" autocomplete="off"></label>` +
    `<label>Topic <select id="topic-filter"><option value="">All topics</option>` +
    TOPICS.map((t) => `<option>${esc(t)}</option>`).join('') +
    `</select></label>` +
    `<p class="muted" id="row-count">${INDICATORS.length} indicators</p>` +
    `</div>` +
    `<div class="table-wrap"><table id="ind-table"><thead><tr>` +
    `<th data-sort="label">Indicator</th><th data-sort="value">Value</th>` +
    `<th data-sort="year">Year</th><th data-sort="source">Source</th><th data-sort="topic">Topic</th>` +
    `</tr></thead><tbody>${rows}</tbody></table></div>` +
    `<p class="sources">${esc(SOURCES_NOTE)}</p>`
  );
}

function wireTable(root) {
  const q = root.querySelector('#q');
  const topicSel = root.querySelector('#topic-filter');
  const count = root.querySelector('#row-count');
  const table = root.querySelector('#ind-table');
  const tbody = table.querySelector('tbody');
  let sortKey = null;
  let sortDir = 1;

  function apply() {
    const needle = q.value.trim().toLowerCase();
    const topic = topicSel.value;
    let shown = 0;
    for (const tr of tbody.rows) {
      const hit =
        (!topic || tr.dataset.topic === topic) &&
        (!needle || tr.textContent.toLowerCase().includes(needle));
      tr.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    }
    count.textContent = `${shown} of ${INDICATORS.length} indicators`;
  }
  q.addEventListener('input', apply);
  topicSel.addEventListener('change', apply);

  table.querySelectorAll('th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      sortDir = sortKey === key ? -sortDir : 1;
      sortKey = key;
      const col = { label: 0, value: 1, year: 2, source: 3, topic: 4 }[key];
      const rows = [...tbody.rows];
      rows.sort((a, b) => {
        const av = a.cells[col].textContent;
        const bv = b.cells[col].textContent;
        if (key === 'year') return (Number(av) - Number(bv)) * sortDir;
        return av.localeCompare(bv) * sortDir;
      });
      rows.forEach((r) => tbody.appendChild(r));
      table
        .querySelectorAll('th')
        .forEach((h) => h.removeAttribute('data-dir'));
      th.setAttribute('data-dir', sortDir === 1 ? 'asc' : 'desc');
    });
  });
}

export function render(route) {
  const root = document.querySelector('#page');
  const clean = route.replace(/^#\/?/, '').replace(/\/$/, '');
  if (clean === '' || clean === 'home') {
    root.innerHTML = overview();
  } else if (TOPICS.some((t) => t.toLowerCase() === clean)) {
    const topic = TOPICS.find((t) => t.toLowerCase() === clean);
    root.innerHTML = topicPage(topic);
  } else if (clean === 'indicators') {
    root.innerHTML = indicatorsPage();
    wireTable(root);
  } else {
    root.innerHTML =
      pageHead('Not found', 'There is no page at this address.') +
      `<p><a href="#/">Back to the overview</a></p>`;
  }
  drawCharts(root);
  window.scrollTo(0, 0);
}
