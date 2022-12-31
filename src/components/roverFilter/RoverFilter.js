import './roverFilter.scss';

import { useDispatch, useSelector } from 'react-redux';
import { roverFilterChanged } from '../../slices/formSlice';

const RoverFilter = () => {

    const dispatch = useDispatch();

    const manifest = useSelector(state => state.manifest);
    const { selectedRover } = useSelector(state => state.form);

    const disabled = manifest.manifestLoadingStatus === "loading"

    const onRadioChange = (e) => {
        dispatch(roverFilterChanged(e.target.value));
    }

    const titleClassList = selectedRover ? 'roverFilter__title' : 'roverFilter__title translate';

    return (
        <div className="roverFilter" >
            <h2 className={titleClassList}>Select rover</h2>
            <div className="roverFilter__inputs">
                <div className="roverFilter__input">
                    <label htmlFor="curiosity">Curiosity</label>
                    <input disabled={disabled} type="radio" name="rover-choise" id="curiosity" value="curiosity" onChange={onRadioChange}/>
                </div>
                <div className="roverFilter__input">
                    <label htmlFor="opportunity">Opportunity</label>
                    <input disabled={disabled} type="radio" name="rover-choise" id="opportunity" value="opportunity" onChange={onRadioChange}/>
                </div>
                <div className="roverFilter__input">
                    <label htmlFor="spirit">Spirit</label>
                    <input disabled={disabled} type="radio" name="rover-choise" id="spirit" value="spirit" onChange={onRadioChange}/>
                </div>
                <div className="roverFilter__input">
                    <label htmlFor="perseverance">Perseverance</label>
                    <input disabled={disabled} type="radio" name="rover-choise" id="perseverance" value="perseverance" onChange={onRadioChange}/>
                </div>
            </div>
        </div>
    )
}

export default RoverFilter;