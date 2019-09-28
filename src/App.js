import React from 'react';
import connect from '@vkontakte/vk-connect';
import { Root } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Spinner from 'views/Spinner';
import Main from 'views/Main';

import { parseQueryString, getUTCOffset } from 'helpers';
import { auth, activeProject, userProjectKey, activatedProjectKeys, activeProjectKey } from 'api';

import './App.css';

export default class App extends React.Component {
	state = {
		activeView: 'spinner',
		user: null,
		activeProject: {
			id: 1,
			name: 'Хакатон',
			description: 'Описание',
			raised_funds: 2000,
			goal_funds: 35000,
			logo: 'https://conservationaction.co.za/wp-content/uploads/2013/08/WWF-logo.jpg',
			background: 'https://cdnimg.rg.ru/i/gallery/c492fecf/1_62f6718f.jpg',
		},
		userProjectKey: null,
		activatedProjectKeys: [],
		notification: {
			show: true,
		},
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

		this.authorization(() => this.fetchActiveProject(this.fetchUserProjectKeyAndActivatedProjectKeys));

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
					notificationProps={this.state.notification} />
				<Spinner id="spinner" />
			</Root>
		);
	}

	getUser = () => this.state.user;
	getActiveProject = () => this.state.activeProject;
	getUserProjectKey = () => this.state.userProjectKey;
	getActivatedProjectKeys = () => this.state.activatedProjectKeys;

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
					this.setState({
						activeProject: {
							...this.state.activeProject,
							...activeProject
						}
					}, callback);
				} 
			})
			.catch(e => console.log('active project', e));
	}

	fetchUserProjectKeyAndActivatedProjectKeys = () => {
		Promise.all([
			userProjectKey(this.state.activeProject.id),
			activatedProjectKeys(this.state.activeProject.id)
		])
			.then(resultes => {
				// проверяем статусы выполнения запросов
				for (let i = 0; i < resultes.length; i++) {
					if (resultes[i].status !== 200) throw new Error('error load');
				}

				this.setState({
					userProjectKey: resultes[0].data.token,
					activatedProjectKeys: resultes[1].data,
					activeView: 'main',
				})
			});
	}

	activateProjectKey = (token) => {
		this.setState({
			notification: {
				show: true,
				status: 'loading',
				title: 'Обработка QR',
				info: 'А ты знал, что барсы предпочитают обитать по одиночке, а не в стае?',
			}
		});

		activeProjectKey(this.state.activeProject.id, { token })
			.then(({ status, data }) => {
				if (status === 200) {
					setTimeout(() => {
						this.setState((prevState) => ({
							activatedProjectKeys: prevState.activatedProjectKeys.concat([data]),
							notification: {
								show: false,
								status: 'success',
								title: 'Удачно',
								info: `Ты открыл новый символ “${data.value}”!`,
							}
						}));
					});
					return;
				};
			})
			.catch((e) => console.log(JSON.stringify(e)));
	}
}