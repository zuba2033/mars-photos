import './imageGallery.scss';

import { useEffect, useState } from 'react';

import useNasaService from '../../services/useNasaService';
import ImageGallerySkeleton from '../imageGallerySkeleton/ImageGallerySkeleton';
import Spinner from '../spinner/Spinner';

const ImageGallery = (props) => {

    const {loading, getImagesData, clearError} = useNasaService();

    const [imagesData, setImagesData] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [firstLoading, setFirstLoading] = useState(true);

    const onImagesDataLoaded = (newData) => {
        setImagesData(data => [...data, ...newData]);
        setNextPage(page => page + 1);
        setFirstLoading(false);
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
                <li className="imageGallery__card"
                     key={item.id}
                     >
                    <img src={item.path} alt="img from mars" />
                    <div className="imageGallery__descr">
                        <ul>
                            <li>Rover: {item.rover}</li>
                            <li>Earth_date: {item.earthDate}</li>
                            <li>Sol: {item.sol}</li>
                            <li>{item.camera}</li>
                        </ul>
                    </div>
                </li>
            )
        })
        return (
            <div className="imageGallery__wrap">
                {arr.length === 0 ? 
                <h2 className="imageGallery__title">There is no photo for this sol</h2> : 
                <ul className="imageGallery">
                    {itemList}
                </ul>}
                <button 
                    onClick={() => onRequestImages(props.selectedRover, props.selectedSol, nextPage)} 
                    disabled={loading}
                    className="imageGallery__btn">{loading  ? "Loading..." : "Load next page" }</button>    
            </div>
        )
    }

    const spinner = loading ? <Spinner/> : null;
    const skeleton = imagesData.length === 0 && firstLoading && !loading ? <ImageGallerySkeleton/> : null;
    const items = imagesData && !firstLoading ? renderItemList(imagesData) : null;
    const wrapStyles = firstLoading && loading ? {"padding": "50px"} : null;

    return (
        <section style={wrapStyles}>
            {firstLoading ? spinner : null}
            {skeleton}
            {items}
        </section>
    )
}

export default ImageGallery;