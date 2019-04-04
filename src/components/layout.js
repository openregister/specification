import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import 'prismjs/themes/prism.css';

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
