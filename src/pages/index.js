import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import Layout from '../components/layout';
import ToC from '../components/toc';
import {extendToc} from '../utils/toc';
import {Helmet} from 'react-helmet';

const Editor = ({name, organisation}) => {
  return (
    <span>{name} ({organisation})</span>
  );
};

Editor.propTypes = {
  name: PropTypes.string.isRequired,
  organisation: PropTypes.string.isRequired,
};

const Main = ({data}) => {
  const toc = data.toc.edges.map(({node}) => node);
  const tree = extendToc(toc, data.sections.edges);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.title}</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <ToC tree={tree} />
      <article className={articleStyle}>
        <div className={scroller}>
          <h1>{data.site.title}</h1>
          <dl>
            <dt>Version:</dt>
            <dd>{data.site.version}</dd>
            <dt>Latest update:</dt>
            <dd>{data.site.publish_date}</dd>
            <dt>Issue tracker:</dt>
            <dd><a href={data.site.issue_tracker}>{data.site.issue_tracker}</a></dd>
            <dt>RFC tracker:</dt>
            <dd><a href={data.site.rfc_tracker}>{data.site.rfc_tracker}</a></dd>
            <dt>Editors:</dt>
            <dd>
              <ul>
                {data.site.editors.map(({name, organisation}) =>
                  <li key={name}><Editor name={name} organisation={organisation} /></li>)}
              </ul>
            </dd>
            <dt>Former Editors:</dt>
            <dd>
              <ul>
                {data.site.former_editors.map(({name, organisation}) =>
                  <li key={name}><Editor name={name} organisation={organisation} /></li>)}
              </ul>
            </dd>
          </dl>
          <p className={copyrightStyle}>
            <a href={data.site.copyright.url}>{data.site.copyright.text}</a> released under the <a href={data.site.license.url}>{data.site.license.text}</a>.
          </p>
        </div>
      </article>
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

    site: coreToml {
      id
      title
      version
      publish_date
      issue_tracker
      rfc_tracker
      former_editors {
        name
        organisation
      }
      copyright {
        text
        url
      }
      license {
        text
        url
      }
      editors {
        name
        organisation
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
  }
`;

const copyrightStyle = css`
  margin-top: 18px;
  padding-top: 8px;
  margin-right: 16px;
  border-top: 1px solid lightgrey;
`;

const articleStyle = css`
  grid-column: 2;
  grid-row: 2;
`;
const scroller = css`
  overflow-y: auto;
  height: calc(100vh - 55px);
`;

export default Main;
