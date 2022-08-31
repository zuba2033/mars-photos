import './roverPhotoModal.scss';

import { CSSTransition } from 'react-transition-group';

const RoverPhotoModal = (props) => {

    const duration = 1000;

    return (
        <CSSTransition in={props.open} 
                       classNames="roverPhotoModal"
                       unmountOnExit
                       timeout={duration} >
            <div className="roverPhotoModal">
                <div className="roverPhotoModal__img">
                    <img src={props.roverPhoto} alt="rover" />
                    <div className="roverPhotoModal__close" onClick={props.onModalClose}>X</div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default RoverPhotoModal;