import './App.css';
import { useState, useEffect } from 'react';

//Components
import MovieThumbnail from './components/MovieThumbnail';
import Actor from './components/Actor';





function App() {
  //State
  const [movieList1, setMovieList1] = useState([]);
  const [movieList2, setMovieList2] = useState([]);

  const [selectedMovie1, setSelectedMovie1] = useState(null);
  const [selectedMovie2, setSelectedMovie2] = useState(null);

  const [filteredActorIDs, setFilteredActorIDs] = useState([]);
  const [actorList, setActorList] = useState([{
    id: null,
    name: null,
  }]);


  const [timeoutId, updateTimeoutId] = useState();


  // -------------------------- Fetch Data
  const fetchMoviesList = async (searchString, movieList) => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchString}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_IMDB_API_KEY,
      }
    })
      .then(response => response.json())
      .then(jsondata => {
        if (movieList === 1) {
          setMovieList1(jsondata.d);
        } else if (movieList === 2) {
          setMovieList2(jsondata.d);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };


  //-------------------------- Event handlers
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

  //Update actor ids when selected movie changes
  useEffect(() => {
    if (selectedMovie1 && selectedMovie2) {
      const filterMatchingActors = selectedMovie1.filter((element) => selectedMovie2.includes(element));
      setFilteredActorIDs(filterMatchingActors);

    }
  }, [selectedMovie1, selectedMovie2]);

  // API call when actor list changes 
  useEffect(() => {
    if (filteredActorIDs.length) {
      let itemsProcessed = 0;
      const objectArray = [];

      filteredActorIDs.forEach(async (actorID) => {
        function sleep(milliseconds) {
          return new Promise((resolve) => setTimeout(resolve, milliseconds))
        }
        const strippedID = actorID.replace('/name/', '').replace('/', '');
        fetch(`https://imdb8.p.rapidapi.com/actors/get-bio?nconst=${strippedID}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_IMDB_API_KEY
          }
        })
          .then(response => response.json())
          .then(data => {
            // For some reason I need to add the objects to an array before I can add them to state
            objectArray.push({ name: data.name });
            itemsProcessed++;
            console.log(data.name)
            if (itemsProcessed === filteredActorIDs.length) {
              setActorList(objectArray);
            }
          })
          .catch(err => {
            console.error(err);
          });
        // Delay API call to get around 5 a second call limit
        if (filteredActorIDs.length > 5) {
          await sleep(500);
        }
      });
    }
  }, [filteredActorIDs]);

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

      {/* <div className="actors">
        <h2>Actors</h2>
        {actorList?.length ? (
          actorList.map((actor) => (
            <div>actor</div>
          ))
        ) : (
          <p>No Actors</p>
        )}
      </div> */}



    </div>
  );
}

export default App;
