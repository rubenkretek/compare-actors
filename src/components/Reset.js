import React from "react";

import { MdRestartAlt } from 'react-icons/md';


const Reset = ({ setMovieList1, setMovieList2, setFilteredmovieList1, setFilteredmovieList2, setSelectedMovie1Info, setSelectedMovie2Info, setBothSelected, setMatchingActors, setFilteredActorInfo }) => {

    const deleteHandler = () => {

        const clearInputs = () => {
            const input1 = document.getElementById("js-input-1");
            const input2 = document.getElementById("js-input-2");
            input1.value = "";
            input2.value = "";
        }

        setMovieList1([]);
        setMovieList2([]);
        setFilteredmovieList1([]);
        setFilteredmovieList2([]);
        setSelectedMovie1Info([]);
        setSelectedMovie2Info([]);
        setBothSelected(false);
        setMatchingActors([]);
        setFilteredActorInfo([]);
        document.getElementById("js-movies").scrollIntoView(true);
        clearInputs();
    }

    return (
        <div className="reset">
            <div className="reset__container">
                <a onClick={deleteHandler} className="reset__button button button--white button--large">Start Again <MdRestartAlt /></a>
            </div>
        </div>
    )
}

export default Reset;