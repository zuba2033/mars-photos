import './missionManifest.scss';

import curiosityImg from '../../images/curiosity.webp';
import spiritAndOpportunityImg from '../../images/opportunity.jpg';

import { useState, useEffect } from 'react';

import useNasaService from '../../services/useNasaService';
import ManifestSkeleton from '../manifestSkeleton/ManifestSkeleton';
import Spinner from '../spinner/Spinner';

const MissionManifest = (props) => {

    const [manifestData, setManifestData] = useState(null);

    const { loading, getMissionManifest, clearError} = useNasaService();

    const onManifestDataLoaded = (data) => {
        setManifestData(data);
    }

    const onRequestManifest = (rover) => {
        clearError();
        getMissionManifest(rover)
            .then(onManifestDataLoaded);
    }

    useEffect(() => {
        if (!props.clickedRover) return;
        onRequestManifest(props.clickedRover)
    }, [props.clickedRover])

    useEffect(() => {
        if(!manifestData) return;
        const {maxSol} = manifestData;
        props.getMaxSol(maxSol);
    }, [manifestData]);

    const skeleton = manifestData || loading ? null : <ManifestSkeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const content = !loading && manifestData ? <View data={manifestData} clickedRover={props.clickedRover}/> : null;
    const wrapStyles = loading ? {"display" : "flex", "height": "250px", "justifyContent": "center", "alignItems": "center"} : null;

    return (
        <div className="missionManifest__wrapper" style={wrapStyles}>
            {skeleton}
            {spinner}
            {content}
        </div>
    )

}

const View = ({data}, clickedRover) => {

    const { landingDate, launchDate, maxDate, maxSol, name, status, totalPhotos } = data;
    console.log(clickedRover);
    let roverPhoto;
    if (clickedRover === 'spirit' || clickedRover === "opportunity") {
        roverPhoto = spiritAndOpportunityImg;
    } else if (clickedRover === 'curiosity') {
        roverPhoto = curiosityImg;
    } else if (clickedRover === "perseverance") {
        roverPhoto = spiritAndOpportunityImg;
    }
    console.log(roverPhoto);

    return (
        <div className="missionManifest">
        <div className="missionManifest__img"><img src={roverPhoto} alt="" /></div>
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
    )

}

export default MissionManifest;