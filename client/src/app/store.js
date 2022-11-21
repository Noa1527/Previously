import {configureStore} from '@reduxjs/toolkit';
import episodeReducer from '../features/episodeSlice';
import picturesReducer from '../features/picturesSlice';

export default configureStore({
    reducer: {
        // add reducer here
        episode: episodeReducer,
        pictures: picturesReducer,
    },
});