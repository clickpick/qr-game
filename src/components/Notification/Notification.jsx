import React from 'react';
import { string, bool, number, oneOf, func } from 'prop-types';
import classNames from 'classnames';

import success from 'images/success.png';
import info from 'images/info.png';
import error from 'images/error.png';
import rules from 'images/rules.png';

import Loader from 'components/Loader';

import './Notification.css';

export default class Notification extends React.Component {
    static propTypes = {
        show: bool,
        status: oneOf(['loading', 'success', 'error', 'info']),
        title: string,
        message: string,
        timeout: number,
        hide: func,
    };

    state = {
        show: false,
    };

    timerId = null;

    componentDidMount() {
        this.init(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.init(nextProps);   
    }

    init = (props) => {
        this.setState({ show: props.show });

        if (props.show && props.hasOwnProperty('timeout') && !isNaN(props.timeout)) {
            this.clearTimer();
            this.timerId = setTimeout(() => {
                this.setState({ show: false });
                this.hide();
            }, props.timeout);
        }
    }

    render() {
        return (
            <div className={classNames(this.props.className, 'Notification', { [`Notificatio--show`]: this.state.show })} onClick={this.onClick}>
                <div className="Notification__l">
                    {this.getImage()}
                </div>
                <div className="Notification__r">
                    <h4
                        className={classNames('Notification__title', `Notification__title--${this.props.status}`)}
                        children={this.props.title} />
                    <p className="Notification__message" children={this.props.message} />
                    {this.props.children}
                </div>
            </div>
        );
    }

    onClick = () => {
        if (this.props.status !== 'loading') {
            this.clearTimer();
            this.hide();
        }
    }

    clearTimer = () => {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    }

    hide = () => {
        if (this.props.hide) {
            this.props.hide();
        }
    }

    getImage = () => {
        // eslint-disable-next-line default-case
        switch (this.props.status) {
            case 'loading':
                return <Loader className="Notification__loader" />;
            case 'success':
                return <img className="Notification__image" src={success} alt={this.props.status} />;
            case 'error':
                return <img className="Notification__image" src={error} alt={this.props.status} />;
            case 'info':
                return <img className="Notification__image" src={info} alt={this.props.status} />;
            case 'rules':
                return <img className="Notification__image" src={rules} alt={this.props.status} />;
        }
    }
}