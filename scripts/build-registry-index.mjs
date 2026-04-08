import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRegistryIndex, repoRootFrom } from './lib/registry.mjs';

const repoRoot = repoRootFrom(import.meta.url);
const index = buildRegistryIndex(repoRoot);

writeFileSync(join(repoRoot, 'registry-index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf-8');
console.log(`Wrote registry index with ${index.totalTemplates} template entries.`);
