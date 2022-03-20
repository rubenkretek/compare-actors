import React from "react";
import { FaImage } from "react-icons/fa";

import { MdOpenInNew } from 'react-icons/md';


const Actor = ({ actor }) => {

    return (
        <div className="actor-card">
            <div className="actor-card__container">
                <div className="actor-card__left">
                    <div className="actor-card__image">
                        {actor.image
                            ? <img src={actor.image.url} alt={`Headshot of ${actor.name}`} />
                            : <div className="actor-card__no-image">
                                <FaImage />
                            </div>
                        }
                    </div>
                </div>

                <div className="actor-card__right">
                    <div className="actor-card__name">
                        <h3>{actor.name}</h3>
                    </div>
                    <div className="actor-card__characters">
                        <div className="actor-card__character-1">
                            {actor.character1}
                        </div>
                        <div className="actor-card__character-2">
                            {actor.character2}
                        </div>
                    </div>
                    <div className="actor-card__link">
                        <a href={`https://www.imdb.com${actor.id}`} className="button" target="_blank" rel="noreferrer">See {actor.name} on IMDB<MdOpenInNew /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Actor;