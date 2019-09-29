import React from 'react';
import { object, string, array, func } from 'prop-types';

import AbstractView from './AbstractView';

import Home from 'panels/Home';

import RequestFunding from 'modals/RequestFunding';

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
        sendRequestFunding: func,
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
                openAddProjectModal={this.openAddProjectModal}
                notificationProps={this.props.notificationProps}
                qrCodeRef={this.props.qrCodeRef}
                shareStory={this.props.shareStory} />,
        ];
    }

    renderModals = () => {
        return [
            <RequestFunding
                key="request-funding"
                id="request-funding"
                onClose={this.modalBack}
                onSubmit={this.onRequestFundingSubmit} />,
        ];
    }

    openAddProjectModal = () => {
        this.setActiveModal('request-funding');
    }

    onRequestFundingSubmit = (data) => {
        if (this.props.sendRequestFunding) {
            this.props.sendRequestFunding(data);
            this.modalBack();
        }
    }
}