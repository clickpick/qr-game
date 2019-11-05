import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import './Footer.css';

const Footer = ({ className }) =>
    <footer className={classNames(className, 'Footer')}>

    </footer>;

Footer.propTypes = {
    className: string,
};

export default Footer;