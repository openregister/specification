import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import Layout from '../components/layout';
import ToC from '../components/toc';
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
  const {publish_date} = data.site.siteMetadata;
  const {title, issue_tracker, version, rfc_tracker, editors, former_editors, copyright, license} = data.core;
  const tree = [
    {
      id: 'v1',
      items: null,
      title: 'Version 1',
      url: '/v1/introduction',
      status: null,
    },
    {
      id: 'v2',
      items: null,
      title: 'Version 2 (latest)',
      url: '/v2/introduction',
      status: null,
    }
  ];

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href="/" />
      </Helmet>
      <ToC tree={tree} />
      <article className={articleStyle}>
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
      </article>
    </Layout>
  );
};

Main.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query IndexQuery {
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
      version
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
  }
`;

const copyrightStyle = css`
  margin-top: 18px;
  padding-top: 8px;
  margin-right: 16px;
  border-top: 1px solid lightgrey;
`;

const articleStyle = css`
  margin-left: 300px;
  padding: 20px;
`;

export default Main;
