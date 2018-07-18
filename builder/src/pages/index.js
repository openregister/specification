import React from 'react';
import PropTypes from 'prop-types';
import {Link, graphql} from 'gatsby';
import {css} from 'react-emotion';
import {rhythm} from '../utils/typography';
import Layout from '../components/layout';

const toTocElemChildrenMaybe = (items) => {
  if (items != null) {
    return (
      <ul>
        {items.map(toTocElem)}
      </ul>
    );
  }
};

const toTocElem = (elem) => {
  return (
    <li key={elem.id}>
      <span>{elem.id}</span>
      {toTocElemChildrenMaybe(elem.items)}
    </li>
  );
};

const Main = ({data}) => {
  return (
    <Layout>
      <section className={sectionStyle}>
        <h1
          className={css`
            display: inline-block;
          `}
        >
          Registers Specification (next)
        </h1>
        <nav id="toc">
          <h2>Table of contents</h2>
          <ul>
            {data.toc.edges.map(({node}) => toTocElem(node))}
          </ul>
        </nav>
        <h4>{data.sections.totalCount} Sections</h4>
        {data.sections.edges.map(({node}) => (
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
      </section>
    </Layout>
  );
};

Main.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query IndexQuery {
    toc: allNavYaml {
      edges {
        node {
          id
          items {
            id
          }
        }
      }
    }

    sections: allMarkdownRemark {
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

const sectionStyle = css`
  padding: 20px;
`;

export default Main;
