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
  const {version, publish_date} = data.site.siteMetadata;
  const {title, issue_tracker, rfc_tracker, editors, former_editors, copyright, license} = data.core;
  const toc = data.toc.edges.map(({node}) => node);
  const tree = extendToc(toc, data.sections.edges);

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <ToC tree={tree} />
      <article className={articleStyle}>
        <div className={scroller}>
          <h1>{title}</h1>
          <dl>
            <dt>Version:</dt>
            <dd>{version}</dd>
            <dt>Latest update:</dt>
            <dd>{publish_date.substr(0, 10)}</dd>
            <dt>Issue tracker:</dt>
            <dd><a href={issue_tracker}>{issue_tracker}</a></dd>
            <dt>RFC tracker:</dt>
            <dd><a href={rfc_tracker}>{rfc_tracker}</a></dd>
            <dt>Editors:</dt>
            <dd>
              <ul>
                {editors.map(({name, organisation}) =>
                  <li key={name}><Editor name={name} organisation={organisation} /></li>)}
              </ul>
            </dd>
            <dt>Former Editors:</dt>
            <dd>
              <ul>
                {former_editors.map(({name, organisation}) =>
                  <li key={name}><Editor name={name} organisation={organisation} /></li>)}
              </ul>
            </dd>
          </dl>
          <p className={copyrightStyle}>
            <a href={copyright.url}>{copyright.text}</a> released under the <a href={license.url}>{license.text}</a>.
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
    site {
      siteMetadata {
        version
        publish_date
      }
    }
    core: coreToml {
      id
      title
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
