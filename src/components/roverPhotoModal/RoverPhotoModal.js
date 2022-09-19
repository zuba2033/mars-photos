import './roverPhotoModal.scss';

import { CSSTransition } from 'react-transition-group';

const RoverPhotoModal = (props) => {

    const duration = 500;

    return (
        <CSSTransition in={props.open} 
                       classNames="roverPhotoModal"
                       unmountOnExit
                       timeout={duration} >
            <div className="roverPhotoModal" onClick={(e) => {
                if (!e.target.classList.contains('roverPhotoModal__img')) {
                    props.onModalClose();
                };
            }}>
                <div className="roverPhotoModal__img">
                    <img src={props.roverPhoto} alt="rover" />
                    <div className="roverPhotoModal__close" onClick={props.onModalClose}>X</div>
                </div>
            </div>
        </CSSTransition>
    )
}

export default RoverPhotoModal;