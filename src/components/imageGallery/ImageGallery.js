import './imageGallery.scss';

import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useNasaService from '../../services/useNasaService';
import ImageGallerySkeleton from '../imageGallerySkeleton/ImageGallerySkeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SliderModal from '../sliderModal/SliderModal';

const ImageGallery = (props) => {

    const {loading, getImagesData, clearError, error} = useNasaService();

    const [imagesData, setImagesData] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [firstLoading, setFirstLoading] = useState(true);
    const [imagesDataLoaded, setImagesDataLoaded] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);
    const [sliderOpen, setSliderOpen] = useState(false);

    const transitionDuration = 1000;

    const onImagesDataLoaded = (newData) => {
        setImagesData(data => [...data, ...newData]);
        setNextPage(page => page + 1);
        setFirstLoading(false);
        setImagesDataLoaded(true);
    }

    const onRequestImages = (rover, sol, page) => {
        clearError();
        if (!rover || !sol) return;
        getImagesData(rover, sol, page)
            .then(onImagesDataLoaded);
    }

    const onSliderClosed = () => {
        setSliderOpen(false);
    }

    useEffect(() => {
        onRequestImages(props.selectedRover, props.selectedSol, nextPage);
        // eslint-disable-next-line
    }, [props.selectedRover, props.selectedSol])

    if (sliderOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "visible";
    }


    function renderItemList(arr) {
        const itemList = arr.map((item, i) => {
            return (
                <CSSTransition
                    key={item.id} 
                    in={imagesDataLoaded}
                    timeout={transitionDuration}
                    classNames='imageGallery__card'>
                    <li className="imageGallery__card"
                        onClick={() => {
                            setSliderOpen(true);
                            setItemIndex(i);
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

    const spinner = loading && firstLoading ? <Spinner/> : null;
    const skeleton = imagesData.length === 0 && firstLoading && !loading && !error ? <ImageGallerySkeleton/> : null;
    const items = renderItemList(imagesData);
    const errorMessage = error ? <ErrorMessage/> : null;
    const counter = imagesData.length === 0 || error ? null : 
    <h2 className="imageGallery__title">
        Showed {loading ? "..." : imagesData.length} photos of {props.totalPhotosInSol}
    </h2>
    const button = props.totalPhotosInSol === imagesData.length ? null : 
    <button 
        onClick={() => onRequestImages(props.selectedRover, props.selectedSol, nextPage)} 
        disabled={loading}
        className="imageGallery__btn">{loading  ? "Loading..." : "Load next page" }
    </button>    

    const slider = <SliderModal 
                    open={sliderOpen} 
                    items={imagesData} 
                    slideIndex={itemIndex} 
                    onSliderClosed={onSliderClosed} />

    const wrapStyles = firstLoading && loading ? {"padding": "50px"} : null;

    return (
        <section className="imageGallery" style={wrapStyles}>
            {counter}
            {spinner}
            {skeleton}
            {imagesData.length === 0 && !firstLoading ? 
                <h2 className="imageGallery__title">There is no photo for this sol</h2> : 
                items
            }
            {button}
            {errorMessage}
            {slider}
        </section>
    )
}

export default ImageGallery;