/**
 * Created by huhaibin on 2020/5/7.
 */
import {combineReducers} from 'redux';
import selectedSubredditReducer from '../slice/selectedSubredditSlice';
import postsBySubredditReducer from '../slice/postsBySubredditSlice';
import postsBySubredditDispatchSlice from '../slice/postsBySubredditDispatchSlice';

const reducers = combineReducers({
    selectedSubreddit: selectedSubredditReducer,
    //postsBySubreddit: postsBySubredditReducer,        //createAsyncThunk() 的函数参数返回的 Promise 状态来执行 Reducers
    postsBySubreddit: postsBySubredditDispatchSlice,    //createAsyncThunk() 中调用 dispatch
});

export default reducers;

/**
 * state结构
 *
 {
    selectedSubreddit: 'frontend',
    postsBySubreddit: {
        frontend: {
            isFetching: true,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [{title:''}],
        },
        reactjs: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [{title:''}],
        }
    }
}
 *
 */
