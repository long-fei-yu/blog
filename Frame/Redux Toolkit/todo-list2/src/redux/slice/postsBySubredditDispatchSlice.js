/**
 * Created by huhaibin on 2020/5/20.
 */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('r/subreddit', async (subreddit, {dispatch, getState}) => {
    dispatch(requestPosts(subreddit));
    let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    let json = await response.json();
    let data = json.data.children.map(child => child.data);
    dispatch(receivePosts(subreddit, data));
});

const postsBySubredditDispatchSlice = createSlice({
    name: 'postsBySubreddit',
    initialState: {},
    reducers: {
        invalidateSubreddit: (state, action) => {
            state[action.payload].didInvalidate = true;
        },
        requestPosts: (state, action) => {
            let {payload} = action;
            state[payload] = state[payload] || {};
            state[payload].isFetching = true;
            state[payload].didInvalidate = false;
        },
        receivePosts: {
            reducer(state, action){
                let {payload} = action;
                let {subreddit, data} = payload;

                state[subreddit] = state[subreddit] || {};
                state[subreddit].isFetching = false;
                state[subreddit].didInvalidate = false;
                state[subreddit].items = data;
                state[subreddit].lastUpdated = Date.now();
            },
            prepare(subreddit, data){
                return {payload: {subreddit, data}}
            }
        }
    },
});

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit];

    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
        return dispatch(fetchPosts(subreddit));
    }
};

export const {invalidateSubreddit, requestPosts, receivePosts} = postsBySubredditDispatchSlice.actions;

export default postsBySubredditDispatchSlice.reducer;