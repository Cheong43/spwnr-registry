## Summary

- What template or registry change does this PR add?
- Which hosts is it meant to support?

## Checklist

- [ ] I am adding a new template version directory under `templates/<name>/<version>/`
- [ ] I did not modify an existing released version directory
- [ ] `metadata.authors` is present and accurate
- [ ] `spec.compatibility.hosts` lists the supported hosts
- [ ] `spec.dependencies.packages` is structured if the template needs external packages or binaries
- [ ] `README.md` explains what the template does and how to use it
- [ ] `npm run validate:templates` passes locally
