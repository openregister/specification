# Registers Specifications

<https://openregister.github.io/specification/>

# Process

Changes to the specification should be raised as an issue before being added to the document.
The specification may include changes ahead of being implemented in the registers platform,
or other compliant implementations.

# Default branch

Note this repository doesn't have a master branch, the default is the gh-pages branch.

# Bikeshed

The specification is made using [Bikeshed](https://github.com/tabatkins/bikeshed).

# Building

Use make to build a local copy of the register data
— we recommend using a [Python virtual environment](http://virtualenvwrapper.readthedocs.org/en/latest/):

    $ mkvirtualenv -p python registers-specification
    $ workon registers-specification
    $ make init
    $ make

Note, bikeshed works with Python 2.7, and not with Python 3.0.

# Licence

The software in this project is open source, covered by LICENSE file.

All content is [© Crown copyright](http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/) and made available under the [Open Government Licence v3.0 (OGL)](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).
