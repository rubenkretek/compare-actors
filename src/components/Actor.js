import React from "react";

const Actor = ({ name, imageURL }) => {

    return (
        <div className="actor-card">
            <div className="actor-card__container">
                <div className="actor-card__left">
                    <div className="actor-card__image">
                        <img src={imageURL} alt={`Headshot of ${name}`} />
                    </div>
                </div>

                <div className="actor-card__right">
                    <div className="actor-card__name">
                        <h3>{name}</h3>
                    </div>
                    <div className="actor-card__characters">
                        <div className="actor-card__character-1">
                            Jack Dawson
                        </div>
                        <div className="actor-card__character-2">
                            Jack Dawson
                        </div>
                    </div>
                    <div className="actor-card__bio">
                        <p>Few actors in the world have had a career quite as diverse as Leonardo DiCaprio's. DiCaprio has gone from relatively humble beginnings, as a supporting cast member of the sitcom Growing Pains (1985) and low budget horror movies, such as Critters 3 (1991), to a major teenage heartthrob in the 1990s, as the hunky lead actor in ….</p>
                    </div>
                    <div className="actor-card__link">
                        <a href="imdb.com" className="button" target="_blank">See Leonardo DiCaprio on IMDB</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actor;