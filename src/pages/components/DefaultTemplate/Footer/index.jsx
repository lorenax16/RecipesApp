import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import styles from './styles.modules.css';
import drinkIcon from '../../../../images/drinkIcon.svg';
import exploreIcon from '../../../../images/exploreIcon.svg';
import mealIcon from '../../../../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  const toGoDrinks = () => history.push('/drinks');
  const toGoExplore = () => history.push('/explore');
  const toGoFoods = () => history.push('/foods');

  return (
    <footer data-testid="footer" className={ styles.footer }>
      <Button
        id="drinks-bottom-btn"
        func={ toGoDrinks }
        alt="Drinks"
        img={ drinkIcon }
      />
      <Button
        id="explore-bottom-btn"
        func={ toGoExplore }
        alt="Explore"
        img={ exploreIcon }
      />
      <Button
        id="food-bottom-btn"
        func={ toGoFoods }
        alt="Foods"
        img={ mealIcon }
      />
    </footer>
  );
}
