import React from 'react';
import PropTypes from 'prop-types';
import {Link, graphql} from 'gatsby';
import {css} from 'react-emotion';
import {rhythm} from '../utils/typography';
import Layout from '../components/layout';

const Main = ({data}) => {
  return (
    <Layout>
      <div>
        <h1
          className={css`
            display: inline-block;
          `}
        >
          Registers Specification (next)
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Sections</h4>
        {data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              className={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3
                className={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}{' '}
                <span
                  className={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

Main.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default Main;
