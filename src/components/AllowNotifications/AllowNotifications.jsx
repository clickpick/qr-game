import React from 'react';
import { string, func } from 'prop-types';
import classNames from 'classnames';

import './AllowNotifications.css';

import Button from 'components/Button';

import persik from 'images/cheat.png';

const AllowNotifications = ({ className, enable }) =>
    <div className={classNames(className, 'AllowNotifications')}>
        <img className="AllowNotifications__persik" src={persik} alt="Персик" />
        <div className="AllowNotifications__container">
            <div className="AllowNotifications__container">
                <h4 className="AllowNotifications__title" children="Хочешь ещё игр?" />
                <p
                    className="AllowNotifications__message"
                    children="Включи уведомления, и мы оповестим о начале следующей игры" />
                <Button
                    className="AllowNotifications__Button"
                    theme="primary"
                    children="Включить уведомления"
                    onClick={enable} />
            </div>
        </div>
    </div>;

AllowNotifications.propTypes = {
    className: string,
    enable: func,
};

export default AllowNotifications;