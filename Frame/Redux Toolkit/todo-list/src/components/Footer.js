/**
 * Created by huhaibin on 2020/4/27.
 */

import React from 'react';
import FilterLink from '../containers/filters/FilterLink';

const Footer = () => (
    <div>
        <span>Show:</span>
        <FilterLink filter='SHOW_ALL'>ALL</FilterLink>
        <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </div>
);

export default Footer;