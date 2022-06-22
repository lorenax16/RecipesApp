import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.modules.css';
import drinkIcon from '../../../../images/src/drinkIcon.svg'
import exploreIcon from '../../../../images/src/exploreIcon.svg'
import mealIcon from '../../../../images/src/mealIcon.svg'

export default function Footer() {
  const history = useHistory();

  const toGoDrinks = () => history.push('/drinks');
  const toGoExplore = () => history.push('/explore');
  const toGoFoods = () => history.push('/foods');

  return (
    <footer data-testid="footer" className={ styles.footer }>
      <Button
        type="button"
        id="drinks-bottom-btn"
        func={ toGoDrinks }
        alt="Drinks"
        img={ drinkIcon }
      />
      <Button
        type="button"
        id="explore-bottom-btn"
        func={ toGoExplore }
        alt="Explore"
        img={ exploreIcon }
      />
      <Button
        type="button"
        id="food-bottom-btn"
        func={ toGoFoods }
        alt="Foods"
        img={ mealIcon }
      />
    </footer>
  );
}
