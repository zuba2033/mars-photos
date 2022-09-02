import './imageGallery.scss';

import { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useNasaService from '../../services/useNasaService';
import ImageGallerySkeleton from '../imageGallerySkeleton/ImageGallerySkeleton';
import Spinner from '../spinner/Spinner';

const ImageGallery = (props) => {

    const {loading, getImagesData, clearError} = useNasaService();

    const [imagesData, setImagesData] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [firstLoading, setFirstLoading] = useState(true);
    const [imagesDataLoaded, setImagesDataLoaded] = useState(false);

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

    useEffect(() => {
        onRequestImages(props.selectedRover, props.selectedSol, nextPage);
        // eslint-disable-next-line
    }, [props.selectedRover, props.selectedSol])


    function renderItemList(arr) {
        const itemList = arr.map(item => {
            return (
                <CSSTransition
                    key={item.id} 
                    in={imagesDataLoaded}
                    timeout={transitionDuration}
                    classNames='imageGallery__card'>
                    <li className="imageGallery__card">
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
    const skeleton = imagesData.length === 0 && firstLoading && !loading ? <ImageGallerySkeleton/> : null;
    const items = renderItemList(imagesData);
    const button = props.totalPhotosInSol === imagesData.length ? null : 
    <button 
        onClick={() => onRequestImages(props.selectedRover, props.selectedSol, nextPage)} 
        disabled={loading}
        className="imageGallery__btn">{loading  ? "Loading..." : "Load next page" }
    </button>    

    const wrapStyles = firstLoading && loading ? {"padding": "50px"} : null;

    return (
        <section className="imageGallery" style={wrapStyles}>
            {spinner}
            {skeleton}
            {imagesData.length === 0 && !firstLoading ? 
                <h2 className="imageGallery__title">There is no photo for this sol</h2> : 
                items
            }
            {button}
           
        </section>
    )
}

export default ImageGallery;