import { useRef } from 'react';
import './solFilter.scss';

const SolFilter = (props) => {

    const onInputChange = (e) => {
        props.onSolSelected(e.target.value);
    }

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
    }

    const onRandomBtnClick = () => {
        const randomInt = getRandomIntInclusive(1, props.maxSol);
        props.onSolSelected(randomInt);
        myRef.current.value = randomInt;
    }

    const myRef = useRef(null);

    const disabled = props.maxSol >= 1 ? false : true;

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
                   onChange={onInputChange}
                   disabled={disabled}
                   ref={myRef}
                   />
            <button type="button" 
                    disabled={disabled}  
                    className="solFilter__btn"
                    onClick={onRandomBtnClick}>Random</button>
        </div>
    )
}

export default SolFilter;