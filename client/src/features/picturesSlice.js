import { createSlice } from '@reduxjs/toolkit';

export const picturesSlice = createSlice({
    name: 'pictures',
    initialState: {
        pictures: null,
    },
    reducers: {
        setPicturesData: (state, { payload }) => {
            state.pictures = payload;
        },
    }
});
export const { setPicturesData } = picturesSlice.actions;
export default picturesSlice.reducer;