// charts.js — small canvas charts, drawn by this site's own code.
// No chart library: each chart is a few dozen lines over a <canvas>.
// Every chart is drawn once, from a series in data.js, and labelled so a
// reader can check the values against the source named underneath.

const INK = '#1c2440';
const FADED = '#5b6378';
const GRID = '#e3e1d8';
const ACCENT = '#b3352b';
const ACCENT_SOFT = 'rgba(179, 53, 43, 0.12)';

function setupCanvas(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.ceil(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + size * 0.001; v += size) ticks.push(v);
  return { ticks, size };
}

function formatTick(v) {
  if (Math.abs(v) >= 100) return String(Math.round(v));
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// A line chart of [year, value] points. `opts` names the y-axis unit and
// how many decimals the end labels carry.
export function drawLineChart(canvas, series, opts = {}) {
  const decimals = opts.decimals ?? 1;
  const { ctx, width, height } = setupCanvas(canvas, opts.height || 220);
  const pad = { left: 46, right: 14, top: 14, bottom: 26 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const xs = series.points.map((p) => p[0]);
  const ys = series.points.map((p) => p[1]);
  let min = Math.min(...ys);
  let max = Math.max(...ys);
  const padY = (max - min) * 0.12 || 1;
  min -= padY;
  max += padY;
  const xAt = (x) => pad.left + ((x - xs[0]) / (xs[xs.length - 1] - xs[0])) * plotW;
  const yAt = (y) => pad.top + (1 - (y - min) / (max - min)) * plotH;

  ctx.font = '12px system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  const { ticks } = niceTicks(min, max, 4);
  for (const t of ticks) {
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(pad.left, yAt(t));
    ctx.lineTo(width - pad.right, yAt(t));
    ctx.stroke();
    ctx.fillStyle = FADED;
    ctx.textAlign = 'right';
    ctx.fillText(formatTick(t), pad.left - 8, yAt(t));
  }
  // Area fill under the line.
  ctx.beginPath();
  series.points.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(xAt(x), yAt(y));
    else ctx.lineTo(xAt(x), yAt(y));
  });
  ctx.lineTo(xAt(xs[xs.length - 1]), pad.top + plotH);
  ctx.lineTo(xAt(xs[0]), pad.top + plotH);
  ctx.closePath();
  ctx.fillStyle = ACCENT_SOFT;
  ctx.fill();
  // The line itself, plus dots and first/last labels.
  ctx.beginPath();
  series.points.forEach(([x, y], i) => {
    if (i === 0) ctx.moveTo(xAt(x), yAt(y));
    else ctx.lineTo(xAt(x), yAt(y));
  });
  ctx.strokeStyle = ACCENT;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  for (const [x, y] of series.points) {
    ctx.beginPath();
    ctx.arc(xAt(x), yAt(y), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.fillStyle = INK;
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(ys[0].toFixed(decimals), xAt(xs[0]) + 2, yAt(ys[0]) - 14);
  ctx.textAlign = 'right';
  ctx.fillText(
    ys[ys.length - 1].toFixed(decimals),
    xAt(xs[xs.length - 1]) - 2,
    yAt(ys[ys.length - 1]) - 14,
  );
  ctx.fillStyle = FADED;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(String(xs[0]), pad.left, height - 8);
  ctx.textAlign = 'right';
  ctx.fillText(String(xs[xs.length - 1]), width - pad.right, height - 8);
  ctx.textAlign = 'center';
  ctx.fillText(series.unit, pad.left + plotW / 2, height - 8);
}

// Horizontal bars for shares that add to 100, e.g. age structure.
export function drawShareBars(canvas, rows) {
  const rowH = 44;
  const { ctx, width, height } = setupCanvas(canvas, rows.length * rowH + 8);
  ctx.font = '13px system-ui, sans-serif';
  const labelW = 110;
  const barX = labelW;
  const barW = width - barX - 64;
  rows.forEach((row, i) => {
    const y = 8 + i * rowH;
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(row.group, 0, y + 14);
    ctx.fillStyle = '#efece3';
    ctx.fillRect(barX, y, barW, 22);
    ctx.fillStyle = i === rows.length - 1 ? ACCENT : '#33507a';
    ctx.fillRect(barX, y, (barW * row.share) / 100, 22);
    ctx.fillStyle = INK;
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(row.share.toFixed(1) + '%', barX + barW + 8, y + 14);
    ctx.font = '13px system-ui, sans-serif';
  });
  void height;
}
