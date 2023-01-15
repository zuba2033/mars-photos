import './missionManifest.scss';

import curiosityImg from '../../images/curiosity.jpg';
import opportunityImg from '../../images/Opportunity_rover.jpg';
import spiritImg from '../../images/Spirit_rover.jpg';
import perseveranceImg from '../../images/perseverance.jpg';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { fetchManifest } from '../../slices/manifestSlice';

import ManifestSkeleton from '../manifestSkeleton/ManifestSkeleton';
import Spinner from '../spinner/Spinner';
import RoverPhotoModal from '../roverPhotoModal/RoverPhotoModal';
import ErrorMessage from '../errorMessage/ErrorMessage';

const MissionManifest = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const { selectedRover } = useSelector(state => state.form);
    const { manifestLoadingStatus } = useSelector(state => state.manifest);
    const manifest = useSelector(state => state.manifest[selectedRover]);
    
    const onModalClose = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        if (!selectedRover || manifest) return;
        dispatch(fetchManifest(selectedRover));
        // eslint-disable-next-line
    }, [selectedRover])


    let roverPhoto;
    if (selectedRover === 'spirit') {
        roverPhoto = spiritImg;
    } else if (selectedRover === "opportunity") {
        roverPhoto = opportunityImg;
    } else if (selectedRover === 'curiosity') {
        roverPhoto = curiosityImg;
    } else if (selectedRover === "perseverance") {
        roverPhoto = perseveranceImg;
    }

    const modal = <RoverPhotoModal open={modalOpen} onModalClose={onModalClose} roverPhoto={roverPhoto} />;

    if (modalOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }

    const render = () => {
        if (manifestLoadingStatus === 'loading') return <Spinner/>
        else if (manifestLoadingStatus === 'idle' && !manifest) return <ManifestSkeleton/>
        else if (manifestLoadingStatus === 'error') return <ErrorMessage/>
        else if (manifest) return <View 
                                    roverPhoto={roverPhoto} 
                                    manifest={manifest} 
                                    setModalOpen={setModalOpen} />
    }


    return (
        <>
            {modal}
            <div className="missionManifest__wrapper" >
                {render()}
            </div>
        </>
    )
}

const View = (props) => {

    const { landingDate, launchDate, maxDate, maxSol, name, status, totalPhotos } = props.manifest;

    return (
        <CSSTransition
            in={true}
            appear={true}
            key={name} 
            timeout={500}
            classNames='missionManifest'>
            <div className="missionManifest">
                <div className="missionManifest__img" onClick={() => {props.setModalOpen(true)}} >
                    <img src={props.roverPhoto} alt="" />
                </div>
                <ul className="missionManifest__list">
                    <h2>Mission manifest</h2>
                    <li>Name: {name}</li>
                    <li>Landing date: {landingDate}</li>
                    <li>Launch date: {launchDate}</li>
                    <li>Max date: {maxDate}</li>
                    <li>Max sol: {maxSol}</li>
                    <li>Status: {status}</li>
                    <li>Total photos: {totalPhotos}</li>
                </ul>
            </div>            
        </CSSTransition>
    )

}

export default MissionManifest;


