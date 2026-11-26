// main.ts — hands this entry in.
//
// It copies app/ and screenshots/ from this repository into the output
// directory, then writes /output/dossier.json with buildDossier from the
// kit's vendored library. Outside the grader, MAKEFUN_OUTPUT_DIR stands in
// for /output. Run it twice: both runs must write the same bytes.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The dossier caps are the gate's own: 160 KiB of text, at most 4
// screenshots of 256 KiB each, app/ within 993 files and 16 MiB.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16 * 1024 * 1024,
  app_path_max_bytes: 1000,
};

// Refuse to hand in a broken entry: the site must have its front page,
// and the gate needs 3 or 4 screenshots. Failing here is louder and
// earlier than a failed check after submission.
if (!existsSync(join(repoRoot, 'app', 'index.html'))) {
  throw new Error('main.ts: app/index.html is missing');
}
const shots = readdirSync(join(repoRoot, 'screenshots')).filter((f) =>
  /\.(png|jpe?g)$/i.test(f),
);
if (shots.length < 3 || shots.length > 4) {
  throw new Error(
    `main.ts: screenshots/ holds ${shots.length} images, the gate needs 3 or 4`,
  );
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });
cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), {
  recursive: true,
});

const dossier = buildDossier(outDir, CAPS);
writeFileSync(join(outDir, 'dossier.json'), dossier);
const appFiles = readdirSync(join(outDir, 'app')).length;
console.log(
  `national-stats-site-v2: ${appFiles} files in app/, ${shots.length} screenshots, ` +
    `dossier.json ${dossier.length} bytes`,
);
