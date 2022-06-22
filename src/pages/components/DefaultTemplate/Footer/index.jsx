import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../Button';
import styles from './styles.module.css';
import drinkIcon from '../../../../images/drinkIcon.svg';
import exploreIcon from '../../../../images/exploreIcon.svg';
import mealIcon from '../../../../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  const [visibled, setVisibled] = useState(true);
  const location = useLocation().pathname;

  const toGoDrinks = () => history.push('/drinks');
  const toGoExplore = () => history.push('/explore');
  const toGoFoods = () => history.push('/foods');

  useEffect(() => {
    const urlsToNotBeVisibled = ['favorite', 'done'];
    setVisibled(!urlsToNotBeVisibled.some((url) => location.includes(url)));
  }, [location]);

  return visibled && (
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
