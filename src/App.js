import React from 'react';
import connect from '@vkontakte/vk-connect';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Spinner from 'views/Spinner';
import Main from 'views/Main';

import { parseQueryString, getUTCOffset } from 'helpers';
import {
	auth,
	activeProject, projectFacts,
	userProjectKey, activatedProjectKeys,
	activeProjectKey 
} from 'api';

import './App.css';

export default class App extends React.Component {
	state = {
		activeView: 'spinner',
		user: null,
		activeProject: null,
		userProjectKey: null,
		activatedProjectKeys: [],
		facts: [],
		notification: {
			show: false,
		},
	};

	header;
	qrCode = React.createRef();

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

		this.authorization(() => this.fetchActiveProject(this.fetchOther));

		connect.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppOpenQRResult') {
				this.activateProjectKey(data.qr_data);
			}
		});
	}

	render() {
		return (
			<Root activeView={this.state.activeView}>
				<Main
					id="main"
					activePanel="home"
					user={this.getUser()}
					activeProject={this.getActiveProject()}
					userProjectKey={this.getUserProjectKey()}
					activatedProjectKeys={this.getActivatedProjectKeys()}
					header={false}
					notificationProps={this.getNotificationProps()}
					qrCodeRef={this.qrCode}
					shareStory={this.shareStory} />
				<Spinner id="spinner" />
			</Root>
		);
	}

	getUser = () => this.state.user;
	getActiveProject = () => this.state.activeProject;
	getUserProjectKey = () => this.state.userProjectKey;
	getActivatedProjectKeys = () => this.state.activatedProjectKeys;

	getNotificationProps = () => ({
		...this.state.notification,
		hide: this.hideNotification,
	})

	authorization = (callback = f => f) => {
		auth()
			.then(({ status, data: user }) => {
				if (status === 200 || status === 201) {
					this.setState({ user }, callback);
				}
			})
			.catch(e => console.log('auth', e));
	}

	fetchActiveProject = (callback = f => f) => {
		activeProject()
			.then(({ status, data: activeProject }) => {
				if (status === 200) {
					this.setState({ activeProject }, callback);
				} 
			})
			.catch(e => console.log('active project', e));
	}

	fetchOther = () => {
		Promise.all([
			userProjectKey(this.state.activeProject.id),
			activatedProjectKeys(this.state.activeProject.id),
			projectFacts(this.state.activeProject.id)
		])
			.then(resultes => {
				// проверяем статусы выполнения запросов
				for (let i = 0; i < resultes.length; i++) {
					if (resultes[i].status !== 200) throw new Error('error load');
				}

				this.setState({
					userProjectKey: resultes[0].data.token,
					activatedProjectKeys: resultes[1].data,
					facts: resultes[2].data,
					activeView: 'main',
				})
			});
	}

	activateProjectKey = (token) => {
		this.loadingScan();		

		activeProjectKey(this.state.activeProject.id, { token })
			.then(({ status, data }) => {
				if (status === 200) {
					setTimeout(() => this.successScan(data), 7000);
				};
			})
			.catch((e) => {
				if (e.response.status === 422) {
					setTimeout(() => this.repeatedScan(e.response.data.data), 7000);
					return;
				}

				if (e.response.status === 403) {
					setTimeout(this.errorScan, 7000);
					return;
				}

				this.hideNotification();
			});
	}

	loadingScan = () => {
		this.setState({
			notification: {
				show: true,
				status: 'loading',
				title: 'Обработка QR',
				message: this.getRandomFact()
			}
		});
	}

	successScan = (data) => {
		this.setState((prevState) => ({
			activatedProjectKeys: prevState.activatedProjectKeys.concat([data]),
			notification: {
				show: true,
				status: 'success',
				title: 'Удачно',
				message: `Ты открыл новый символ “${data.value.toUpperCase()}”!`,
				timeout: 5000
			}
		}));
	}

	repeatedScan = (data) => {
		this.setState(({
			notification: {
				show: true,
				status: 'info',
				title: 'Sorry',
				message: `Символ “${data.value.toUpperCase()}” у тебя уже есть.`,
				timeout: 5000
			}
		}));
	}

	errorScan = () => {
		this.setState(({
			notification: {
				show: true,
				status: 'error',
				title: 'Хм...',
				message: 'Зачем ты сканируешт свой QR?',
				timeout: 5000
			}
		}));
	}

	hideNotification = () => {
		this.setState((prevState) => ({
			notification: {
				...prevState.notification,
				show: false
			}
		}));
	}

	shareStory = () => {
		console.log('shared');
		// this.qrCode.current -> node
	}

	getRandomFact = () => {
		if (this.state.facts.length > 0) {
			const index = this.getRandomIndexFact(this.state.facts.length - 1);

			return this.state.facts[index].text;
		}

		return '';
	}

	getRandomIndexFact(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
}