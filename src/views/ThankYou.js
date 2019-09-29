import React from 'react';
import { object } from 'prop-types';

import AbstractView from './AbstractView';

import Finish from 'panels/Finish';

export default class ThankYou extends AbstractView {
    static propTypes = {
        ...AbstractView.propTypes,
        activeProject: object,
    };

    renderPanels = () => {
        return [
            <Finish key="finish" id="finish" activeProject={this.props.activeProject} />,
        ];
    }
}