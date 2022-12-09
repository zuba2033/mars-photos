import { configureStore } from '@reduxjs/toolkit';
import manifest from '../slices/manifestSlice';
import form from '../slices/formSlice';
import images from '../slices/imageGallerySlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};


const store = configureStore({
    reducer: {manifest, form, images},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production"
})

export default store;