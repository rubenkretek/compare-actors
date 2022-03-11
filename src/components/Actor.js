import React from "react";

import { MdOpenInNew } from 'react-icons/md';


const Actor = ({ name, imageURL, bio, link }) => {

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
                        {bio.length > 450 ? (
                            <p>{bio.substring(0, 450)}...</p>
                        ) : (
                            <p>{bio}</p>
                        )}
                    </div>
                    <div className="actor-card__link">
                        <a href={`https://www.imdb.com${link}`} className="button" target="_blank" rel="noreferrer">See {name} on IMDB<MdOpenInNew /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actor;