import React from "react";
import { MdLoop } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const MovieThumbnail = ({ movieId, movieSelectnumber, movieTitle, movieImage, movie1ActorIds, setMovie1ActorIds, movie2ActorIds, setMovie2ActorIds }) => {



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
                    setMovie1ActorIds(jsondata);
                    console.log(movieTitle);
                    console.log(movieImage);
                } else if (selectedMovie === 2) {
                    setMovie2ActorIds(jsondata);
                    console.log(movieTitle);
                    console.log(movieImage);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };


    const selectHandler = () => {
        fetchMovieActors(movieId, movieSelectnumber)
    }
    return (
        // sort this out later className={`small-thumbnail ${(movieId === movie1ActorIds.id) ? " active active-1" : ""}`
        <li className={`small-thumbnail`} onClick={selectHandler}>
            <div className="small-thumbnail__image">
                <img src={movieImage} alt="Movie poster" />
            </div>
            <div className="small-thumbnail__title">
                {movieTitle.length > 30 ? (
                    <div className="small-thumbnail__title-inner">{movieTitle.substring(0, 30)}...</div>
                ) : (
                    <div className="small-thumbnail__title-inner">{movieTitle}</div>
                )}
            </div>
        </li>
    )
}

export default MovieThumbnail;