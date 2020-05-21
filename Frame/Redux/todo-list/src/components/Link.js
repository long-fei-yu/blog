/**
 * Created by huhaibin on 2020/4/27.
 */

import React from 'react';
import PropTypes from 'prop-types';

const Link = ({active, children, onClick}) => (
    <button
        onClick={onClick}
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
    onClick: PropTypes.func.isRequired,
};

export default Link;