import React, { useState, useEffect } from 'react';
import { API } from '../../.next/api';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const [filter, setFilter] = useState('');
  const { onLoadIngredients } = props;

  useEffect(() => {
    const query =
      filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
    fetch(API + query)
      .then((response) => response.json())
      .then((data) => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            ...data[key],
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [filter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
