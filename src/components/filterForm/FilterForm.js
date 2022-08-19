import { useState } from "react";

import RoverFilter from "../roverFilter/RoverFilter";

const FilterForm = (props) => {

    const [selectedRover, setSelectedRover] = useState(null);

    const onRoverSelected = (rover) => {
      setSelectedRover(rover);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.onRoverSelected(selectedRover);
    }


    return (
        <form action="" className="filterForm" onSubmit={onSubmit}>
            <RoverFilter onRoverSelected={onRoverSelected}/>
            <button className="filterForm__btn">Select</button>
        </form>
    )

}

export default FilterForm;