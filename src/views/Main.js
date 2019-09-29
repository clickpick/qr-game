import React from 'react';
import { object, string, array, func } from 'prop-types';

import AbstractView from './AbstractView';

import Home from 'panels/Home';

import Finansing from 'modals/Finansing';

export default class Main extends AbstractView {
    static propTypes = {
        ...AbstractView.propTypes,
        user: object,
        activeProject: object,
        userProjectKey: string,
        activatedProjectKeys: array,
        notificationProps: object,
        qrCodeRef: object,
        shareStory: func,
    };

    renderPanels = () => {
        return [
            <Home
                key="home"
                id="home"
                user={this.props.user}
                activeProject={this.props.activeProject}
                userProjectKey={this.props.userProjectKey}
                activatedProjectKeys={this.props.activatedProjectKeys}
                openFinansingModal={this.openFinansingModal}
                notificationProps={this.props.notificationProps}
                qrCodeRef={this.props.qrCodeRef}
                shareStory={this.props.shareStory} />,
        ];
    }

    renderModals = () => {
        return [
            <Finansing key="finansing" id="finansing" onClose={this.modalBack} />,
        ];
    }

    openFinansingModal = () => {
        this.setActiveModal('finansing');
    }
}