import React from "react";

const MovieThumbnail = ({ movieId, movieSelectnumber, movieTitle, movieImage, setSelectedMovie1, setSelectedMovie2, selectedMovieInfo1, setSelectedMovieInfo1, selectedMovieInfo2, setSelectedMovieInfo2 }) => {



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
                    setSelectedMovieInfo1({
                        ...selectedMovieInfo1,
                        id: movieId,
                        name: movieTitle,
                        imageURL: movieImage,

                    });
                    console.log(movieTitle);
                    console.log(movieImage);
                } else if (selectedMovie === 2) {
                    setSelectedMovie2(jsondata);
                    setSelectedMovieInfo2({
                        ...selectedMovieInfo2,
                        id: movieId,
                        name: movieTitle,
                        imageURL: movieImage,

                    });
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
        <li className={`small-thumbnail${(movieId === selectedMovieInfo1.id) ? " active active-1" : ""}`} onClick={selectHandler}>
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