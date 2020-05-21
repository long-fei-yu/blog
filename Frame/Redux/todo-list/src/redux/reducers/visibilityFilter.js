/**
 * Created by huhaibin on 2020/4/26.
 */
const visibilityFilter = (status = 'SHOW_ALL', action) => {

    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return status
    }
};

export default visibilityFilter;