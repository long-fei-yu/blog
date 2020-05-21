/**
 * Created by huhaibin on 2020/5/20.
 */
import {createSlice} from '@reduxjs/toolkit';

const selectedSubredditSlice = createSlice({
    name: 'selectedSubreddit',
    initialState: 'reactjs',
    reducers: {
        selectSubreddit: (state, action) => {
            return action.payload;
        }
    }
});

export const {selectSubreddit} = selectedSubredditSlice.actions;

export default selectedSubredditSlice.reducer;