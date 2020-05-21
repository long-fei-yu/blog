/**
 * Created by huhaibin on 2020/4/28.
 */
import * as Action from '../actions';

const visibilityFilter = (status = 'SHOW_ALL', action) => {

    switch (action.type) {
        case Action.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return status
    }
};

export default visibilityFilter;