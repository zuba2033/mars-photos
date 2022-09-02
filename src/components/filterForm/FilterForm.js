import './filterForm.scss';

import { useState, useEffect } from "react";

import RoverFilter from "../roverFilter/RoverFilter";
import SolFilter from "../solFilter/SolFilter";

const FilterForm = (props) => {

    const [selectedRover, setSelectedRover] = useState(null);
    const [selectedSol, setSelectedSol] = useState(null);
    const [totalPhotosInSol, setTotalPhotosInSol] = useState("-");
    const [earthDateOfPhoto, setEarthDateOfPhoto] = useState("-");

    const manifestData = props.manifestData;

    const onRoverSelected = (rover) => {
        setSelectedRover(rover);
    }

    const onSolSelected = (sol) => {
        setSelectedSol(sol);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.onTotalPhotosInSolChanged(totalPhotosInSol);
        props.onRoverSelected(selectedRover);
        props.onSolSelected(selectedSol);
    }
    
    useEffect(() => {
        if (!manifestData || !selectedSol || selectedSol === "") {
            return;
        }
        const solData = manifestData.photos?.filter(item => {
            return item.sol === +selectedSol;
        })[0];
        if (!solData || solData.length === 0) {
            setTotalPhotosInSol(0);
        } else {
            setTotalPhotosInSol(solData.total_photos);
            setEarthDateOfPhoto(solData.earth_date);
        }

    }, [manifestData, selectedSol]);

    return (
        <form action="" className="filterForm" onSubmit={onSubmit}>
            <div className="filterForm__wrapper">
                <RoverFilter onRoverSelected={onRoverSelected} onRoverClicked={props.onRoverClicked}/>
                <SolFilter selectedRover={selectedRover} maxSol={props.maxSol} onSolSelected={onSolSelected}/>
                <input type="submit" disabled={!totalPhotosInSol} className="filterForm__btn" value="Show photos"/>
                {
                manifestData && (selectedSol > manifestData.maxSol) ? 
                    <div className="filterForm__info"> Choose another sol</div> :
                    <div className="filterForm__info">
                        Found {totalPhotosInSol} photo for sol {selectedSol ? selectedSol : "-"} <br /> Earth date: {earthDateOfPhoto}
                    </div>
                }
            </div>
        </form>
    )
}

export default FilterForm;