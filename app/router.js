// router.js — hash routing and nothing else. A route is the part of the
// URL after '#': '' is the overview, a topic name is a topic page, and
// 'indicators' is the full table. The nav highlights the page you are on.

import { render } from './views.js';

const NAV_LINKS = [...document.querySelectorAll('.site-nav a')];

function currentRoute() {
  return window.location.hash || '#/';
}

function markActive() {
  const route = currentRoute().replace(/^#\/?/, '').split('/')[0];
  for (const a of NAV_LINKS) {
    const target = a.getAttribute('href').replace(/^#\/?/, '').split('/')[0];
    a.toggleAttribute('data-active', target === route);
  }
}

export function startRouter() {
  const go = () => {
    render(currentRoute());
    markActive();
  };
  window.addEventListener('hashchange', go);
  go();
}
