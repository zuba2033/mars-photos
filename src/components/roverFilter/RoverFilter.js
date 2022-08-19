import './roverFilter.scss';

import { useState, useEffect } from 'react';

// import useNasaService from '../../services/useNasaService';

const RoverFilter = (props) => {

    // const {getMissionManifest} = useNasaService();

    // const onRequestManifest = (rover) => {
    //     getMissionManifest(rover);
    // }

    // useEffect(() => {
    //     if (!rover) return;
    //     onRequestManifest(rover)
    // }, [rover])

    const onRadioChange = (e) => {
        props.onRoverSelected(e.target.value);
    }

    return (
        <div className="roverFilter" >
            <h2 className="roverFilter__title">Select rover</h2>
            <div className="roverFilter__inputs">
                <label htmlFor="curiosity">Curiosity</label>
                <input type="radio" name="rover-choise" id="curiosity" value="curiosity" onChange={onRadioChange}/>
                <label htmlFor="opportunity">Opportunity</label>
                <input type="radio" name="rover-choise" id="opportunity" value="opportunity" onChange={onRadioChange}/>
                <label htmlFor="spirit">Spirit</label>
                <input type="radio" name="rover-choise" id="spirit" value="spirit" onChange={onRadioChange}/>
            </div>
        </div>
    )
}

export default RoverFilter;