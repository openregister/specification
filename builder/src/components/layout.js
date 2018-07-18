import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { StaticQuery, Link, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site: coreToml {
          id
          title
          version
          publish_date
          issue_tracker
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
            email
            organisation
          }
        }
      }`}
    render={data => (
      <React.Fragment>
        <header className={headerStyle}>
          <Link className={linkStyle} to={'/'}>{data.site.title}</Link>
          <span className={versionStyle}> ({data.site.version} {data.site.publish_date})</span>
        </header>
        {children}
      </React.Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

const headerStyle = css`
  background-color: black;
  padding: 12px;
  color: white;
  border-bottom: 6px solid tomato;
`;

const linkStyle = css`
  color: white;
  text-decoration: none;
  &:hover {
    color: tomato;
  }
`;

const versionStyle = css`
  margin-left: 4px;
  font-size: 14px;
`;

export default Layout;
