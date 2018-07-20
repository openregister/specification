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
  const {createPage} = actions;

  const specSections = graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              id
              url
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
        createPage({
          path: node.frontmatter.url,
          component: path.resolve('./src/templates/spec-section.js'),
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
