import './filterForm.scss';

import { useState, useEffect } from "react";

import useNasaService from "../../services/useNasaService";

import RoverFilter from "../roverFilter/RoverFilter";
import SolFilter from "../solFilter/SolFilter";

const FilterForm = (props) => {

    const [selectedRover, setSelectedRover] = useState(null);
    const [selectedSol, setSelectedSol] = useState(null);


    const onRoverSelected = (rover) => {
        setSelectedRover(rover);
    }

    const onSolSelected = (sol) => {
        setSelectedSol(sol);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.onRoverSelected(selectedRover);
        props.onSolSelected(selectedSol);
    }


    return (
        <form action="" className="filterForm" onSubmit={onSubmit}>
            <div className="filterForm__wrapper">
                <RoverFilter onRoverSelected={onRoverSelected} onRoverClicked={props.onRoverClicked}/>
                <SolFilter selectedRover={selectedRover} maxSol={props.maxSol} onSolSelected={onSolSelected}/>
            </div>
            <button className="filterForm__btn">Get images</button>
        </form>
    )

}

export default FilterForm;