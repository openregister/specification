import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';


const wipStyle = css`
  background-color: tomato;
  color: ivory;
  text-transform: uppercase;
  line-height: 1.1;
  font-size: 16px;
  vertical-align: middle;
  padding: 0 2px;
`;

const expStyle = css`
  background-color: deepskyblue;
  color: ivory;
  text-transform: uppercase;
  line-height: 1.1;
  font-size: 16px;
  vertical-align: middle;
  padding: 0 2px;
`;

const Tag = ({style, title}) => {
  return <small className={style}>{title}</small>;
};

Tag.propTypes = {
  style: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const Status = ({label}) => {
  switch (label) {
  case 'wip':
    return <Tag style={wipStyle} title="Work in progress" />;
  case 'exp':
    return <Tag style={expStyle} title="Experimental" />;
  default:
    return null;
  }
};

Status.propTypes = {
  label: PropTypes.string,
};

export default Status;
