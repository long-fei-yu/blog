/**
 * Created by huhaibin on 2020/4/27.
 */

import React from 'react';
import PropTypes from 'prop-types';

const Link = ({active, children, setVisibilityFilter, filter}) => (
    <button
        onClick={() => setVisibilityFilter(filter)}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}>
        {children}
    </button>
);

Link.protoTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    setVisibilityFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default Link;