import { createSlice } from '@reduxjs/toolkit';

export const episodeSlice = createSlice({
    name: 'categories',
    initialState: {
        episode: null,
    },
    reducers: {
        setEpisodeData: (state, { payload }) => {
            state.episode = payload;
        },
    }
});
export const { setEpisodeData } = episodeSlice.actions;
export default episodeSlice.reducer;