import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';

const wipStyle = css`
  background-color: tomato;
  color: ivory;
  font-variant: small-caps;
  line-height: 1.1;
  padding: 0 2px;
`;

const expStyle = css`
  background-color: deepskyblue;
  color: ivory;
  font-variant: small-caps;
  line-height: 1.1;
  padding: 0 2px;
`;

const StatusTag = ({label}) => {
  switch (label) {
  case 'wip':
    return <small className={wipStyle}>wip</small>;
  case 'exp':
    return <small className={expStyle}>exp</small>;
  default:
    return null;
  }
};

StatusTag.propTypes = {
  label: PropTypes.string,
};

export default StatusTag;
