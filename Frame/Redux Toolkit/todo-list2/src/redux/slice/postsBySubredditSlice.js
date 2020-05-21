/**
 * Created by huhaibin on 2020/5/20.
 */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('r/subreddit', async (subreddit, {dispatch, getState}) => {
    let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    let json = await response.json();
    let data = json.data.children.map(child => child.data);
    return data;
});

const postsBySubredditSlice = createSlice({
    name: 'postsBySubreddit',
    initialState: {},
    reducers: {
        invalidateSubreddit: (state, action) => {
            state[action.payload].didInvalidate = true;
        }
    },
    extraReducers: {
        /**
         * @param state
         * @param action
         * @returns {*}
         *
         * isFetching 显示进度条
         * didInvalidate 标记数据是否过期
         * lastUpdated 存放数据最后更新时间
         * items 列表数据
         */
        [fetchPosts.fulfilled]: (state, action) => {
            let {payload, meta} = action;
            let arg = meta.arg;

            state[arg] = state[arg] || {};
            state[arg].isFetching = false;
            state[arg].didInvalidate = false;
            state[arg].items = payload;
            state[arg].lastUpdated = Date.now();

        },
        [fetchPosts.pending]: (state, action) => {
            let arg = action.meta.arg;

            state[arg] = state[arg] || {};
            state[arg].isFetching = true;
            state[arg].didInvalidate = false;
        },
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

export const {invalidateSubreddit} = postsBySubredditSlice.actions;

export default postsBySubredditSlice.reducer;