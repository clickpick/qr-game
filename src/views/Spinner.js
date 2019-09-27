import React from 'react';
import { string } from 'prop-types';

import { View } from '@vkontakte/vkui';

import SpinnerPanel from 'panels/Spinner';

const Spinner = ({ id }) =>
    <View id={id} activePanel="spinner">
        <SpinnerPanel id="spinner" />
    </View>;

Spinner.propTypes = {
    id: string.isRequired
};

export default Spinner;