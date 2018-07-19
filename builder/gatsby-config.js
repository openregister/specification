module.exports = {
  siteMetadata: {
    title: 'Registers Specification (next)',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/../data/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/../content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-toml',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',

        ]
      }
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
