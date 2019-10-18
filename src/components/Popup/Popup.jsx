import React, { useState, useEffect } from 'react';
import { string, bool, func, shape, oneOf } from 'prop-types';
import classNames from 'classnames';

import './Popup.css';

import Dialog from './Dialog';

const Popup = ({ className, visible, onClose, dialogProps, children }) => {
    const [show, setShow] = useState(false);
    const [animationType, setAnimationType] = useState('leave');

    useEffect(() => {
        if (visible && !show) {
            setShow(true);
            setAnimationType('enter');
        } else if (show && !visible) {
            setAnimationType('leave');
        }
    }, [visible, show]);

    const style = {
        display: (show) ? '' : 'none',
    };

    function animationEnd() {
        if (animationType === 'leave') {
            setShow(false);
        }
    }

    return (
        <div
            style={style}
            className={classNames(className, 'Popup', `Popup--fade-${animationType}`)}
            tabIndex={-1}
            onClick={onClose}
            onAnimationEnd={animationEnd}>
            <div className="Popup__mask" />
            <Dialog
                className="Popup__Dialog"
                animationType={animationType}
                children={children}
                {...dialogProps} />
        </div>
    );
};

Popup.propTypes = {
    className: string,
    visible: bool,
    dialogProps: shape({
        type: oneOf(['info', 'success', 'danger']),
        title: string.isRequired,
        message: string
    }),
    onClose: func
};

export default Popup;