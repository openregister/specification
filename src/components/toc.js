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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fffffa;
  border-left: 8px solid tomato;
  border-right: 1px solid #eaf9ea;
  padding: 20px;
  overflow-y: auto;
  width: 290px;
  outline: 0;

  h1 {
    margin: 0 0 24px;
    border-bottom: 4px solid black;

    a {
      color: black;
      text-decoration: none;
    }

    small {
      font-size: 18px;
    }
  }
`;

const ToC = ({tree, target, version}) => {
  return (
    <div className={navStyle} tabIndex="0">
      <h1><Link to={'/'}>Registers Specification</Link> <small>({version})</small></h1>
      <nav id="toc">
        <List items={tree} target={target} />
      </nav>
    </div>
  );
};

ToC.propTypes = {
  tree: PropTypes.array.isRequired,
  target: PropTypes.string,
  version: PropTypes.string
};

export default ToC;
