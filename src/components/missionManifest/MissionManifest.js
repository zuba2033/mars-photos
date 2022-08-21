import './missionManifest.scss';

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
    const content = !loading && manifestData ? <View data={manifestData}/> : null

    return (
        <>
            {skeleton}
            {spinner}
            {content}
        </>
    )

}

const View = ({data}) => {

    const { landingDate, launchDate, maxDate, maxSol, name, status, totalPhotos } = data;

    return (
        <div className="missionInfo">
        <div className="missionInfo__img"><img src="https://wikiimg.tojsiabtv.com/wikipedia/commons/thumb/3/31/PIA22960-MarsCuriosityRover-SelfPortrait-RockHall-VeraRubinRidge-20190115.jpg/1280px-PIA22960-MarsCuriosityRover-SelfPortrait-RockHall-VeraRubinRidge-20190115.jpg" alt="" /></div>
        <ul className="missionInfo__list">
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