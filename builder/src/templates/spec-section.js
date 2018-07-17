import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import Layout from '../components/layout';

const SpecSection = ({data}) => {
  const section = data.markdownRemark;

  return (
    <Layout>
      <div>
        <h1>{section.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
};

SpecSection.propTypes = {
  data: PropTypes.object.isRequired
};


export const query = graphql`
  query SpecSectionQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default SpecSection;
