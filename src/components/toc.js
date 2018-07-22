import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';
import { Link } from 'gatsby';


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

const LinkMaybe = ({to, isTarget, children}) => {
  return (
    isTarget
      ? <span>{children}</span>
      : <Link to={to}>{children}</Link>
  );
};

LinkMaybe.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  isTarget: PropTypes.bool.isRequired,
};

const wipStyle = css`
  background-color: tomato;
  color: ivory;
  font-variant: small-caps;
  line-height: 1.1;
  padding: 0 2px;
`;

const Item = ({id, url, title, items, wip, target}) => {
  const wipMaybe = wip == true ? <small className={wipStyle}>wip</small> : null;

  return (
    <li key={id}>
      <LinkMaybe to={url} isTarget={id == target}>{title}</LinkMaybe> {wipMaybe}
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
  wip: PropTypes.bool,
};


const navStyle = css`
  grid-column: 1;
  grid-row: 2;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 55px);
`;

const ToC = ({tree, target}) => {
  return (
    <nav id="toc" className={navStyle}>
      <List items={tree} target={target} />
    </nav>
  );
};

ToC.propTypes = {
  tree: PropTypes.array.isRequired,
  target: PropTypes.string
};

export default ToC;
