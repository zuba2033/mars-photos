import './roverFilter.scss';

import { useDispatch, useSelector } from 'react-redux';
import { roverFilterChanged } from '../../slices/formSlice';

const RoverFilter = () => {

    const dispatch = useDispatch();

    const manifest = useSelector(state => state.manifest);
    const { selectedRover } = useSelector(state => state.form);
    const disabled = manifest.manifestLoadingStatus === "loading";

    const onRadioChange = (e) => {
        dispatch(roverFilterChanged(e.target.value));
    }

    const titleClassList = selectedRover ? 'roverFilter__title' : 'roverFilter__title translate';

    return (
        <div className="roverFilter" >
            <h2 className={titleClassList}>Select rover</h2>
            <div className="roverFilter__inputs">
                <label className="roverFilter__input">
                    <input disabled={disabled} 
                        checked={selectedRover === "curiosity"} 
                        type="radio" 
                        name="rover-choise" 
                        id="curiosity" 
                        value="curiosity" 
                        onChange={onRadioChange}/>
                    <span htmlFor="curiosity">Curiosity</span>
                </label>
                <label  className="roverFilter__input">
                    <input disabled={disabled} 
                        checked={selectedRover === "opportunity"} 
                        type="radio" 
                        name="rover-choise" 
                        id="opportunity" 
                        value="opportunity" 
                        onChange={onRadioChange}/>
                    <span>Opportunity</span>
                </label>
                <label className="roverFilter__input">
                    <input disabled={disabled}
                        checked={selectedRover === "spirit"} 
                        type="radio"
                        name="rover-choise"
                        id="spirit"
                        value="spirit" 
                        onChange={onRadioChange}/>
                    <span>Spirit</span>
                </label>
                <label className="roverFilter__input">
                    <input disabled={disabled}
                        checked={selectedRover === "perseverance"} 
                        type="radio" 
                        name="rover-choise" 
                        id="perseverance" 
                        value="perseverance" 
                        onChange={onRadioChange}/>
                    <span >Perseverance</span>
                </label>
            </div>
        </div>
    )
}

export default RoverFilter;