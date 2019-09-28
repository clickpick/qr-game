import React from 'react';
import classNames from 'classnames';

import success from 'images/success.png';
import error from 'images/error.png';

import Loader from 'components/Loader';

import './Notification.css';

export default class Notification extends React.Component {
    state = {
        show: false,
    };

    componentDidMount() {
        this.init(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    init = (props) => {
        if (props.show) {
           this.setState({ show: true });
           return;
        }

        setTimeout(() => {
            this.setState({ show: false });
        }, 1500);
    }

    render() {
        return (
            <div className={classNames('Notification', { [`Notificatio--show`]: this.state.show })}>
                <div className="Notification__l">
                    {this.getImage()}
                </div>
                <div className="Notification__r">
                    <h4
                        className={classNames('Notification__title', `Notification__title--${this.props.status}`)}
                        children={this.props.title} />
                    <p className="Notification__info" children={this.props.info} />
                </div>
            </div>
        );
    }

    getImage = () => {
        switch (this.props.status) {
            case 'loading':
                return <Loader className="Notification__loader" />;
            case 'success':
                return <img className="Notification__image" src={success} alt={this.props.status} />;
            case 'error': case 'info':
                return <img className="Notification__image" src={error} alt={this.props.status} />;
        }
    }
}