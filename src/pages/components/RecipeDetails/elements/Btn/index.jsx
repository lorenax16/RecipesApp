import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export default function Btn({ name, id, func }) {
  return (
    <div>
      <button
        type="button"
        data-testid={ id }
        className={ styles[id] }
        onClick={ func }
      >
        {name}
      </button>
    </div>
  );
}

Btn.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
