import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import Layout from '../components/layout';
import ToC from '../components/toc';
import {findById} from '../utils/section';
import Status from '../components/status';

const articleStyle = css`
  grid-column: 2;
  grid-row: 2;

  .hiblock {
    border-left: 8px solid black;
    padding: 36px 8px 8px 20px;
    position: relative;
    margin: 26px 0;

    &::before {
      color: black;
      font-weight: bold;
      font-size: 12px;
      position: absolute;
      top: 10px;
      left: 20px;
    }
  }

  .note {
    background-color: aliceblue;
    border-left-color: deepskyblue;

    &::before {
      content: 'NOTE';
    }
  }

  .warning {
    background-color: ivory;
    border-left: 8px solid #ffcc77;

    &::before {
      content: 'WARNING';
    }
  }

  .todo {
    background-color: mistyrose;
    border-left-color: tomato;

    &::before {
      content: 'TODO';
    }
  }

  .example {
    background-color: ivory;
    border-left-color: tomato;

    &::before {
      content: 'EXAMPLE';
    }
  }
`;
const scroller = css`
  overflow-y: auto;
  height: calc(100vh - 55px);
  padding: 20px;
`;


const extendToc = (toc, sections) => {
  return toc.map(({id, items}) => {
    const section = findById(id, sections);
    const result = {
      id,
      items: items ? extendToc(items, sections) : null,
      title: section.frontmatter.title,
      url: section.frontmatter.url,
      status: section.frontmatter.status,
    };

    return result;
  });
};

const SpecSection = ({data}) => {
  const section = data.content;
  const toc = data.toc.edges.map(({node}) => node);
  const tree = extendToc(toc, data.sections.edges);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{section.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <ToC tree={tree} target={section.frontmatter.id} />
      <article className={articleStyle}>
        <div className={scroller}>
          <h1>{section.frontmatter.title} <Status label={section.frontmatter.status} /></h1>
          <div dangerouslySetInnerHTML={{ __html: section.html }} />
        </div>
      </article>
    </Layout>
  );
};

SpecSection.propTypes = {
  data: PropTypes.object.isRequired
};


export const query = graphql`
  query SpecSectionQuery($id: String!) {
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
          frontmatter {
            id
            title
            url
            status
          }
        }
      }
    }

    content: markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        id
        title
        url
        status
      }
    }
  }
`;

export default SpecSection;
