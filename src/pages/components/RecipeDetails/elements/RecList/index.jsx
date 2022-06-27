import React from 'react';
import PropTypes from 'prop-types';
import RecCard from '../RecCard';
import styles from './styles.module.css';

export default function RecList({ recommendations, recipeType, max }) {
  return (
    <div>
      <h3>Recommendations:</h3>
      <div className={ styles.container }>
        {recommendations.length !== 0
        && recommendations.map((rec, index) => index < max && (
          <RecCard
            title={ rec[recipeType.titleRec] }
            image={ rec[recipeType.imageRec] }
            index={ index }
            key={ index }
          />
        ))}
      </div>
    </div>
  );
}

RecList.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.shape).isRequired,
  recipeType: PropTypes.objectOf(PropTypes.shape).isRequired,
  max: PropTypes.number.isRequired,
};
