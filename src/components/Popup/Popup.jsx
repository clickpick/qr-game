import React, { useState, useEffect } from 'react';
import { string, bool, func, oneOf, arrayOf, shape } from 'prop-types';
import classNames from 'classnames';

import './Popup.css';

import Dialog from './Dialog';

const Popup = ({ className, visible, disabled, onClose, isHeaderPadding, type, imageType, title, message, children, actions }) => {
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

    function close() {
        if (!disabled && onClose) {
            onClose();
        }
    }

    return (
        <div
            style={style}
            className={classNames(className, 'Popup', `Popup--fade-${animationType}`)}
            tabIndex={-1}
            onClick={close}
            onAnimationEnd={animationEnd}>
            <div className="Popup__mask" />
            <Dialog
                className="Popup__Dialog"
                visible={show}
                isHeaderPadding={isHeaderPadding}
                onClose={close}
                animationType={animationType}
                type={type}
                imageType={imageType}
                title={title}
                message={message}
                children={children}
                actions={actions} />
        </div>
    );
};

Popup.propTypes = {
    className: string,
    visible: bool,
    disabled: bool,
    isHeaderPadding: bool,
    type: oneOf(['info', 'success', 'danger']),
    imageType: oneOf(['loading', 'success', 'error', 'rules', 'info', 'leopard', 'connect', 'cheat']),
    title: string.isRequired,
    message: string,
    onClose: func,
    actions: arrayOf(shape({
        theme: oneOf(['primary', 'secondary', 'info']),
        title: string,
        action: func,
        full: bool
    }))
};

export default Popup;