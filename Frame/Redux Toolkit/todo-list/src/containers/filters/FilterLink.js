/**
 * Created by huhaibin on 2020/4/27.
 */
import React from 'react';
import {connect} from 'react-redux';
import Link from '../../components/Link';
import {setVisibilityFilter} from './filtersSlice';

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
});

const mapDispathToProps = {setVisibilityFilter};

const FilterLink = connect(
    mapStateToProps,
    mapDispathToProps,
)(Link);

export default FilterLink;