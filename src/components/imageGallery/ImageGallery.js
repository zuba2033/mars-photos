import './imageGallery.scss';
import abyss from '../../images/abyss.jpg'

import { useEffect, useState } from 'react';

import useNasaService from '../../services/useNasaService';

const ImageGallery = (props) => {

    const {loading, error, getImagesData, clearError} = useNasaService();

    const [imagesData, setImagesData] = useState(null);

    const onImagesDataLoaded = (data) => {
        setImagesData(data);
    }

    const onRequestImages = (rover) => {
        clearError();
        if (!rover) return;
        getImagesData(rover)
            .then(onImagesDataLoaded);
    }

    useEffect(() => {
        onRequestImages(props.selectedRover);
        // eslint-disable-next-line
    }, [props.selectedRover])


    function renderItemList(arr) {
        const itemList = arr.map((item, i) => {
            return (
                <li className="imageGallery__card"
                     key={item.id}
                     >
                    <img src={item.path} alt="photo from mars" />
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
            <ul className="imageGallery">
                {itemList}
            </ul>
        )
    }

    const items = imagesData ? renderItemList(imagesData) : null;

    return (
        <section>{items}</section>
    )
}

export default ImageGallery;