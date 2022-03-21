import React from "react";
import { FaQuestion } from 'react-icons/fa';

const MovieThumbnailUnselected = ({ thumbnailLoading }) => {

    return (
        <li className="small-thumbnail small-thumbnail--unselected">
            {thumbnailLoading ? (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            ) : (
                <FaQuestion />
            )
            }
        </li >
    )
}

export default MovieThumbnailUnselected;