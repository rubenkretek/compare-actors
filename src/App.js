import './styles/App.scss';
import { useState, useEffect } from 'react';
import { FaSearch, FaQuestion } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


//Components
import MovieThumbnail from './components/MovieThumbnail';
import Actor from './components/Actor';





function App() {
  //State
  const [movieList1, setMovieList1] = useState([]);
  const [movieList2, setMovieList2] = useState([]);

  const [movie1ActorIds, setMovie1ActorIds] = useState([]);
  const [movie2ActorIds, setMovie2ActorIds] = useState([]);




  const [filteredActorIDs, setFilteredActorIDs] = useState([]);
  const [actorList, setActorList] = useState([]);


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

  // Send api request after user stops typing for movie 1
  const movieSearchQuery1 = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchMoviesList(e.target.value, 1), 500);
    updateTimeoutId(timeout);
  };

  // Send api request after user stops typing for movie 2
  const movieSearchQuery2 = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchMoviesList(e.target.value, 2), 500);
    updateTimeoutId(timeout);
  };

  // When selected movie changes, compare the two actor lists and filter matching ones into filteredActorIDs
  // useEffect(() => {
  //   if (movie1ActorIds && movie2ActorIds) {
  //     const filterMatchingActors = movie1ActorIds.filter((element) => movie2ActorIds.includes(element));
  //     setFilteredActorIDs(filterMatchingActors);
  //   }
  // }, [movie1ActorIds, movie2ActorIds]);

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
            objectArray.push({
              name: data.name,
              imageURL: data.image.url,
              bio: data.miniBios[0].text,
              link: data.id
            });
            itemsProcessed++;
            console.log("yeah buddy")
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
      <div className="movies">
        <div className="movies__title">
          <h1>Select two films to compare actors</h1>
        </div>
        <div className="movies__select-container">
          <div className="movies__select movies__select--one">
            <div className="movies__selected">
              {Object.keys(movie1ActorIds).length ? (
                <div className="movies__selected-thumbnail">
                  <div className="movies__selected-poster">
                    <img src={movie1ActorIds.base.image.url} alt="Selected movie poster"></img>
                  </div>
                  <div className="movies__selected-title">
                    <h3>{movie1ActorIds.base.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="movies__selected-thumbnail">
                  <div className="movies__selected-poster">
                    <div className="movies__no-movie">
                      <FaQuestion />
                    </div>
                  </div>
                  <div className="movies__selected-title">
                    <h3>Select Movie</h3>
                  </div>
                </div>
              )}
            </div>

            <div className="movies__select-input">
              <input onChange={movieSearchQuery1} placeholder="Start typing to search movies" />
              <div className="movies__search-icon">
                <FaSearch />
              </div>
            </div>

            <div className="movies__select-thumbnails">
              {movieList1?.length ? (
                <ul className="small-thumbnail__list">
                  {movieList1.map((movie) => (
                    <MovieThumbnail
                      key={uuidv4()}
                      movieSelectnumber={1}
                      movieId={movie.id}
                      movieTitle={movie.l}
                      movieImage={movie.i.imageUrl}
                      movie1ActorIds={movie1ActorIds}
                      setMovie1ActorIds={setMovie1ActorIds}
                      movie2ActorIds={movie2ActorIds}
                      setMovie2ActorIds={setMovie2ActorIds}
                    />
                  ))}
                </ul>
              ) : (
                <ul className="small-thumbnail__list">
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                </ul>
              )}
            </div>
          </div>

          <div className="movies__select movies__select--two">

            <div className="movies__selected">
              {Object.keys(movie2ActorIds).length ? (
                <div className="movies__selected-thumbnail">
                  <div className="movies__selected-poster">
                    <img src={movie2ActorIds.base.image.url} alt="Selected movie poster"></img>
                  </div>
                  <div className="movies__selected-title">
                    <h3>{movie2ActorIds.base.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="movies__selected-thumbnail">
                  <div className="movies__selected-poster">
                    <div className="movies__no-movie">
                      <FaQuestion />
                    </div>
                  </div>
                  <div className="movies__selected-title">
                    <h3>Select Movie</h3>
                  </div>
                </div>
              )}
            </div>

            <div className="movies__select-input">
              <input onChange={movieSearchQuery2} placeholder="Start typing to search movies" />
              <div className="movies__search-icon">
                <FaSearch />
              </div>
            </div>

            <div className="movies__select-thumbnails">
              {movieList2?.length ? (
                <ul className="small-thumbnail__list">
                  {movieList2.map((movie) => (
                    <MovieThumbnail
                      key={uuidv4()}
                      movieSelectnumber={2}
                      movieId={movie.id}
                      movieTitle={movie.l}
                      movieImage={movie.i.imageUrl}
                      movie1ActorIds={movie1ActorIds}
                      setMovie1ActorIds={setMovie1ActorIds}
                      movie2ActorIds={movie2ActorIds}
                      setMovie2ActorIds={setMovie2ActorIds}

                    />
                  ))}
                </ul>
              ) : (
                <ul className="small-thumbnail__list">
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                  <li className="small-thumbnail small-thumbnail--unselected"><FaQuestion /></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="actors">
        <div className="actors__title">
          {/* Sort this out later !!! */}
          {/* <h2>{movie1ActorIds.base.title} and {movie2ActorIds.base.title} share {actorList.length > 1 ? (<span>these actors</span>) : (<span>this actor</span>)}</h2> */}
        </div>
        <div className={`actors__container ${actorList.length === 1 ? ("actors__container--single") : ""}`}>
          {actorList?.length ? (
            actorList.map((actor) => (
              <Actor
                key={uuidv4()}
                name={actor.name}
                imageURL={actor.imageURL}
                bio={actor.bio}
                link={actor.link}
              />
            ))
          ) : (
            <div>nothing</div>
          )}
        </div>
      </div>



    </div>
  );
}

export default App;
