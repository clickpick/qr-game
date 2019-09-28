import React from 'react';
import { string, bool } from 'prop-types';

import { View, ConfigProvider, ModalRoot, ScreenSpinner } from '@vkontakte/vkui';

export default class AbstractView extends React.Component {
    static propTypes = {
        id: string.isRequired,
        activePanel: string.isRequired,
        header: bool,
        popout: bool,
    };

    state = {
        activePanel: this.props.activePanel,
        activeModal: null,
        modalHistory: [],
    };

    componentDidMount() {
        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            this.changePanel(e);
        });
        window.history.pushState({ panel: this.state.activePanel }, this.state.activePanel);
    }

    go = (e) => {
        this.setState({ activePanel: e.currentTarget.dataset.to });
        window.history.pushState({ panel: e.currentTarget.dataset.to }, e.currentTarget.dataset.to);
    }

    goBack = () => {
        window.history.back();
    }

    changePanel = (e) => {
        if (e.state) {
            this.setState({ activePanel: e.state.panel });
        } else {
            this.setState({ activePanel: this.props.activePanel, search: '' });
            window.history.pushState({ panel: this.state.activePanel }, this.state.activePanel);
        }
    }

    modalBack = () => {
        this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
    }

    setActiveModal = (activeModal) => {
        activeModal = activeModal || null;
        let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

        if (activeModal === null) {
            modalHistory = [];
        } else if (modalHistory.indexOf(activeModal) !== -1) {
            modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
        } else {
            modalHistory.push(activeModal);
        }

        this.setState({
            activeModal,
            modalHistory
        });
    }

    render() {
        return (
            <ConfigProvider isWebView={true}>
                <View
                    id={this.props.id}
                    activePanel={this.state.activePanel}
                    header={this.props.header}
                    children={this.renderPanels()}
                    modal={this.renderModalRoot()}
                    popout={this.renderPopout()} />
            </ConfigProvider>
        );
    }

    renderPanels() {
        return null;
    }

    renderModalRoot = () => {
        return <ModalRoot activeModal={this.state.activeModal} children={this.renderModals()} />;
    }

    renderModals() {
        return [];
    }

    renderPopout = () => {
        if (this.props.popout) {
            return <ScreenSpinner size='large' />;
        }

        return null;
    }
}