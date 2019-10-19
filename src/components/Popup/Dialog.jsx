import React from 'react';
import { string, oneOf, arrayOf, shape, bool, func  } from 'prop-types';
import classNames from 'classnames';

import './Dialog.css';

import Loader from 'components/Loader';
import Button from 'components/Button';

import success from 'images/success.png';
import info from 'images/info.png';
import error from 'images/error.png';
import rules from 'images/rules.png';

const Dialog = ({ className, animationType, type, imageType, title, message, children, actions }) => {
    function handleClick(e) {
        e.stopPropagation();
    }

    function getImage() {
        switch (imageType) {
            case 'loading':
                return <div className="Dialog__status"><Loader className="Dialog__loader" /></div>
            case 'success':
                return <div className="Dialog__status"><img className="Dialog__image" src={success} alt="" /></div>;
            case 'info':
                return <div className="Dialog__status"><img className="Dialog__image" src={info} alt="" /></div>;
            case 'error':
                return <div className="Dialog__status"><img className="Dialog__image" src={error} alt="" /></div>;
            case 'rules':
                return <div className="Dialog__status"><img className="Dialog__image" src={rules} alt="" /></div>;
            default:
                return null;
        }
    }

    function renderAction(action, index) {
        return <Button
            key={index}
            className="Dialog__action"
            theme={action.theme}
            size="medium"
            children={action.title}
            full={action.full}
            onClick={action.action} />;
    }

    return (
        <div
            className={classNames(
                className,
                'Dialog',
                `Dialog--${type}`,
                `Dialog--slide-down-${animationType}`
            )}
            onClick={handleClick}>
            {getImage()}
            <h3 className="Dialog__title" children={title} />
            {message && <p className="Dialog__message" children={message} />}
            {children}

            {(Array.isArray(actions) && actions.length > 0) &&
                <div className="Dialog__actions" children={actions.map(renderAction)} />}
        </div>
    );
};

Dialog.propTypes = {
    className: string,
    animationType: oneOf(['enter', 'leave']).isRequired,
    type: oneOf(['info', 'success', 'danger']),
    imageType: oneOf(['loading', 'success', 'error', 'rules', 'info']),
    title: string.isRequired,
    message: string,
    actions: arrayOf(shape({
        theme: oneOf(['primary', 'secondary', 'info']),
        title: string,
        action: func,
        full: bool
    }))
};

Dialog.defaultProps = {
    type: 'info',
};

export default Dialog;