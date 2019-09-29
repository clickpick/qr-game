import React from 'react';
import { object } from 'prop-types';

import AbstractView from './AbstractView';

import Finish from 'panels/Finish';

export default class ThankYou extends AbstractView {
    static propTypes = {
        ...AbstractView.propTypes,
        user: object,
        activeProject: object,
    };

    renderPanels = () => {
        return [
            <Finish key="finish" id="finish" user={this.props.user} activeProject={this.props.activeProject} />,
        ];
    }
}