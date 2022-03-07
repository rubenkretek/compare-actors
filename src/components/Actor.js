import React from "react";

const Actor = ({ name, imageURL }) => {

    return (
        <div>
            <div className="actor">
                <div className="actor__name">
                    {name}
                </div>
                <div className="actor__image">
                    <img src={imageURL} alt={`Headshot of ${name}`} />
                </div>
            </div>
        </div>
    )
}

export default Actor;