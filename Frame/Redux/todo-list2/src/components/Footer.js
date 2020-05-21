/**
 * Created by huhaibin on 2020/4/28.
 */

import React from 'react';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../redux/actions';

const Footer = ({onClick, options}) => {

    return (
        <div>
            <span>Show:</span>
            {
                options.map(option => (
                    <button
                        key={option.id}
                        name={option.filter}
                        onClick={() => onClick(option.filter)}
                        disabled={option.active}
                        style={{marginLeft: '4px'}}>
                        {option.text}
                    </button>
                ))
            }
        </div>
    )
};

let options = [
    {id: 1, text: 'ALL', filter: 'SHOW_ALL', active: true},
    {id: 2, text: 'Active', filter: 'SHOW_ACTIVE', active: false},
    {id: 3, text: 'Completed', filter: 'SHOW_COMPLETED', active: false},
];

const getOptions = (visibilityFilter) => {
    return options.map(option =>
        option.filter === visibilityFilter ? {...option, active: true} : {...option, active: false}
    );
};

const mapStateToProps = (state, ownProps) => ({
    options: getOptions(state.visibilityFilter),
});

const mapDispathToProps = (dispatch, ownProps) => ({
    onClick: (filter) => dispatch(setVisibilityFilter(filter)),
});

export default connect(mapStateToProps, mapDispathToProps)(Footer);