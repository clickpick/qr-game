import React from 'react';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Spinner from 'views/Spinner';
import Main from 'views/Main';

import { parseQueryString, getUTCOffset } from 'helpers';
import { auth } from 'api';

import './App.css';

export default class App extends React.Component {
	state = {
		activeView: 'spinner',
		user: null
	};

	header;

	componentDidMount() {
		this.headers = {
			'Vk-Params': window.btoa(JSON.stringify({
				...parseQueryString(window.location.search),
				'utc_offset': getUTCOffset(),
			})),
			'Accept': 'application/json'
		};

		window.axios = window.axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			headers: this.headers,
		});

		this.authorization();
	}

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<Main id="main" activePanel="home" user={this.state.user} />
				<Spinner id="spinner" />
			</Root>
		);
	}

	authorization = () => {
		auth()
			.then(({ status, data: user }) => {
				if (status === 200 || status === 201) {
					this.setState({
						user,
						activeView: 'main',
					});
				}
			})
			.catch(e => console.log('auth', e));
	}
}