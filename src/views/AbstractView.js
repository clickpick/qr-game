import React from 'react';
import { string } from 'prop-types';

import { View, ConfigProvider } from '@vkontakte/vkui';

export default class AbstractView extends React.Component {
    static propTypes = {
        id: string.isRequired,
        activePanel: string.isRequired,
    };

    state = {
        activePanel: this.props.activePanel,
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

    render() {
        return (
            <ConfigProvider isWebView={true}>
                <View
                    id={this.props.id}
                    activePanel={this.state.activePanel}
                    children={this.renderPanels()} />
            </ConfigProvider>
        );
    }

    renderPanels() {
        return null;
    }
}