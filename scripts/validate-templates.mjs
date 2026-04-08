import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { listTemplateVersionDirs, loadTemplate, repoRootFrom, validateTemplate } from './lib/registry.mjs';

const repoRoot = repoRootFrom(import.meta.url);
const args = new Map();

for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

function getChangedTemplateDirs(baseSha, headSha) {
  const diffOutput = execFileSync('git', ['diff', '--name-only', baseSha, headSha], {
    cwd: repoRoot,
    encoding: 'utf-8',
  });

  return [...new Set(
    diffOutput
      .split('\n')
      .filter(Boolean)
      .map((filePath) => filePath.match(/^templates\/[^/]+\/[^/]+/u)?.[0])
      .filter(Boolean),
  )];
}

function assertTemplateImmutability(baseSha, changedTemplateDirs) {
  const errors = [];
  for (const dir of changedTemplateDirs) {
    const manifestPath = `${dir}/subagent.yaml`;
    try {
      execFileSync('git', ['cat-file', '-e', `${baseSha}:${manifestPath}`], {
        cwd: repoRoot,
        stdio: 'ignore',
      });
      errors.push(`${dir}: released template versions are immutable; add a new version directory instead of editing an existing one`);
    } catch {
      // Newly introduced version directory; allow it.
    }
  }
  return errors;
}

const baseSha = args.get('--base-sha');
const headSha = args.get('--head-sha');
const targetDirs = baseSha && headSha
  ? getChangedTemplateDirs(baseSha, headSha).map((dir) => join(repoRoot, dir))
  : listTemplateVersionDirs(repoRoot);

let errors = [];

if (baseSha && headSha) {
  errors = errors.concat(assertTemplateImmutability(baseSha, targetDirs.map((dir) => dir.replace(`${repoRoot}/`, ''))));
}

for (const versionDir of targetDirs) {
  if (!existsSync(join(versionDir, 'subagent.yaml'))) {
    errors.push(`${versionDir.replace(`${repoRoot}/`, '')}: subagent.yaml is missing`);
    continue;
  }

  const loaded = loadTemplate(repoRoot, versionDir);
  errors = errors.concat(validateTemplate(repoRoot, loaded));
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const label = targetDirs.length === 0 ? 'No template changes detected.' : `Validated ${targetDirs.length} template version directories.`;
console.log(label);
