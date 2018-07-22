import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import Layout from '../components/layout';
import ToC from '../components/toc';
import {findById} from '../utils/section';

const articleStyle = css`
  grid-column: 2;
  grid-row: 2;
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
      wip: section.frontmatter.wip,
    };

    return result;
  });
};

const wipStyle = css`
  background-color: tomato;
  color: ivory;
  //font-variant: small-caps;
  text-transform: uppercase;
  line-height: 1.1;
  font-size: 16px;
  vertical-align: middle;
  padding: 0 2px;
`;

const WipMaybe = ({isWip}) => {
  return (
    isWip
      ? <small className={wipStyle}>wip</small> : null
  );
};



const SpecSection = ({data}) => {
  const section = data.content;
  const toc = data.toc.edges.map(({node}) => node);
  const tree = extendToc(toc, data.sections.edges);

  return (
    <Layout>
      <ToC tree={tree} target={section.frontmatter.id} />
      <article className={articleStyle}>
        <div className={scroller}>
          <h1>{section.frontmatter.title} <WipMaybe isWip={!!section.frontmatter.wip} /></h1>
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
            wip
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
        wip
      }
    }
  }
`;

export default SpecSection;
