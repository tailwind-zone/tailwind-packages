
# Working with OSS TAILWIND NPM Packages
- @tailwindzone/connect

We ruled out using Git submodules because 
they are absolutely terrible to work with.
We are going to use `pnpm link` to develop
NPM packages.

## Using `pnpm link`

```bash
# in locally cloned @tailwindzone/connect
pnpm link

# in TurboRepo (or any other project)
pnpm link @tailwindzone/connect
```
