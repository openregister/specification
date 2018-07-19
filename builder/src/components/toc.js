import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


const List = ({items}) => {
  return (
    <ul>
      {items.map(Item)}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
};


const Item = ({id, url, title, items}) => {
  return (
    <li key={id}>
      <Link to={url}>{title}</Link>
      {
        items
          ? <List items={items} />
          : null
      }
    </li>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array,
};


const ToC = ({tree}) => {
  return (
    <nav id="toc">
      <h2>Table of contents</h2>
      <List items={tree} />
    </nav>
  );
};

ToC.propTypes = {
  tree: PropTypes.array
};

export default ToC;
