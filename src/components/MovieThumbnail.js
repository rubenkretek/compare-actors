import React from "react";
import { MdLoop } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const MovieThumbnail = ({ movie, movieId, movieSelectnumber, setSelectedMovie1Info, setSelectedMovie2Info }) => {



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
        fetchMovieActors(movie.id, movieSelectnumber)
    }
    return (
        // sort this out later className={`small-thumbnail ${(movieId === selectedMovie1Info.id) ? " active active-1" : ""}`
        <li className={`small-thumbnail`} onClick={selectHandler}>
            <div className="small-thumbnail__image">
                {movie.i
                    ? <img src={movie.i.imageUrl} alt="Movie poster" />
                    : <div>No Image</div>
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