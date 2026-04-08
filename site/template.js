const params = new URLSearchParams(window.location.search);
const templateName = params.get('name');
const templateTitle = document.getElementById('template-title');
const templateDescription = document.getElementById('template-description');
const templateSourceLink = document.getElementById('template-source-link');
const versionList = document.getElementById('version-list');
const authorList = document.getElementById('author-list');
const hostPills = document.getElementById('host-pills');
const dependencyList = document.getElementById('dependency-list');

function renderList(element, items) {
  element.innerHTML = '';
  if (!items.length) {
    element.innerHTML = '<li>No data provided.</li>';
    return;
  }
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    element.append(li);
  }
}

fetch('./registry-index.json')
  .then((response) => response.json())
  .then((registry) => {
    const entry = (registry.templates ?? []).find((template) => template.name === templateName);
    if (!entry) {
      throw new Error(`Template "${templateName}" was not found in the registry index.`);
    }

    templateTitle.textContent = entry.name;
    templateDescription.textContent = entry.description ?? 'No description provided.';
    templateSourceLink.href = entry.sourcePath;

    renderList(versionList, entry.versions ?? []);
    renderList(authorList, (entry.authors ?? []).map((author) => author.github ? `${author.name} (@${author.github})` : author.name));
    renderList(dependencyList, entry.dependenciesSummary ?? []);
    hostPills.innerHTML = (entry.compatibilityHosts ?? []).map((host) => `<span class="pill">${host}</span>`).join('');
  })
  .catch((error) => {
    templateTitle.textContent = 'Template unavailable';
    templateDescription.textContent = error instanceof Error ? error.message : 'Unknown error';
  });
