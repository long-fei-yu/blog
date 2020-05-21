/**
 * Created by huhaibin on 2020/5/14.
 */
import {createSlice} from '@reduxjs/toolkit';

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

const filtersSlice = createSlice({
    name: 'visibilityFilter',
    initialState: VisibilityFilters.SHOW_ALL,
    reducers: {
        setVisibilityFilter: (state, action) => {
            return action.payload;
        }
    }
});

export const {setVisibilityFilter} = filtersSlice.actions;

export default filtersSlice.reducer;