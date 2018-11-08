const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const yaml = require('js-yaml');
const fs = require('fs');


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


exports.onCreatePage = ({ page }) => {
  return new Promise(resolve => {
    if (page.path == '/') {
      page.context = {
        toc: yaml.safeLoad(fs.readFileSync(path.resolve('./content/v2/nav.yaml'), 'utf8'))
      };
    }

    resolve();
  });
};


exports.createPages = ({graphql, actions}) => {
  const {createPage, createRedirect} = actions;

  createRedirect({ fromPath: '/v2', toPath: '/v2/introduction', isPermanent: true });
  createRedirect({ fromPath: '/v1', toPath: '/v1/introduction', isPermanent: true });

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
      const toc = {
        v1: yaml.safeLoad(fs.readFileSync(path.resolve('./content/v1/nav.yaml'), 'utf8')),
        v2: yaml.safeLoad(fs.readFileSync(path.resolve('./content/v2/nav.yaml'), 'utf8')),
      };

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { version, url, id } = node.frontmatter;

        createPage({
          path: url,
          component: path.resolve('./src/templates/spec-section.js'),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            toc: toc[version],
            version: version,
            id: id,
          },
        });
      });

      resolve();
    });
  });
};
