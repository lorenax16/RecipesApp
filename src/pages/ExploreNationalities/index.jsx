import React, { useEffect, useState } from 'react';
import getByFilter from '../../api/foodsApi';
import LayoutPageNationalities from './LayoutPageNationalities';

export default function ExploreNationalities() {
  const [nationalities, setAPIbyNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState('');
  const [filterChanged, setFilterChanged] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const myCategories = await getByFilter(endpoint);
      const nationalitie = Object.values(myCategories)[0];
      nationalitie.unshift({ strArea: 'All' });
      setAPIbyNationalities(nationalitie);
    }
    fetchData();
  }, []);

  const selectNationalite = ({ target }) => {
    setSelectedNationality({ ...selectedNationality, nationality: target.value });
    setFilterChanged(true);
  };

  return (
    <div>
      <label htmlFor="nationalite">
        Explore Nationalities:
        <select
          name="nationalite"
          id="nationalite"
          onChange={ selectNationalite }
          data-testid="explore-by-nationality-dropdown"
        >
          {nationalities.map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>
          ))}
        </select>
      </label>

      <LayoutPageNationalities
        typeUrl="themealdb"
        typePage="meals"
        nationality={ selectedNationality }
        filterChanged={ filterChanged }
      />
    </div>
  );
}
