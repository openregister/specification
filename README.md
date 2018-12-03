# Registers specification

<https://spec.openregister.org/>

The specification builder uses [Gatsby](https://www.gatsbyjs.org) to generate
a static site out of different data sources.


## Data sources

* `data/` directory: Metadata and complementary data.
* `content/` directory: The markdown source.

Note that `docs/` is kept for backward-compatibility reasons.

## Development

Dependencies:

* nodejs +10
* yarn

### Running in development

```
yarn develop
```

## Build static files

```
yarn build
```

## Deploy

Note that to deploy you need access to Netlify. Ask the Registers team.

```
yarn deploy "deploy message"
```

## Licence

Unless stated otherwise, the codebase is released under [the MIT licence](./LICENSE).

The data is [© Crown
copyright](http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright)
and available under the terms of the [Open Government
3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)
licence.
