import React from 'react';
import PropTypes from 'prop-types';
import Section from './section';

const SinglePage = ({tree}) => {
  return (
    tree.map(SectionHierarchy)
  );
};

const SectionHierarchy = ({id, items, content}) => {
  return (
    <Section key={id} id={id} content={content}>
      {
        items
          ? items.map(SectionHierarchy)
          : null
      }
    </Section>
  );
};

SectionHierarchy.propTypes =  {
  id: PropTypes.string.isRequired,
  items: PropTypes.array,
  // title: PropTypes.string.isRequired,
  // url: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SinglePage;
