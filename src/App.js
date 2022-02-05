import './App.css';
import { useState, useEffect } from 'react';

//Components
import MovieThumbnail from './components/MovieThumbnail';
import Actor from './components/Actor';





function App() {
  //State
  const [movieList1, updateMovieList1] = useState([]);
  const [movieList2, updateMovieList2] = useState([]);

  const [selectedMovie1, setSelectedMovie1] = useState(null);
  const [selectedMovie2, setSelectedMovie2] = useState(null);

  const [filteredActors, setfilteredActors] = useState([]);


  const [timeoutId, updateTimeoutId] = useState();


  // Fetch Data
  const fetchMoviesList = async (searchString, movieList) => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchString}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "4863bb7b79msh45a8b3ca6f099fap10e2d3jsn2d918d27dedc"
      }
    })
      .then(response => response.json())
      .then(jsondata => {
        if (movieList === 1) {
          updateMovieList1(jsondata.d);
        } else if (movieList === 2) {
          updateMovieList2(jsondata.d);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  //Event handlers
  const movieSearchQuery1 = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchMoviesList(e.target.value, 1), 500);
    updateTimeoutId(timeout);
  };

  const movieSearchQuery2 = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchMoviesList(e.target.value, 2), 500);
    updateTimeoutId(timeout);
  };

  useEffect(() => {
    if (selectedMovie1 && selectedMovie2) {
      const filterMatchingActors = selectedMovie1.filter((element) => selectedMovie2.includes(element));
      setfilteredActors(filterMatchingActors);
    }
  }, [selectedMovie1, selectedMovie2])

  return (
    <div className="App">

      <div className="movieList1">
        <input onChange={movieSearchQuery1} />
        {movieList1?.length ? (
          movieList1.map((movie) => (
            <MovieThumbnail
              key={movie.id}
              movieSelectnumber={1}
              movieId={movie.id}
              movieTitle={movie.l}
              selectedMovie1={selectedMovie1}
              setSelectedMovie1={setSelectedMovie1}
            />
          ))
        ) : (
          <p>No movies</p>
        )}
      </div>

      <div className="movieList2">
        <input onChange={movieSearchQuery2} />
        {movieList2?.length ? (
          movieList2.map((movie) => (
            <MovieThumbnail
              key={movie.id}
              movieSelectnumber={2}
              movieId={movie.id}
              movieTitle={movie.l}
              selectedMovie2={selectedMovie2}
              setSelectedMovie2={setSelectedMovie2}
            />
          ))
        ) : (
          <p>No movies</p>
        )}
      </div>



    </div>
  );
}

export default App;
