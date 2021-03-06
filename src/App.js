import './styles/App.scss';
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaQuestion } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


//Components
import Actor from './components/Actor';
import Footer from './components/Footer';
import MovieThumbnail from './components/MovieThumbnail';
import MovieThumbnailUnselected from './components/MovieThumbnailUnselected';
import Reset from './components/Reset';


function App() {
  //State
  const [movieList1, setMovieList1] = useState([]);
  const [movieList2, setMovieList2] = useState([]);

  const [filteredmovieList1, setFilteredmovieList1] = useState([]);
  const [filteredmovieList2, setFilteredmovieList2] = useState([]);

  const [selectedMovie1Info, setSelectedMovie1Info] = useState([]);
  const [selectedMovie2Info, setSelectedMovie2Info] = useState([]);

  //Let's the app know if both movies are selected
  const [bothSelected, setBothSelected] = useState(false);

  // Manages loading
  const [posterLoading, setPosterLoading] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [matchingActors, setMatchingActors] = useState([]);
  const [filteredActorInfo, setFilteredActorInfo] = useState([]);

  const [timeoutId, updateTimeoutId] = useState();

  // Tells app if component is mounted for the first time
  const isMounted = useRef(false);


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
        setThumbnailLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  //-------------------------- Event handlers
  // Send api request after user stops typing for movie 1
  const movieSearchQuery1 = (e) => {
    setThumbnailLoading(true);
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchMoviesList(e.target.value, 1), 500);
    updateTimeoutId(timeout);
  };

  // Send api request after user stops typing for movie 2
  const movieSearchQuery2 = (e) => {
    setThumbnailLoading(true);
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchMoviesList(e.target.value, 2), 500);
    updateTimeoutId(timeout);
  };

  //-------------------------- Use effect
  // Filter out all feature films and put them in filteredMovieList1
  useEffect(() => {
    var featureFilms = movieList1.filter(function (movie) {
      return movie.q === "feature";
    });
    setFilteredmovieList1(featureFilms);
  }, [movieList1]);

  // Filter out all feature films and put them in filteredMovieList2
  useEffect(() => {
    var featureFilms = movieList2.filter(function (movie) {
      return movie.q === "feature";
    });
    setFilteredmovieList2(featureFilms);
  }, [movieList2]);

  // When selected movie changes, compare the two actor lists and filter matching ones into matchingActors
  useEffect(() => {
    if (Object.keys(selectedMovie1Info).length && Object.keys(selectedMovie2Info).length) {
      const selectedMovie1Actors = selectedMovie1Info.cast;
      const selectedMovie2Actors = selectedMovie2Info.cast;

      var filteredActors = selectedMovie1Actors.filter(function (m1) {
        return selectedMovie2Actors.some(function (m2) {
          return m1.id === m2.id; // return the ones with equal id
        });
      });
      setMatchingActors(filteredActors);
      setBothSelected(true);
    }
  }, [selectedMovie1Info, selectedMovie2Info]);

  // Compare actors from both movies and retrieve character names from each movie
  // Then put all info into filteredActorInfo
  useEffect(() => {
    const movie1cast = selectedMovie1Info.cast;
    const movie2cast = selectedMovie2Info.cast;
    var actorState = [];
    matchingActors.forEach((actor) => {
      var infoFromMovie1 = movie1cast.filter(cast => cast.id === actor.id);
      var infoFromMovie2 = movie2cast.filter(cast => cast.id === actor.id);
      var character1 = infoFromMovie1[0].characters[0];
      var character2 = infoFromMovie2[0].characters[0];
      actorState.push({
        id: actor.id,
        name: actor.name,
        image: actor.image,
        character1: character1,
        character2: character2
      });
      setFilteredActorInfo(actorState);
    });
  }, [matchingActors]);

  // Scroll to actor list when filteredActorInfo changes
  useEffect(() => {
    var delayInMilliseconds = 300;
    if (isMounted.current) {
      setTimeout(function () {
        document.getElementById("js-actors").scrollIntoView(true);
      }, delayInMilliseconds);
    } else {
      isMounted.current = true;
    }

  }, [filteredActorInfo]);



  return (
    <div className="App">
      <div className="movies" id="js-movies">
        <div className="movies__title">
          <h1>Select two films to compare actors</h1>
        </div>
        <div className="movies__select-container">
          <div className="movies__select movies__select--one">
            <div className="movies__selected">
              {
                posterLoading === true && Object.keys(selectedMovie1Info).length === 0 ? (
                  <div className="movies__selected-thumbnail">
                    <div className="movies__selected-poster">
                      <div className="movies__no-movie">
                        <div className="spinner">
                          <div className="double-bounce1"></div>
                          <div className="double-bounce2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="movies__selected-title">
                      <h3>Select Movie</h3>
                    </div>
                  </div>
                )
                  :
                  Object.keys(selectedMovie1Info).length ?
                    (
                      <div className="movies__selected-thumbnail">
                        <div className="movies__selected-poster">
                          <img src={selectedMovie1Info.base.image.url} alt="Selected movie poster"></img>
                        </div>
                        <div className="movies__selected-title">
                          <h3>{selectedMovie1Info.base.title}</h3>
                        </div>
                      </div>
                    )
                    : (
                      <div className="movies__selected-thumbnail">
                        <div className="movies__selected-poster">
                          <div>
                            <div className="movies__no-movie">
                              <div className="movies__icon">
                                <FaQuestion />
                              </div>
                              <div className="movies__number">
                                <h2>Movie 1</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="movies__selected-title">
                          <h3>Select Movie</h3>
                        </div>
                      </div>
                    )}
            </div>

            <div className="movies__select-input">
              <input onChange={movieSearchQuery1} placeholder="Start typing to search" id="js-input-1" />
              <div className="movies__search-icon">
                <FaSearch />
              </div>
            </div>

            <div className="movies__select-thumbnails">
              {filteredmovieList1?.length ? (
                <ul className="small-thumbnail__list">
                  {filteredmovieList1.map((movie) => (
                    <MovieThumbnail
                      key={uuidv4()}
                      movieSelectnumber={1}
                      movie={movie}
                      selectedMovie1Info={selectedMovie1Info}
                      setSelectedMovie1Info={setSelectedMovie1Info}
                      selectedMovie2Info={selectedMovie2Info}
                      setSelectedMovie2Info={setSelectedMovie2Info}
                      posterLoading={posterLoading}
                      setPosterLoading={setPosterLoading}
                    />
                  ))}
                </ul>
              ) : (
                <ul className="small-thumbnail__list">
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                </ul>
              )}
            </div>
          </div>

          <div className="movies__select movies__select--two">

            <div className="movies__selected">
              {
                posterLoading === true && Object.keys(selectedMovie2Info).length === 0 ? (
                  <div className="movies__selected-thumbnail">
                    <div className="movies__selected-poster">
                      <div className="movies__no-movie">
                        <div className="spinner">
                          <div className="double-bounce1"></div>
                          <div className="double-bounce2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="movies__selected-title">
                      <h3>Select Movie</h3>
                    </div>
                  </div>
                )
                  :
                  Object.keys(selectedMovie2Info).length ?
                    (
                      <div className="movies__selected-thumbnail">
                        <div className="movies__selected-poster">
                          <img src={selectedMovie2Info.base.image.url} alt="Selected movie poster"></img>
                        </div>
                        <div className="movies__selected-title">
                          <h3>{selectedMovie2Info.base.title}</h3>
                        </div>
                      </div>
                    )
                    : (
                      <div className="movies__selected-thumbnail">
                        <div className="movies__selected-poster">
                          <div>
                            <div className="movies__no-movie">
                              <div className="movies__icon">
                                <FaQuestion />
                              </div>
                              <div className="movies__number">
                                <h2>Movie 2</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="movies__selected-title">
                          <h3>Select Movie</h3>
                        </div>
                      </div>
                    )}
            </div>

            <div className="movies__select-input">
              <input onChange={movieSearchQuery2} placeholder="Start typing to search" id="js-input-2" />
              <div className="movies__search-icon">
                <FaSearch />
              </div>
            </div>

            <div className="movies__select-thumbnails">
              {filteredmovieList2?.length ? (
                <ul className="small-thumbnail__list">
                  {filteredmovieList2.map((movie) => (
                    <MovieThumbnail
                      key={uuidv4()}
                      movieSelectnumber={2}
                      movie={movie}
                      selectedMovie1Info={selectedMovie1Info}
                      setSelectedMovie1Info={setSelectedMovie1Info}
                      selectedMovie2Info={selectedMovie2Info}
                      setSelectedMovie2Info={setSelectedMovie2Info}
                      setPosterLoading={setPosterLoading}
                      thumbnailLoading={thumbnailLoading}
                    />
                  ))}
                </ul>
              ) : (
                <ul className="small-thumbnail__list">
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                  <MovieThumbnailUnselected thumbnailLoading={thumbnailLoading} />
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="actors" id="js-actors">
        {bothSelected &&
          <div className="actors__title">
            {matchingActors.length > 0 ? (
              <h2>{selectedMovie1Info.base.title} and {selectedMovie2Info.base.title} share {matchingActors.length > 1 ? (<span>these actors</span>) : (<span>this actor</span>)}</h2>
            ) : (
              <h2>???? {selectedMovie1Info.base.title} and {selectedMovie2Info.base.title} do not share any actors ????</h2>
            )}
          </div>
        }
        <div className={`actors__container ${filteredActorInfo.length === 1 ? ("actors__container--single") : ""}`}>
          {filteredActorInfo.length > 0 &&
            filteredActorInfo.map((actor) => (
              <Actor
                key={uuidv4()}
                actor={actor}
              />
            ))
          }
        </div>
        {filteredActorInfo.length > 0 &&
          <Reset
            setMovieList1={setMovieList1}
            setMovieList2={setMovieList2}
            setFilteredmovieList1={setFilteredmovieList1}
            setFilteredmovieList2={setFilteredmovieList2}
            setSelectedMovie1Info={setSelectedMovie1Info}
            setSelectedMovie2Info={setSelectedMovie2Info}
            setBothSelected={setBothSelected}
            setMatchingActors={setMatchingActors}
            setFilteredActorInfo={setFilteredActorInfo}
          />
        }
      </div>

      <Footer />

    </div>
  );
}

export default App;
