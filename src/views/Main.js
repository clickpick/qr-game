import React from 'react';
import { object } from 'prop-types';

import AbstractView from './AbstractView';

import Home from 'panels/Home';
import Finansing from 'panels/Finansing';

export default class Main extends AbstractView {
    static propTypes = {
        ...AbstractView.propTypes,
        user: object,
    };

    renderPanels = () => {
        return [
            <Home key="home" id="home" user={this.props.user} go={this.go} />,
            <Finansing key="finansing" id="finansing" goBack={this.goBack} />
        ];
    }
}