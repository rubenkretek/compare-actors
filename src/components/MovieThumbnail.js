import React from "react";
import { FaImage } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const MovieThumbnail = ({ movie, movieSelectnumber, selectedMovie1Info, selectedMovie2Info, setSelectedMovie1Info, setSelectedMovie2Info, thumbnailLoading }) => {

    // This variable is created to make it possible to match with the ID of selected movie (see <li> item below)
    let currentMovieId = `/title/${movie.id}/`;



    // Fetch Movie Actors Data
    const fetchMovieActors = async (searchString, selectedMovie) => {
        fetch(`https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=${searchString}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_IMDB_API_KEY
            }
        })
            .then(response => response.json())
            .then(jsondata => {
                if (selectedMovie === 1) {
                    setSelectedMovie1Info(jsondata);
                } else if (selectedMovie === 2) {
                    setSelectedMovie2Info(jsondata);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };


    const selectHandler = () => {
        fetchMovieActors(movie.id, movieSelectnumber);
        console.log(currentMovieId);
    }

    return (

        <li className={`small-thumbnail ${currentMovieId === selectedMovie1Info.id ? " active active-1" : currentMovieId === selectedMovie2Info.id ? " active active-2" : ""}`} onClick={selectHandler}>
            <div className="small-thumbnail__image">
                {movie.i
                    ? <img src={movie.i.imageUrl} alt="Movie poster" />
                    : <div className="small-thumbnail__no-image">
                        <FaImage />
                    </div>
                }
            </div>
            <div className="small-thumbnail__title">
                {movie.l.length > 30 ? (
                    <div className="small-thumbnail__title-inner">{movie.l.substring(0, 30)}...</div>
                ) : (
                    <div className="small-thumbnail__title-inner">{movie.l}</div>
                )}
            </div>
        </li>
    )
}

export default MovieThumbnail;