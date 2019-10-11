import React from 'react';
import { string, shape, func } from 'prop-types';

import './ErrorCard.css';

import { ModalCard } from '@vkontakte/vkui';
import Button from 'components/Button';

import Icon56WifiOutline from '@vkontakte/icons/dist/56/wifi_outline';

const ErrorCard = ({ id, title, caption, action, close }) =>
    <ModalCard
        id={id}
        onClose={close}
        icon={<Icon56WifiOutline />}
        title={title}
        caption={caption}
        children={(action) &&
            <Button
                className="ErrorCard__action"
                size="medium"
                theme="primary"
                full
                children={action.title}
                onClick={action.action} />} />;

ErrorCard.propTypes = {
    id: string.isRequired,
    title: string,
    caption: string,
    action: shape({
        title: string.isRequired,
        action: func
    }),
    close: func.isRequired
};

export default ErrorCard;