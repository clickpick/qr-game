import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import './Loader.css';

const Loader = ({ className }) =>
    <div className={classNames(className, 'Loader')}>
        <div />
        <div />
        <div />
        <div />
    </div>;

Loader.propTypes = {
    className: string, // дополнительный класс
};

export default Loader;