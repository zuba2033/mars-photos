import { useHttp } from "../hooks/http.hook";

const useNasaService = () => {

    const { loading, error, request, clearError } = useHttp();

    console.log(loading);
 
    const _apiBase = 'https://api.nasa.gov/';
    const _apiKey = 'api_key=IUkW3wtcdwNzddLKDaEgsmyHsA5HkMT1Vi1X92ZL';

    const getMissionManifest = async (rover) => {
        const res = await request(`${_apiBase}mars-photos/api/v1/manifests/${rover}/?${_apiKey}`);
        console.log(res);
        return _transformManifestData(res.photo_manifest);
    }

    const getImagesData = async (rover, sol, page = 1) => {
        const res = await request(`${_apiBase}mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&${_apiKey}`);
        console.log(res);
        return res.photos.map(_transformImagesData);
    }

    const _transformImagesData = (data) => {
        return {
            id: data.id,
            sol: data.sol,
            earthDate: data.earth_date,
            path: data.img_src,
            camera: data.camera.full_name,
            rover: data.rover.name
        }
    }

    const _transformManifestData = (data) => {
        return {
            landingDate: data.landing_date,
            launchDate: data.launch_date,
            maxDate: data.max_date,
            maxSol: data.max_sol,
            name: data.name,
            photos: data.photos,
            status: data.status,
            totalPhotos: data.total_photos
        }
    }

    return {
        loading,
        error,
        clearError,
        getImagesData,
        getMissionManifest
    }

}

export default useNasaService;