import React from 'react';
import PropTypes from 'prop-types';

export default function CopySucess({ copy }) {
  return <div>{copy !== '' && <p>{copy}</p>}</div>;
}

CopySucess.propTypes = {
  copy: PropTypes.string.isRequired,
};
