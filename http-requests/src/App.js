import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      const { results } = await response.json();
      const transformedMovies = results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading ? <MoviesList movies={movies} /> : <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
