import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const imagesAdapter = createEntityAdapter();

const initialState = imagesAdapter.getInitialState({
    imagesLoadingStatus: 'idle',
    page: 1
})

export const fetchImages = createAsyncThunk(
    'images/fetchImages',
    async (params) => {
        const { submitedRover, submitedSol, page } = params;
        const { request } = useHttp();
        const apiKey = 'api_key=IUkW3wtcdwNzddLKDaEgsmyHsA5HkMT1Vi1X92ZL';
        const apiBase = 'https://api.nasa.gov/';
        const res = await request(`${apiBase}mars-photos/api/v1/rovers/${submitedRover}/photos?sol=${submitedSol}&page=${page}&${apiKey}`);
        return res.photos.map(transformImagesData);
    }
)

const transformImagesData = (image) => {
    return {
        id: image.id,
        sol: image.sol,
        earthDate: image.earth_date,
        path: image.img_src,
        camera: image.camera.full_name,
        rover: image.rover.name
    }
}

const imageGallerySlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        pageReset: (state) => { state.page = 1}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImages.pending, state => {state.imagesLoadingStatus = "loading"})
            .addCase(fetchImages.fulfilled, (state, action) => {
                if (state.page === 1) {
                    imagesAdapter.setAll(state, action.payload);
                } else {
                    imagesAdapter.addMany(state, action.payload);
                }
                state.page += 1;  
                state.imagesLoadingStatus = "idle";
            })
            .addCase(fetchImages.rejected, state => {state.imagesLoadingStatus = "error"})
            .addDefaultCase(()=>{})
    }
})

const { actions, reducer } = imageGallerySlice;

export const { selectAll } = imagesAdapter.getSelectors(state => state.images);

export const { pageReset } = actions;

export default reducer;

