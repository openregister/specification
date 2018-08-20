import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';
import {Link} from 'gatsby';
import StatusTag from './status-tag';

const List = ({items, target}) => {
  return (
    <ul>
      {items.map(item => <Item key={item.id} {...item} target={target} />)}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array.isRequired,
  target: PropTypes.string
};

const selectedItemStyle = css`
  border-left: 4px solid deepskyblue;
  padding-left: 4px;
`;

const LinkMaybe = ({to, isTarget, children}) => {
  return (
    isTarget
      ? <span className={selectedItemStyle}>{children}</span>
      : <Link to={to}>{children}</Link>
  );
};

LinkMaybe.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  isTarget: PropTypes.bool.isRequired,
};


const Item = ({id, url, title, items, status, target}) => {
  return (
    <li key={id}>
      <LinkMaybe to={url} isTarget={id == target}>{title}</LinkMaybe> <StatusTag label={status} />
      {
        items
          ? <List items={items} target={target} />
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
  target: PropTypes.string,
  status: PropTypes.string,
};


const navStyle = css`
  grid-column: 1;
  grid-row: 2;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 55px);
  outline: 0;
`;

const ToC = ({tree, target}) => {
  return (
    <nav id="toc" className={navStyle} tabIndex="0">
      <List items={tree} target={target} />
    </nav>
  );
};

ToC.propTypes = {
  tree: PropTypes.array.isRequired,
  target: PropTypes.string
};

export default ToC;
