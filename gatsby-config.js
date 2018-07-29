const fs = require('fs');
const toml = require('toml');

const rawBib = fs.readFileSync(`${__dirname}/data/bibliography.toml`, 'utf-8');
const db = toml.parse(rawBib);

module.exports = {
  siteMetadata: {
    title: 'Registers Specification (next)',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: 'tomato',
        //showSpinner: false,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-json',
    'gatsby-transformer-toml',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-bib',
            options: {
              db: db
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-hiblocks',
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: 590,
            },
          },
        ],
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
  ],
};
