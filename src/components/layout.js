import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { StaticQuery, Link, graphql } from 'gatsby';
import 'prismjs/themes/prism.css';

const logoStyle = css`
  top: 14px;
  left: 14px;
  position: absolute;
  width: 52px;
  height: 34px;
`;

const Logo = () => {
  return (
    <svg className={logoStyle}>
      <circle cx="12px" cy="12px" r="12px" fill="white" />
      <circle cx="24px" cy="12px" r="12px" fill="white" />

      <circle cx="12px" cy="12px" r="11px" fill="white" />
      <circle cx="24px" cy="12px" r="11px" fill="black" />
    </svg>
  );
};


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
            <Logo />
            <Link className={linkStyle} to={'/'}>{data.site.title}</Link>
            <div className={flexnavStyle}>
              <span className={versionStyle}> ({data.site.version.toLowerCase()} {data.site.publish_date})</span> <a className={link2Style} href={data.site.issue_tracker}>Issue tracker (Github)</a>
            </div>
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

const flexnavStyle = css`
  float: right;
`;

const wrapperStyle = css`
  display: grid;
  grid-template-rows: 55px auto;
  grid-template-columns: 320px auto;
  grid-gap: 0 20px;
`;


const headerStyle = css`
  background-color: black;
  padding: 12px ;
  padding-left: 60px ;
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

const link2Style = css`
  color: ivory;
  text-decoration: underline;
  margin-left: 10px;
  font-size: 14px;
  &:hover {
    color: tomato;
  }
`;

const versionStyle = css`
  margin-left: 4px;
  font-size: 14px;
`;

export default Layout;
