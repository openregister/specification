import React from 'react';
import PropTypes from 'prop-types';


const Section = ({id, content, children}) => {
  return (
    <section id={`sec-${id}`}>
      <div dangerouslySetInnerHTML={{__html: content}} />
      {children}
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.array
};

export default Section;
