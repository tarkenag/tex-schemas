## How to use

Add the following entry to your `tex-manifest.json` file:

```json
"$schema": "https://raw.githubusercontent.com/tarkenag/tex-schemas/v0/manifest.json"
```

You can also use [this online tool](https://jsonschemalint.com/#!/version/draft-07/markup/json) to validate some JSON against the above schema.

## How this repository works

Each branch represents each supported version of the schema following the [semantic versioning](https://semver.org/) rules but only the major slice (eg: `v0` must covers every version under `0.`).

## Development guide

### Create a new version of the schema

1. Create a new branch for that version from the default branch of the repository, and
2. Update the [`./manifest.json`](./manifest.json) file following the [JSONSchema](https://json-schema.org) spec. Don't forget to update the `.version` field.

> [!IMPORTANT]
> If you're creating a new version that won't introduce any breaking changes to the latest one, **do not** update its branch directly until that version is said 'ready to production'. Instead, create a new branch with the whole version slices like `v0.1.34` for example. Then, in your tests you will have something like  
> `"$schema": "https://raw.githubusercontent.com/tarkenag/tex-schemas/v0.1.34/manifest.json"`
