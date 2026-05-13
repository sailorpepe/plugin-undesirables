# ElizaOS Registry Submission — Saved State

## v1 Registry (praveen-kaia/registry)
- **PR:** https://github.com/praveen-kaia/registry/pull/2
- **Status:** OPEN, MERGEABLE, CLEAN merge state
- **Format:** Added `"plugin-undesirables": "github:sailorpepe/plugin-undesirables"` to `index.json`
- **Note:** This is the deprecated v1 registry. Last maintained March 2025. Our PR is valid but unlikely to be reviewed.

## v2 Registry (elizaos-plugins/registry)
- **Status:** NOT YET PUBLIC — returns 404. Part of the upcoming 2.0.0-beta launch.
- **CLI Command:** `elizaos plugins submit .` (exists on `develop` branch, not in v1.7.2 release)
- **Target Path:** `entries/third-party/plugin-undesirables.json`
- **Ready Metadata:** Saved to `./v2-entry.json` in this directory
- **Manual Submission:** When the repo goes public, fork it → drop `v2-entry.json` into `entries/third-party/plugin-undesirables.json` → open PR

## Discord Message (Post to #plugin-dev or #developers)

> Hey team, I've got a third-party plugin (`plugin-undesirables@2.0.3`) ready for the v2 registry. I was reading the CLI source on the `develop` branch and tried to run the submission, but the target `elizaos-plugins/registry` repo and `plugins.elizacloud.ai` are returning 404s.
>
> Assuming the v2 registry infra is still private pending the 2.0.0-beta launch? I have my generated JSON metadata ready to go — just want to confirm if I should hold my PR until the repo goes public, or if there's an interim staging area for v2 third-party plugins right now?
>
> Is there a way to get early access or collaborator status on the registry repo for beta testing the submission flow? Happy to help shake out bugs before the public launch.
>
> Plugin: https://www.npmjs.com/package/plugin-undesirables
> GitHub: https://github.com/sailorpepe/plugin-undesirables

## Pre-Submission Checklist
- [x] NPM package published (`plugin-undesirables@2.0.3`)
- [x] GitHub repo public (`sailorpepe/plugin-undesirables`)
- [x] `images/logo.jpg` (400x400) present
- [x] `images/banner.jpg` (1280x640) present
- [x] `README.md` (202 lines, non-placeholder)
- [x] `dist/` built
- [x] Description is descriptive (not default)
- [x] Name doesn't use reserved `@elizaos/*` scope
- [x] npm auth as `sailorpepe`
- [x] gh auth with `repo`, `read:org`, `workflow` scopes
- [x] v2 JSON metadata generated and validated
