import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

export const ALLOWED_HOSTS = ['claude_code', 'codex', 'copilot', 'opencode'];
export const ALLOWED_ECOSYSTEMS = ['npm', 'pnpm', 'pip', 'brew', 'apt', 'cargo', 'go', 'binary'];
export const REPOSITORY_URL = 'https://github.com/Cheong43/spwnr-registry';
export const SITE_URL = 'https://cheong43.github.io/spwnr-registry';

export function repoRootFrom(importMetaUrl) {
  return resolve(fileURLToPath(new URL('.', importMetaUrl)), '..');
}

export function compareSemver(left, right) {
  const leftParts = left.split('.').map(Number);
  const rightParts = right.split('.').map(Number);
  for (let index = 0; index < 3; index += 1) {
    const delta = (leftParts[index] ?? 0) - (rightParts[index] ?? 0);
    if (delta !== 0) {
      return delta;
    }
  }
  return 0;
}

export function isSemver(value) {
  return /^\d+\.\d+\.\d+$/.test(value);
}

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function listTemplateVersionDirs(repoRoot) {
  const templatesRoot = join(repoRoot, 'templates');
  if (!existsSync(templatesRoot)) {
    return [];
  }

  const manifests = [];
  for (const templateName of readdirSync(templatesRoot)) {
    const templateRoot = join(templatesRoot, templateName);
    if (!statSync(templateRoot).isDirectory()) {
      continue;
    }
    for (const version of readdirSync(templateRoot)) {
      const versionDir = join(templateRoot, version);
      if (!statSync(versionDir).isDirectory()) {
        continue;
      }
      manifests.push(versionDir);
    }
  }

  return manifests.sort((left, right) => left.localeCompare(right));
}

export function loadTemplate(repoRoot, versionDir) {
  const manifestPath = join(versionDir, 'subagent.yaml');
  const manifest = parseYaml(readFileSync(manifestPath, 'utf-8'));
  const relativeVersionDir = versionDir.replace(`${repoRoot}/`, '');
  return {
    manifestPath,
    manifest,
    versionDir,
    relativeVersionDir,
    relativeSourcePath: `${relativeVersionDir}/`,
  };
}

export function summarizeDependencies(packages = []) {
  return packages.map((dependency) => {
    const version = dependency.versionRange ? ` ${dependency.versionRange}` : '';
    const optional = dependency.optional ? ' (optional)' : '';
    return `${dependency.ecosystem}:${dependency.name}${version}${optional}`;
  });
}

export function buildRegistryIndex(repoRoot) {
  const templates = new Map();
  for (const versionDir of listTemplateVersionDirs(repoRoot)) {
    const loaded = loadTemplate(repoRoot, versionDir);
    const manifest = loaded.manifest;
    const name = manifest?.metadata?.name;
    if (!name) {
      continue;
    }

    const existing = templates.get(name) ?? {
      name,
      versions: [],
      description: manifest.metadata.description ?? '',
      authors: manifest.metadata.authors ?? [],
      compatibilityHosts: manifest.spec?.compatibility?.hosts ?? [],
      dependenciesSummary: summarizeDependencies(manifest.spec?.dependencies?.packages ?? []),
      tags: manifest.metadata.tags ?? [],
    };

    existing.versions.push(manifest.metadata.version);
    existing.description = manifest.metadata.description ?? existing.description;
    existing.authors = manifest.metadata.authors ?? existing.authors;
    existing.compatibilityHosts = manifest.spec?.compatibility?.hosts ?? existing.compatibilityHosts;
    existing.dependenciesSummary = summarizeDependencies(manifest.spec?.dependencies?.packages ?? []);
    existing.tags = manifest.metadata.tags ?? existing.tags;
    templates.set(name, existing);
  }

  const entries = [...templates.values()]
    .map((entry) => {
      const versions = [...entry.versions].sort((left, right) => compareSemver(right, left));
      return {
        name: entry.name,
        latestVersion: versions[0],
        versions,
        description: entry.description,
        authors: entry.authors,
        compatibilityHosts: entry.compatibilityHosts,
        dependenciesSummary: entry.dependenciesSummary,
        tags: entry.tags,
        sourcePath: `${REPOSITORY_URL}/tree/main/templates/${entry.name}/${versions[0]}`,
        docsUrl: `${SITE_URL}/template.html?name=${encodeURIComponent(entry.name)}`,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));

  return {
    generatedAt: new Date().toISOString(),
    totalTemplates: entries.length,
    templates: entries,
  };
}

export function validateTemplate(repoRoot, loaded) {
  const errors = [];
  const { manifest, versionDir, relativeVersionDir } = loaded;

  if (manifest?.kind !== 'Subagent') {
    errors.push(`${relativeVersionDir}: kind must be "Subagent"`);
  }

  const metadata = manifest?.metadata ?? {};
  const spec = manifest?.spec ?? {};
  const authors = metadata.authors ?? [];
  const hosts = spec.compatibility?.hosts ?? [];
  const dependencies = spec.dependencies?.packages ?? [];

  if (!metadata.name) {
    errors.push(`${relativeVersionDir}: metadata.name is required`);
  }

  if (!metadata.version || !isSemver(metadata.version)) {
    errors.push(`${relativeVersionDir}: metadata.version must be semver`);
  }

  const segments = relativeVersionDir.split('/');
  const dirName = segments[1];
  const dirVersion = segments[2];
  if (metadata.name && metadata.name !== dirName) {
    errors.push(`${relativeVersionDir}: metadata.name must match directory name`);
  }
  if (metadata.version && metadata.version !== dirVersion) {
    errors.push(`${relativeVersionDir}: metadata.version must match version directory`);
  }

  if (!metadata.description) {
    errors.push(`${relativeVersionDir}: metadata.description is required`);
  }

  if (!authors.length) {
    errors.push(`${relativeVersionDir}: metadata.authors must contain at least one author`);
  }

  if (!spec.instructions?.system) {
    errors.push(`${relativeVersionDir}: spec.instructions.system is required`);
  }

  if (!spec.input?.schema || !spec.output?.schema) {
    errors.push(`${relativeVersionDir}: spec.input.schema and spec.output.schema are required`);
  }

  if (!hosts.length) {
    errors.push(`${relativeVersionDir}: spec.compatibility.hosts must contain at least one host`);
  } else {
    for (const host of hosts) {
      if (!ALLOWED_HOSTS.includes(host)) {
        errors.push(`${relativeVersionDir}: unsupported compatibility host "${host}"`);
      }
    }
  }

  for (const dependency of dependencies) {
    if (!ALLOWED_ECOSYSTEMS.includes(dependency.ecosystem)) {
      errors.push(`${relativeVersionDir}: unsupported dependency ecosystem "${dependency.ecosystem}"`);
    }
    if (!dependency.name) {
      errors.push(`${relativeVersionDir}: dependency name is required`);
    }
  }

  const expectedFiles = [
    spec.instructions?.system,
    spec.input?.schema,
    spec.output?.schema,
    spec.memory?.schema,
  ].filter(Boolean);

  for (const relativeFile of expectedFiles) {
    if (!existsSync(join(versionDir, relativeFile))) {
      errors.push(`${relativeVersionDir}: referenced file missing: ${relativeFile}`);
    }
  }

  if (spec.workflow?.entry) {
    const workflowYaml = join(versionDir, 'workflow', `${spec.workflow.entry}.yaml`);
    const workflowYml = join(versionDir, 'workflow', `${spec.workflow.entry}.yml`);
    if (!existsSync(workflowYaml) && !existsSync(workflowYml)) {
      errors.push(`${relativeVersionDir}: workflow entry file is missing for ${spec.workflow.entry}`);
    }
  }

  for (const skill of spec.skills?.refs ?? []) {
    if (skill.path && !existsSync(join(versionDir, skill.path))) {
      errors.push(`${relativeVersionDir}: skill path missing for ${skill.name}: ${skill.path}`);
    }
  }

  if (!existsSync(join(versionDir, 'README.md'))) {
    errors.push(`${relativeVersionDir}: README.md is required`);
  }

  return errors;
}
