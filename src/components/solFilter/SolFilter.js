import './solFilter.scss';

import { useState } from 'react';

const SolFilter = (props) => {

    const [selectedSol, setSelectedSol] = useState(null);

    const onInputChange = (e) => {
        setSelectedSol(+e.target.value);
    }

    const onSolSelected = () => {
        props.onSolSelected(selectedSol);
    }

    return (
        <div className="solFilter">
            <h2 className="solFilter__title">Select sol</h2>
            <label htmlFor="solFilter__input">Enter the integer from 1 to {props.maxSol}</label>
            <input type="number"
                   min={1} 
                   max={props.maxSol} 
                   step={1}
                   id='solFilter__input' 
                   className='solFilter__input'
                   onChange={onInputChange}/>
            <button className="solFilter__btn" onClick={onSolSelected}>Confirm</button>
        </div>
    )
}

export default SolFilter;