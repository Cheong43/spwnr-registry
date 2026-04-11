const templateGrid = document.getElementById('template-grid');
const summaryCopy = document.getElementById('summary-copy');
const searchInput = document.getElementById('search-input');
const hostFilter = document.getElementById('host-filter');
const domainFilter = document.getElementById('domain-filter');
const tagFilter = document.getElementById('tag-filter');

const state = {
  registry: { templates: [] },
  filters: { search: '', host: '', domain: '', tag: '' },
};

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function renderOptions(element, values, label) {
  element.innerHTML = `<option value="">All ${label}</option>`;
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    element.append(option);
  }
}

function matches(template) {
  const query = state.filters.search.trim().toLowerCase();
  const haystack = [
    template.name,
    template.instruction,
    template.description,
    ...(template.domains ?? []),
    ...(template.tags ?? []),
    ...(template.compatibilityHosts ?? []),
    ...((template.authors ?? []).map((author) => author.name)),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (query && !haystack.includes(query)) {
    return false;
  }
  if (state.filters.host && !(template.compatibilityHosts ?? []).includes(state.filters.host)) {
    return false;
  }
  if (state.filters.domain && !(template.domains ?? []).includes(state.filters.domain)) {
    return false;
  }
  if (state.filters.tag && !(template.tags ?? []).includes(state.filters.tag)) {
    return false;
  }

  return true;
}

function render() {
  const templates = (state.registry.templates ?? []).filter(matches);
  templateGrid.innerHTML = '';

  if (!templates.length) {
    templateGrid.innerHTML = '<div class="empty-state">No templates matched the active filters.</div>';
    summaryCopy.textContent = '0 templates shown.';
    return;
  }

  summaryCopy.textContent = `${templates.length} template${templates.length === 1 ? '' : 's'} shown from ${state.registry.totalTemplates ?? templates.length} indexed entries.`;

  for (const template of templates) {
    const article = document.createElement('article');
    article.className = 'card';
    const hosts = (template.compatibilityHosts ?? [])
      .map((host) => `<span class="pill">${host}</span>`)
      .join('');
    const domains = (template.domains ?? [])
      .map((domain) => `<span class="pill">${domain}</span>`)
      .join('');
    const tags = (template.tags ?? [])
      .map((tag) => `<span class="pill">${tag}</span>`)
      .join('');
    const dependencies = (template.dependenciesSummary ?? [])
      .map((dependency) => `<li>${dependency}</li>`)
      .join('');

    article.innerHTML = `
      <p class="eyebrow">Latest ${template.latestVersion}</p>
      <h3>${template.name}</h3>
      <p>${template.instruction ?? template.description ?? 'No description provided.'}</p>
      <div class="pill-row">${domains}${hosts}${tags}</div>
      <p class="meta">Versions: ${(template.versions ?? []).join(', ')}</p>
      ${dependencies ? `<ul class="detail-list">${dependencies}</ul>` : ''}
      <div class="hero__actions">
        <a class="button button--primary" href="./template.html?name=${encodeURIComponent(template.name)}">Template details</a>
        <a class="button button--secondary" href="${template.sourcePath}" target="_blank" rel="noreferrer">Source tree</a>
      </div>
    `;
    templateGrid.append(article);
  }
}

searchInput.addEventListener('input', (event) => {
  state.filters.search = event.target.value;
  render();
});

hostFilter.addEventListener('change', (event) => {
  state.filters.host = event.target.value;
  render();
});

domainFilter.addEventListener('change', (event) => {
  state.filters.domain = event.target.value;
  render();
});

tagFilter.addEventListener('change', (event) => {
  state.filters.tag = event.target.value;
  render();
});

fetch('./registry-index.json')
  .then((response) => response.json())
  .then((registry) => {
    state.registry = registry;
    renderOptions(hostFilter, unique((registry.templates ?? []).flatMap((template) => template.compatibilityHosts ?? [])), 'hosts');
    renderOptions(domainFilter, unique((registry.templates ?? []).flatMap((template) => template.domains ?? [])), 'domains');
    renderOptions(tagFilter, unique((registry.templates ?? []).flatMap((template) => template.tags ?? [])), 'tags');
    render();
  })
  .catch((error) => {
    summaryCopy.textContent = 'Failed to load the registry index.';
    templateGrid.innerHTML = `<div class="empty-state">${error instanceof Error ? error.message : 'Unknown error'}</div>`;
  });
