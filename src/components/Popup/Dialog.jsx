import React from 'react';
import { string, oneOf } from 'prop-types';
import classNames from 'classnames';

import './Dialog.css';

const Dialog = ({ className, animationType, type, title, message, children }) => {
    function handleClick(e) {
        e.stopPropagation();
    }

    return (
        <div
            className={classNames(
                className,
                'Dialog',
                `Dialog--${type}`,
                `Dialog--slide-down-${animationType}`
            )}
            onClick={handleClick}
        >
            <h3 className="Dialog__title" children={title} />
            {message && <p className="Dialog__message" children={message} />}
            {children}
        </div>
    );
};

Dialog.propTypes = {
    className: string,
    animationType: oneOf(['enter', 'leave']).isRequired,
    type: oneOf(['info', 'success', 'danger']),
    title: string.isRequired,
    message: string
};

Dialog.defaultProps = {
    type: 'info',
};

export default Dialog;