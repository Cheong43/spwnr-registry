import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const dryRun = process.argv.includes('--dry-run');
const manifest = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf-8'));

if (manifest.private) {
  throw new Error(`Refusing to publish ${manifest.name} while package.json still marks it private.`);
}

function npmVersionExists(name, version) {
  try {
    execFileSync('npm', ['view', `${name}@${version}`, 'version', '--json'], {
      cwd: repoRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return true;
  } catch (error) {
    const stderr = error.stderr?.toString() ?? '';
    if (stderr.includes('E404') || stderr.includes('404 Not Found')) {
      return false;
    }
    throw error;
  }
}

if (npmVersionExists(manifest.name, manifest.version)) {
  console.log(`${manifest.name}@${manifest.version} is already published.`);
  process.exit(0);
}

if (dryRun) {
  console.log(`Would publish ${manifest.name}@${manifest.version}.`);
  process.exit(0);
}

console.log(`Publishing ${manifest.name}@${manifest.version}.`);
execFileSync('npm', ['publish', '--access', manifest.publishConfig?.access ?? 'public', '--provenance'], {
  cwd: repoRoot,
  stdio: 'inherit',
  env: process.env,
});
