import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import { ReactComponent as WaveSvg } from 'svg/wave.svg';

import './Wave.css';

const Wave = ({ className }) =>
    <div className={classNames(className, 'Wave')}>
        <WaveSvg className="Wave__item Wave__item--1" />
        <WaveSvg className="Wave__item Wave__item--2" />
        <WaveSvg className="Wave__item Wave__item--3" />
    </div>;

Wave.propTypes = {
    className: string,
};

export default Wave;
