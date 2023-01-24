import './filterForm.scss';

import { useSelector, useDispatch } from 'react-redux';
import { pageReset } from '../../slices/imageGallerySlice';
import { selectedSolInfoSelector } from '../../slices/manifestSlice';
import { solFilterSubmited, roverFilterSubmited } from '../../slices/formSlice';

import RoverFilter from "../roverFilter/RoverFilter";
import SolFilter from "../solFilter/SolFilter";
import FilterFormInfo from './FilterFormInfo';

const FilterForm = () => {

    const { selectedRover, selectedSol, submitedRover, submitedSol } = useSelector(state => state.form);
    const { totalPhotosInSol } = useSelector(selectedSolInfoSelector);
    const { imagesLoadingStatus } = useSelector(state => state.images);
    

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (submitedRover === selectedRover && submitedSol === selectedSol) return;
        dispatch(solFilterSubmited(selectedSol));
        dispatch(roverFilterSubmited(selectedRover));
        dispatch(pageReset());
        // eslint-disable-next-line
    }

    const disabled = !selectedSol || !totalPhotosInSol;

    const btnClassNames = selectedRover && selectedSol && !submitedRover ? "button filterForm__btn translate" : "button filterForm__btn" 

    return (
        <form className="filterForm" onSubmit={onSubmit}>
            <div className="filterForm__wrapper">
                <RoverFilter/>
                <SolFilter/>
                <div className="filterForm__bottom-wrapper">
                    <button 
                        type="submit" 
                        disabled={disabled} 
                        className={btnClassNames}
                        >{imagesLoadingStatus === 'loading' ? 'Loading...' : 'Show photos'}</button>
                    <FilterFormInfo/>
                </div>
            </div>
        </form>
    )
}

export default FilterForm;