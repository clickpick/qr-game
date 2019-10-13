import React from 'react';
import { string, oneOf, oneOfType, node, arrayOf, object } from 'prop-types';
import classNames from 'classnames';

import success from 'images/success.png';
import info from 'images/info.png';
import error from 'images/error.png';
import rules from 'images/rules.png';

import Loader from 'components/Loader';
import Button from 'components/Button';

import './Notification.css';

const Notification = ({ className, status, title, message, close, actions }) => {
    function getImage() {
        // eslint-disable-next-line default-case
        switch (status) {
            case 'loading':
                return <Loader className="Notification__loader" />;
            case 'success':
                return <img className="Notification__image" src={success} alt={status} />;
            case 'error':
                return <img className="Notification__image" src={error} alt={status} />;
            case 'info':
                return <img className="Notification__image" src={info} alt={status} />;
            case 'rules':
                return <img className="Notification__image" src={rules} alt={status} />;
        }
    };

    function onClose() {
        if (status !== 'loading' && close) {
            close();
        }
    }

    function buttons() {
        if (actions && actions.length > 0) {
            return <div className="Notification_actions" children={actions.map(renderButton)} />;
        }
    }

    function renderButton({ title, type, action}, index) {
        return <Button
            key={index}
            size="medium"
            children={title}
            theme={type}
            onClick={action} />
    }

    return (
        <div className={classNames(className, ' Notification')} onClick={onClose}>
            <div className="Notification__status" children={getImage()} />
            
            <h4
                className={classNames('Notification__title', `Notification__title--${status}`)}
                children={title} />

            <p className="Notification__message" children={message} />

            {buttons()}
        </div>
    );
};

Notification.propTypes = {
    status: oneOf(['loading', 'success', 'error', 'info', 'rules']),
    title: string,
    message: oneOfType([node, string]),
    actions: arrayOf(object)
};

export default Notification;