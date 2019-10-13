import React, { useState, useEffect, } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import './NotificationContainer.css';

const notificationsRoot = document.getElementById('notifications');

export default function NotificationContainer({ children }) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(undefined);

    useEffect(() => {
        if (children && !show) {
            setContent(children);
            setShow(true);
        }

        if (show && !children) {
            setShow(false);
            setTimeout(() => setContent(undefined), 300);
        }
    }, [children, show]);

    const container = (
        <div className={classNames('NotificationContainer', {
            'NotificationContainer--show': show,
            'NotificationContainer--hide': !show
        })}>
            <div className="NotificationContainer__content">
                {content}
            </div>
        </div>
    );

    return createPortal(container, notificationsRoot);
};