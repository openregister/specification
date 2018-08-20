import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import GithubSlugger from 'github-slugger';
import Layout from '../components/layout';
import ToC from '../components/toc';
import {extendToc} from '../utils/toc';
import Status from '../components/status';

const articleStyle = css`
  grid-column: 2;
  grid-row: 2;

  .http-interface {
    margin: 26px 0;
    padding: 8px 20px;
    border-left: 8px solid #8BC34A;
    background-color: #e6f1d9;

    h3 {
      font-size: 12px;
      margin: 32px 0 0;
    }

    h3:first-child {
      margin-top: 8px;
    }

    pre[class*="language-"] {
      overflow-x: auto;
      width: calc(100vw - 428px); // total_width - (nav + gap + http_intf_padding + scroller_padding)
      background-color: white;

      > code {
        font-size: 18px;
      }
    }

    th {
      padding: 16px;
      padding-bottom: 4px;
    }

    td {
      padding: 16px;
      background-color: white;
    }
  }

  .figure-svg {
    margin: 46px 0;

    img {
      display: block;
      margin: auto;
    }
  }


  .gatsby-highlight {
    margin: 16px 0;
  }

  pre[class*="language-"] {
    overflow-x: auto;
    width: calc(100vw - 380px); // total_width - (nav + gap + scroller_padding)
  }

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

    pre[class*="language-"] {
      overflow-x: auto;
      width: calc(100vw - 418px); // total_width - (nav + gap + hiblock_padding + scroller_padding)
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

  .issue {
    background-color: mistyrose;
    border-left-color: tomato;

    &::before {
      content: 'ISSUE';
    }
  }

  .example {
    background-color: ivory;
    border-left-color: darkkhaki;

    &::before {
      content: 'EXAMPLE';
    }
  }

  .experimental {
    background-color: cornsilk;
    border-left: 0;

    &::before {
      content: 'EXPERIMENTAL';
      background-color: deepskyblue;
      color: white;
      padding: 2px 4px;
    }
  }
`;
const scroller = css`
  overflow-y: auto;
  height: calc(100vh - 55px);
  padding: 20px;
`;


const sectionTocStyle = css`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const SectionToC = ({tree}) => {
  const slugger = new GithubSlugger();

  return (
    <ol className={sectionTocStyle}>
      {
        tree.map(el => {
          const slug = slugger.slug(el.value);
          return <li key={slug}><a href={`#${slug}`}>{el.value}</a></li>;
        })
      }
    </ol>
  );
};

SectionToC.propTypes = {
  tree: PropTypes.array.isRequired
};

const SpecSection = ({data}) => {
  const section = data.content;
  const toc = data.toc.edges.map(({node}) => node);
  const tree = extendToc(toc, data.sections.edges);
  const headings = section.headings.filter(el => el.depth <= 2);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${section.frontmatter.title} - ${data.site.title}`}</title>
        <link rel="canonical" href={section.frontmatter.url} />
      </Helmet>

      <ToC tree={tree} target={section.frontmatter.id} />

      <article className={articleStyle}>
        <div id="scroller" className={scroller} tabIndex="0">
          <h1>{section.frontmatter.title} <Status label={section.frontmatter.status} /></h1>
          {
            headings.length > 1
              ? <SectionToC tree={headings} />
              : null
          }
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
    site: coreToml {
      title
    }

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
      headings {
        value
        depth
      }
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
