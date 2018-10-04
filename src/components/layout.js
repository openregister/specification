import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
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
        core: coreToml {
          title
        }
      }`}
    render={() => {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );}}
  />
);

Layout.propTypes = {
  children: PropTypes.any.isRequired
};

export default Layout;
