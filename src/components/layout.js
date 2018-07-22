import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { StaticQuery, Link, graphql } from 'gatsby';
import 'prismjs/themes/prism.css';


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
        <div className={wrapperStyle}>
          <header className={headerStyle}>
            <Link className={linkStyle} to={'/'}>{data.site.title}</Link>
            <span className={versionStyle}> ({data.site.version.toLowerCase()} {data.site.publish_date})</span>
          </header>
          {children}
        </div>
      </React.Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

const wrapperStyle = css`
  display: grid;
  grid-template-rows: 55px auto;
  grid-template-columns: 400px auto;
  grid-gap: 0 20px;
`;


const headerStyle = css`
  background-color: black;
  padding: 12px;
  color: white;
  border-bottom: 6px solid tomato;
  grid-column: 1 / 3;
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
