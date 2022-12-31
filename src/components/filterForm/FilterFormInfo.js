import { useSelector } from "react-redux";
import { submitedSolInfoSelector } from "../../slices/manifestSlice";

import './filterForm.scss';

const FilterFormInfo = () => {
    const { submitedSol } = useSelector(state => state.form);
    const { earthDateOfPhoto, totalPhotosInSol }=  useSelector(submitedSolInfoSelector);

    const content = submitedSol ? 
            <>
                <div className="filterForm__info filterForm__info-display">
                    Available {totalPhotosInSol} photos for sol {submitedSol}<br /> 
                    Earth date: {earthDateOfPhoto}
                </div>
                <div className="filterForm__info filterForm__info-adaptive">
                    Sol: {submitedSol} <br />
                    Earth date: {earthDateOfPhoto}
                </div> 
            </>
            :
            <div className="filterForm__info">
                <h2>Choose rover and sol <div className="display">and download the gallery</div></h2>
            </div>

    return (
        <>
            {content}
        </>
    )
}

export default FilterFormInfo;