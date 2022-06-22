import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Footer() {
  const history = useHistory();

  const toGoDrinks = () => history.push('/drinks');
  const toGoExplore = () => history.push('/explore');
  const toGoFoods = () => history.push('/foods');

  return (
    <footer data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn" onClick={ toGoDrinks } />
      <button type="button" data-testid="explore-bottom-btn" onClick={ toGoExplore } />
      <button type="button" data-testid="food-bottom-btn" onClick={ toGoFoods } />
    </footer>
  );
}
