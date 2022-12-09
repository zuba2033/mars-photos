import './imageGallery.scss';
import store from '../../store';

import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';

import { selectAll, fetchImages } from '../../slices/imageGallerySlice';
import { submitedSolInfoSelector } from '../../slices/manifestSlice';

import ImageGallerySkeleton from '../imageGallerySkeleton/ImageGallerySkeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SliderModal from '../sliderModal/SliderModal';

const ImageGallery = () => {

    const [itemIndex, setItemIndex] = useState(0);
    const [sliderOpen, setSliderOpen] = useState(false);

    const dispatch = useDispatch();

    const { submitedSol, submitedRover } = useSelector(state => state.form);
    const { totalPhotosInSol } = useSelector(submitedSolInfoSelector);
    const { imagesLoadingStatus, page } = useSelector(state => state.images);
    const images = selectAll(store.getState());

    useEffect(() => {
        if (!submitedSol || !submitedRover || page > 1) return;
        dispatch(fetchImages({submitedSol, submitedRover, page: 1}));
        // eslint-disable-next-line
    }, [submitedSol, submitedRover]);

    const onSliderClosed = () => {
        setSliderOpen(false);
        setTimeout(() => {
            setItemIndex(0);
        }, 1000);
    }

    if (sliderOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }

    const transitionDuration = 1000;

    function renderItemList(arr) {
        const itemList = arr.map((item, i) => {
            return (
                <CSSTransition
                    key={item.id} 
                    timeout={transitionDuration}
                    classNames='imageGallery__card'>
                    <li className="imageGallery__card"
                        onClick={() => {
                            setItemIndex(i);
                            setSliderOpen(true);
                        }}>
                        <img src={item.path} alt="img from mars"/>
                        <div className="imageGallery__descr">
                            <ul>
                                <li>Rover: {item.rover}</li>
                                <li>Earth_date: {item.earthDate}</li>
                                <li>Sol: {item.sol}</li>
                                <li>{item.camera}</li>
                            </ul>
                        </div>
                    </li>    
                </CSSTransition> 
            )
        })
        return (
            <ul className="imageGallery__list">
                <TransitionGroup component={null}>
                    {itemList}
                </TransitionGroup>
            </ul>
        )
    }

    const counter = images.length === 0 ? null : 
        <h2 className="imageGallery__title">
            {imagesLoadingStatus === 'loading' ? "Loading..." : `Showed ${images.length} photos of ${totalPhotosInSol}`}
        </h2>

    const button = totalPhotosInSol === images.length ? null : 
        <button 
            onClick={() => {
                dispatch(fetchImages({submitedRover, submitedSol, page}));
            }}
            disabled={imagesLoadingStatus === 'loading'}
            className="imageGallery__btn">{imagesLoadingStatus === 'loading'  ? "Loading..." : "Load next page" }
        </button>    

    const slider = <SliderModal 
                    open={sliderOpen} 
                    items={images} 
                    slideIndex={itemIndex} 
                    onSliderClosed={onSliderClosed} />

    const wrapStyles = images.length === 0 && imagesLoadingStatus === 'loading' ? {"padding": "50px"} : null;

    const render = () => {
        if (imagesLoadingStatus === 'idle' && images.length === 0) return <ImageGallerySkeleton/>
        else if (imagesLoadingStatus === 'loading' && images.length === 0 ) return <Spinner/>
        else if (imagesLoadingStatus === 'error') return <ErrorMessage/>
        else if (images.length > 0) return renderItemList(images)
    }

    return (
        <section className="imageGallery" style={wrapStyles}>
            {counter}
            {render()}
            {button}
            {slider}
        </section>
    )
}

export default ImageGallery;