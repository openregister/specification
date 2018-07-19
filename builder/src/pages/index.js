import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import Layout from '../components/layout';
import Section from '../components/section';
import ToC from '../components/toc';
import {findById} from '../utils/section';

const Content = ({tree}) => {
  return (
    tree.map(SectionHierarchy)
  );
};

const SectionHierarchy = ({id, items, content}) => {
  return (
    <Section key={id} id={id} content={content}>
      {
        items
          ? items.map(SectionHierarchy)
          : null
      }
    </Section>
  );
};

SectionHierarchy.propTypes =  {
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  // title: PropTypes.string.isRequired,
  // url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const extendToc = (toc, sections) => {
  return toc.map(({id, items}) => {
    const section = findById(id, sections);
    const result = {
      id,
      items: items ? extendToc(items, sections) : null,
      title: section.frontmatter.title,
      url: section.frontmatter.url,
      content: section.html,
    };

    return result;
  });
};

const Main = ({data}) => {
  const toc = data.toc.edges.map(({node}) => node);
  const tree = extendToc(toc, data.sections.edges);

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

        <ToC tree={tree} />

        <Content tree={tree} />
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
            id
            title
            url
          }
          fields {
            slug
          }
          excerpt
          html
          htmlAst
        }
      }
    }
  }
`;

const sectionStyle = css`
  padding: 20px;
`;

export default Main;
