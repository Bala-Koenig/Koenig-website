# CI workflow template with docs-drift gate

Generates `.github/workflows/ci.yml` and the docs-drift check script.

Placeholders:

- `{{SETUP_STEPS}}`: the checkout plus toolchain setup steps for this repo's stack (setup-node with the repo's pinned version, setup-dotnet, setup-python). Read the version from the repo's manifests; never hardcode one from another project.
- `{{CHECK_JOB_1..N}}`: one job per real check the repo has (typecheck, build, test), each running the repo's own command. Generate only jobs whose commands the factory ran successfully; a CI job that was never seen green locally is a guess.
- `{{DRIFT_SCRIPT}}`: the path of the generated docs-drift script (for example `scripts/check-doc-paths.mjs` or `.sh`), written dependency-free in the repo's main language.
- `{{BUILD_ENV}}`: dummy environment values when the build demands them. The build must never touch a real database or service; every value here is a placeholder like `ci-only`, and the names come from the repo's env example file, never from a secrets file.

## The docs-drift gate concept

Wrong documentation is worse than none, because agents trust it. The gate makes the agent knowledge base self-checking:

1. For each agent-facing doc (architecture, feature map, danger zones, conventions): every backtick-quoted token that looks like a repo path must exist on disk. Glob entries are checked by their static directory prefix.
2. Every checked doc must carry a `_Last verified: <sha> (<yyyy-mm-dd>)_` stamp, and a stamp inside a fenced code example does not count (strip fences before both checks).
3. The script runs in CI, so a rename or move that orphans a documented path fails the build until the doc is fixed in the same PR.

Generate the script dependency-free (filesystem access only), list the repo's actual doc paths in it, and run it once during generation; paste the output in the manifest.

```yaml
name: CI

on:
  pull_request:
  push:
    branches: ["{{DEFAULT_BRANCH}}"]

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - "{{SETUP_STEPS}}"
      - name: "{{CHECK_JOB_1}}"
        run: "{{CHECK_COMMAND_1}}"
      - name: Docs drift check
        run: "{{DRIFT_SCRIPT_COMMAND}}"

  build:
    runs-on: ubuntu-latest
    env:
      "{{BUILD_ENV_NAME}}": ci-only
    steps:
      - "{{SETUP_STEPS}}"
      - name: Build
        run: "{{BUILD_COMMAND}}"
```

The YAML above is a shape, not a finished workflow: split `{{SETUP_STEPS}}` into real `uses:`/`with:` steps, one `{{CHECK_JOB_N}}` step or job per real check, and delete the build job when the repo has no separate build. Branch protection later requires these job names, so keep them short and stable.
