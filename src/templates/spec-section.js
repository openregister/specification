import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import GithubSlugger from 'github-slugger';
import Layout from '../components/layout';
import ToC from '../components/toc';
import {findById} from '../utils/section';
import Status from '../components/status';

const articleStyle = css`
  grid-column: 2;
  grid-row: 2;

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
        <title>{section.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <ToC tree={tree} target={section.frontmatter.id} />

      <article className={articleStyle}>
        <div id="scroller" className={scroller}>
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
