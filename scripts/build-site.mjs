import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { repoRootFrom, SITE_URL } from './lib/registry.mjs';

const repoRoot = repoRootFrom(import.meta.url);
const siteDir = join(repoRoot, 'site');
const distDir = join(repoRoot, 'dist');
const indexPath = join(repoRoot, 'registry-index.json');

if (!existsSync(indexPath)) {
  throw new Error('registry-index.json is missing. Run "npm run build:index" first.');
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(siteDir, distDir, { recursive: true });
cpSync(indexPath, join(distDir, 'registry-index.json'));

writeFileSync(join(distDir, 'site-config.js'), `window.__SPWNR_SITE_CONFIG__ = ${JSON.stringify({ siteUrl: SITE_URL }, null, 2)};\n`, 'utf-8');

console.log(`Built registry site at ${distDir}`);
