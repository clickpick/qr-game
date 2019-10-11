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

const RequestFunding = ({ id, close, onSubmit }) => {
    const renderModalHeader = () => {
        return (
            <ModalPageHeader
                left={(osname === ANDROID) &&
                    <HeaderButton children={<Icon24Cancel />} onClick={close} />}
                right={(osname === IOS) &&
                    <HeaderButton children="Отмена" onClick={close} />}
                children="Подключение проекта" />
        );
    }

    return (
        <ModalPage id={id} header={renderModalHeader()} onClose={close}>
            <RequestFundingForm onSubmit={onSubmit} />
        </ModalPage>
    );
};

RequestFunding.propTypes = {
    id: string.isRequired,
    close: func.isRequired
};

export default RequestFunding;