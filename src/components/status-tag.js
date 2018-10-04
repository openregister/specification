import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';

const wipStyle = css`
  background-color: tomato;
  color: ivory;
  font-variant: small-caps;
  line-height: 1.1;
  padding: 0 2px;
  font-size: 12px;
  border-bottom: none;
`;

const expStyle = css`
  background-color: deepskyblue;
  color: ivory;
  font-variant: small-caps;
  line-height: 1.1;
  padding: 0 2px;
  font-size: 12px;
  border-bottom: none;
`;

const StatusTag = ({label}) => {
  switch (label) {
  case 'wip':
    return <abbr title="work in progress" className={wipStyle}>wip</abbr>;
  case 'exp':
    return <abbr className={expStyle} title="experimental">exp</abbr>;
  default:
    return null;
  }
};

StatusTag.propTypes = {
  label: PropTypes.string,
};

export default StatusTag;
