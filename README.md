# Registers specification

<https://openregister.github.io/specification/>

The specification builder uses [Gatsby](https://www.gatsbyjs.org) to generate
a static site out of different data sources.

## Default branch

Note this repository doesn't have a master branch, the default is the gh-pages branch.

## Data sources

* `data/` directory: Metadata and complementary data.
* `content/` directory: The markdown source.

## Roadmap

* Finish specification writing
* Highlight multihash bytes if RFC is accepted


## Development

TODO: Dockerise to abstract dependencies.

### Dependencies

* nodejs 10
* yarn

### Running in development

```
yarn develop
```

## Build static files

```
yarn build
```

## Licence

Unless stated otherwise, the codebase is released under [the MIT licence](./LICENSE).

The data is [© Crown
copyright](http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright)
and available under the terms of the [Open Government
3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)
licence.
