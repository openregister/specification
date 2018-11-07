const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({node, getNode, basePath: 'pages'});

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};


exports.createPages = ({graphql, actions}) => {
  const {createPage, createRedirect} = actions;

  createRedirect({ fromPath: '/v2', toPath: '/v2/introduction', isPermanent: true, redirectInBrowser: true });

  const specSections = graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              id
              url
              version
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return new Promise((resolve, reject) => {
    specSections.then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { version } = node.frontmatter;
        const templates = {
          v1: './src/templates/spec-v1-section.js',
          v2: './src/templates/spec-section.js',
        };
        
        createPage({
          path: `/${version}${node.frontmatter.url}`,
          component: path.resolve(templates[version]),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: node.frontmatter.id,
          },
        });
      });

      resolve();
    });
  });
};
