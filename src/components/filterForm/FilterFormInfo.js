import { useSelector } from "react-redux";
import { submitedSolInfoSelector } from "../../slices/manifestSlice";

import './filterForm.scss';

const FilterFormInfo = () => {
    const { submitedSol } = useSelector(state => state.form);
    const { earthDateOfPhoto, totalPhotosInSol }=  useSelector(submitedSolInfoSelector);

    const content = submitedSol ? 
            <div className="filterForm__info">
                Available {totalPhotosInSol} photos for sol {submitedSol}<br /> 
                Earth date: {earthDateOfPhoto}
            </div> :
            <div className="filterForm__info">
                <h2>Choose rover and sol and download the gallery</h2>
            </div>

    return (
        <>
            {content}
        </>
    )
}

export default FilterFormInfo;