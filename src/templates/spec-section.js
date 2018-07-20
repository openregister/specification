import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {css} from 'react-emotion';
import Layout from '../components/layout';

const pageStyle = css`
  padding: 20px;
`;

const SpecSection = ({data}) => {
  const section = data.markdownRemark;

  return (
    <Layout>
      <div className={pageStyle}>
        <h1>{section.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: section.html }} />
      </div>
    </Layout>
  );
};

SpecSection.propTypes = {
  data: PropTypes.object.isRequired
};


export const query = graphql`
  query SpecSectionQuery($id: String!) {
    markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        id
        title
        url
      }
    }
  }
`;

export default SpecSection;
