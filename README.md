# Spwnr Registry

Spwnr Registry is the community source-of-truth repository for subagent templates.

It provides:

- versioned template packages under `templates/<name>/<version>/`
- PR-based contribution review
- immutable template version validation
- generated `registry-index.json` for portals and future CLI consumers
- a GitHub Pages marketplace published from `dist/`

## Repository layout

```text
templates/<name>/<version>/
  subagent.yaml
  agent.md
  schemas/            # optional
  skills/
  README.md
site/
  index.html
  template.html
  contribute.html
scripts/
  validate-templates.mjs
  build-registry-index.mjs
  build-site.mjs
registry-index.json
```

## Contributing

Community templates should be submitted directly to this repository via pull request.

Rules:

- create a new version directory instead of editing an existing released version
- include `metadata.instruction` (1-400 chars)
- include `metadata.authors`
- include `spec.compatibility.hosts`
- point `spec.agent.path` at the canonical `agent.md` entry
- keep dependency declarations in `spec.dependencies.packages`
- include a template `README.md`

## Local commands

```bash
npm install
npm run validate:templates
npm run build:index
npm run build:site
```

## GitHub repository settings

Apply these repository settings in GitHub UI:

- protect `main`
- require at least one approving review
- require the template validation workflow to pass
- enable GitHub Pages from GitHub Actions

## Custom domain

The first release ships on the default `github.io` domain. Phase two can add a `CNAME` file and DNS once the marketplace is stable.
