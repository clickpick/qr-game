import React from 'react';
import { string, func } from 'prop-types';
import classNames from 'classnames';

import Notification from 'components/Notification';
import Button from 'components/Button';

import './AllowNotification.css';

const AllowNotification = ({ className, allow }) => {
    return (
        <Notification
            className={classNames(className, 'AllowNotification')}
            show={true}
            status="info"
            title="Хочешь ещё QR-флэшмобов?"
            message="Включи уведомления, мы оповестим о начале следующего флэшмоба">
            <Button
                className="AllowNotification__Button"
                children="Включить уведомления"
                theme="primary"
                onClick={allow} />
        </Notification>
    );
};

AllowNotification.propTypes = {
    className: string,
    allow: func,
};

export default AllowNotification;