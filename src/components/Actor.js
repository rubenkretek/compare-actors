import React from "react";

const Actor = ({ name, imageURL }) => {

    return (
        <div>
            <div className="actor">
                <div className="actor__name">
                    {name}
                </div>
                <div className="actor__image">
                    <img src={imageURL} />
                </div>
            </div>
        </div>
    )
}

export default Actor;