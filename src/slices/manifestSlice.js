import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    manifestLoadingStatus: 'idle',
    maxSol: 0
}

export const fetchManifest = createAsyncThunk(
    'manifest/fetchManifestData',
    async (rover) => {
        const { request } = useHttp();
        const apiKey = 'api_key=IUkW3wtcdwNzddLKDaEgsmyHsA5HkMT1Vi1X92ZL';
        const apiBase = 'https://api.nasa.gov/';
        const res = await request(`${apiBase}mars-photos/api/v1/manifests/${rover}/?${apiKey}`);
        const manifestData = transformManifestData(res);
        const roverName = manifestData.name.toLowerCase();
        return { manifestData, roverName };
    }
)

const transformManifestData = (data) => {
    return {
        landingDate: data.photo_manifest.landing_date,
        launchDate: data.photo_manifest.launch_date,
        maxDate: data.photo_manifest.max_date,
        maxSol: data.photo_manifest.max_sol,
        name: data.photo_manifest.name,
        photos: data.photo_manifest.photos,
        status: data.photo_manifest.status,
        totalPhotos: data.photo_manifest.total_photos
    }
}

const manifestSlice = createSlice({
    name: 'manifest',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchManifest.pending, state => {state.manifestLoadingStatus = "loading"})
            .addCase(fetchManifest.fulfilled, (state, action) => {
                state.manifestLoadingStatus = "idle";
                state[action.payload.roverName] = action.payload.manifestData;  	   
            })
            .addCase(fetchManifest.rejected, state => {state.manifestLoadingStatus = "error"})
            .addDefaultCase(()=>{})
    }
})

export const selectedSolInfoSelector = createSelector(
    state => state.form.selectedSol,
    state => state.form.selectedRover,
    state => state.manifest,
    (selectedSol,  selectedRover, manifest) => {
        const rover = manifest[selectedRover]; 
        const totalPhotosInSol = rover?.photos.filter(item => {
            return item.sol === selectedSol;
        })[0]?.total_photos || 0; 
        const earthDateOfPhoto = rover?.photos.filter(item => {
            return item.sol === selectedSol;
        })[0]?.earth_date || 0; 
        return { earthDateOfPhoto, totalPhotosInSol };
    }
)

export const submitedSolInfoSelector = createSelector(
    state => state.form.submitedSol,
    state => state.form.submitedRover,
    state => state.manifest,
    (submitedSol,  submitedRover, manifest) => {
        const rover = manifest[submitedRover]; 
        const totalPhotosInSol = rover?.photos.filter(item => {
            return item.sol === submitedSol;
        })[0]?.total_photos || 0; 
        const earthDateOfPhoto = rover?.photos.filter(item => {
            return item.sol === submitedSol;
        })[0]?.earth_date || 0; 
        return { earthDateOfPhoto, totalPhotosInSol };
    }
)

const { reducer } = manifestSlice;

export default reducer;

