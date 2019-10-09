import React from 'react';
import { string, func } from 'prop-types';

import {
    ModalPage, ModalPageHeader,
    HeaderButton,
    platform, ANDROID, IOS
} from '@vkontakte/vkui';
import RequestFundingForm from 'components/RequestFundingForm';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

const osname = platform();

const RequestFunding = ({ id, onClose, onSubmit }) => {
    const renderModalHeader = () => {
        return (
            <ModalPageHeader
                left={(osname === ANDROID) &&
                    <HeaderButton children={<Icon24Cancel />} onClick={onClose} />}
                right={(osname === IOS) &&
                    <HeaderButton children="Отмена" onClick={onClose} />}
                children="Подключение проекта" />
        );
    }

    return (
        <ModalPage id={id} header={renderModalHeader()} onClose={onClose}>
            <RequestFundingForm onSubmit={onSubmit} />
        </ModalPage>
    );
};

RequestFunding.propTypes = {
    id: string.isRequired,
    onClose: func.isRequired
};

export default RequestFunding;