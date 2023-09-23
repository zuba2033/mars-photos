import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { solFilterChanged } from '../../slices/formSlice';
import { selectedSolInfoSelector } from '../../slices/manifestSlice';
import { getRandomIntInclusive } from '../../utils/utils';

import './solFilter.scss';

const SolFilter = () => {

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const { selectedRover, selectedSol, submitedRover } = useSelector(state => state.form);
    const { totalPhotosInSol } = useSelector(selectedSolInfoSelector);
    const { maxSol } = useSelector(state => state.manifest[selectedRover] || state.manifest );
    const { manifestLoadingStatus } = useSelector(state => state.manifest);

    const onInputChange = (e) => {
        dispatch(solFilterChanged(+e.target.value));
    }

    const onRandomBtnClick = () => {
        const randomInt = getRandomIntInclusive(1, maxSol);
        dispatch(solFilterChanged(randomInt));
        inputRef.current.value = randomInt;
    }

    useEffect(() => {
        if (submitedRover && submitedRover !== selectedRover) {
            inputRef.current.value = '';
            dispatch(solFilterChanged(''));
        }
    }, [submitedRover, selectedRover, dispatch])

    const disabled = !(maxSol >= 1);

    const titleClassList = !selectedSol && selectedRover ? 'solFilter__title translate' : 'solFilter__title';

    return (
        <div className="solFilter">
            <h2 className={titleClassList}>Select sol</h2>
            <label htmlFor="solFilter__input">Enter the integer from 1 to {maxSol ? maxSol : '-'}</label>
            <div className="solFilter__bottomWrapper">
                <input type="number"
                    min={1} 
                    max={maxSol} 
                    step={1}
                    id='solFilter__input' 
                    className='solFilter__input'
                    onChange={onInputChange}
                    disabled={disabled}
                    ref={inputRef}
                    />
                <button type="button" 
                        disabled={disabled}  
                        className="button solFilter__btn"
                        onClick={onRandomBtnClick}>Random</button>
                {selectedSol && manifestLoadingStatus !== "loading" ? 
                    <h3>{maxSol && selectedSol > maxSol ? 
                            "choose another sol" : 
                            `found ${totalPhotosInSol === 0 ? 0 : totalPhotosInSol} photos`}
                    </h3> : 
                    null}
            </div>
            
        </div>
    )
}

export default SolFilter;