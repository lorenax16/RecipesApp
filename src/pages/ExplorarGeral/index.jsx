import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Explore() {
  const history = useHistory();
  return (
    <div>
      <button
        onClick={ () => history.push('/explore/foods') }
        data-testid="explore-foods"
        type="button"
      >
        Explore Foods
      </button>
      <button
        onClick={ () => history.push('/explore/drinks') }
        type="button"
        data-testid="explore-drinks"
      >
        Explore Drinks
      </button>
    </div>
  );
}
