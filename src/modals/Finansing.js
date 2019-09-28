import React from 'react';
import { string, func } from 'prop-types';

import {
    ModalPage, ModalPageHeader,
    HeaderButton,
    usePlatform, ANDROID, IOS
} from '@vkontakte/vkui';
import AddProjectForm from 'components/AddProjectForm';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

const Finansing = ({ id, onClose }) => {
    const platform = usePlatform();
    const renderModalHeader = () => {
        return (
            <ModalPageHeader
                left={(platform === ANDROID) &&
                    <HeaderButton children={<Icon24Cancel />} onClick={onClose} />}
                right={
                    <HeaderButton
                        children={(platform === IOS) ? 'Отмена' : <Icon24Cancel />}
                        onClick={onClose} />
                }
                children="Подключение проекта" />
        );
    }

    return (
        <ModalPage id={id} header={renderModalHeader()} onClose={onClose}>
            <AddProjectForm />
        </ModalPage>
    );
};

Finansing.propTypes = {
    id: string.isRequired,
    onClose: func.isRequired
};

export default Finansing;