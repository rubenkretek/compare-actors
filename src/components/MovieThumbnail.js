import React from "react";

const MovieThumbnail = ({ movieId, movieSelectnumber, movieTitle, selectedMovie1, setSelectedMovie1, selectedMovie2, setSelectedMovie2 }) => {



    // Fetch Movie Actors Data
    const fetchMovieActors = async (searchString, selectedMovie) => {
        fetch(`https://imdb8.p.rapidapi.com/title/get-top-cast?tconst=${searchString}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_IMDB_API_KEY
            }
        })
            .then(response => response.json())
            .then(jsondata => {
                if (selectedMovie === 1) {
                    setSelectedMovie1(jsondata);
                } else if (selectedMovie === 2) {
                    setSelectedMovie2(jsondata);
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
        <div>
            <div className="movie" onClick={selectHandler}>
                {movieTitle}
            </div>
        </div>
    )
}

export default MovieThumbnail;