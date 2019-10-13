import React from 'react';
import connect from '@vkontakte/vk-connect';
import { Root, View, ModalRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Spinner from 'views/Spinner';
import ThankYou from 'views/ThankYou';

import Home from 'panels/Home';

import RequestFunding from 'modals/RequestFunding';

import NotificationContainer from 'components/NotificationContainer';
import Notification from 'components/Notification';

import { shareStory, svgPrepare, svgToBase64 } from 'helpers';
import {
	auth, toggleNotifications,
	activeProject,
	addFunds,
	activeProjectKey,
	requestFunding
} from 'api';

import * as QR from 'constants/qr';
import * as MODALS from 'constants/modals';

import './App.css';

export default class App extends React.Component {
	state = {
		activeView: 'spinner',
		activeModal: null,

		user: null,
		activeProject: null,

		scanning: false,

		notification: null,
	};

	qrCode = React.createRef();

	componentDidMount() {
		this.authorization(this.fetchActiveProject);

		connect.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppOpenQRResult') {
				this.activateProjectKey(data.qr_data);
			}

			if (type === 'VKWebAppOpenPayFormResult') {
				// если платеж прошел успешно
				if (data.status) {
					this.saveFunds(data.amount);
					setTimeout(this.thankYou, 500);
				}
			}

			if (type === 'VKWebAppAllowNotificationsResult' && data.result) {
				this.allowNotification();
			}

			if (type === 'VKWebAppCallAPIMethodResult') {
				if (data.response.upload_url) {
					setTimeout(this.sharedStory, 500);
				}
			}
		});

		connect.send('VKWebAppSetViewSettings', { status_bar_style: 'dark' });
	}

	render() {
		const activeProject = this.getActiveProject();
		const user = this.getUser();
		const notification = this.getNotification();

		return <>
			<NotificationContainer>
				{notification && <Notification {...notification} close={this.hideNotification} />}
			</NotificationContainer>
			<Root activeView={this.state.activeView}>
				<View id="main" activePanel="home" header={false} modal={this.renderModals()}>
					<Home
						id="home"
						user={user}
						project={activeProject}
						disabledOpenScan={this.state.scanning}
						showRules={this.showRules}
						openRequestFundingModal={this.openRequestFundingModal} />
				</View>
				<ThankYou
					id="finish"
					activePanel="finish"
					user={user}
					activeProject={activeProject} />
				<Spinner id="spinner" />
			</Root>
		</>;
	}

	renderModals = () => {
		return (
			<ModalRoot activeModal={this.state.activeModal}>
				<RequestFunding
					id={MODALS.REQUEST_FUNDING}
					close={this.modalBack}
					onSubmit={this.sendRequestFunding} />
			</ModalRoot>
		);
	};

	getLocationHash = (link = window.location.hash) => link.replace('#', '');

	getUser = () => this.state.user;
	getActiveProject = () => this.state.activeProject;
	getNotification = () => this.state.notification;

	authorization = (callback = f => f) => {
		auth()
			.then(({ status, data: user }) => {
				if (status === 200 || status === 201) {
					this.setState({ user }, callback);
				}
			})
			.catch(e => console.log('auth', e));
	}

	fetchActiveProject = () => {
		activeProject()
			.then(({ data }) => {
				this.setState({ activeProject: data }, () => {
					if (data.is_finished) {
						this.setState({ activeView: 'finish' });
						return;
					}

					this.setState({ activeView: 'main' });
				});
			})
			.catch(e => console.log('active project', e));
	}

	activateProjectKey = (link) => {
		const hash = this.getLocationHash(link.split('#')[1]);

		let token = '';
		if (!hash) {
			return;
		}

		hash.split('&').forEach((param) => {
			const parse = param.split('=');
			const key = parse[0];
			const value = parse[1];

			if (key === 'token') {
				token = value;
			}
		});

		this.loadingScan();

		activeProjectKey(this.getActiveProject().id, { token })
			.then(({ data }) => {
				setTimeout(() => {
					this.hideNotification();
					setTimeout(() => {
						if (data.is_last) {
							this.finishGame(data);
							return;
						}

						this.successScan(data);
					}, 500);
				}, QR.SCANNING_DELAY);
			})
			.catch((e) => {
				if (e.response.status === 422 || e.response.status === 500) {
					setTimeout(() => {
						this.hideNotification();
						setTimeout(() => { this.repeatedScan(e.response.data.data) }, 500);
					}, QR.SCANNING_DELAY);

					return;
				}

				if (e.response.status === 403) {
					setTimeout(() => {
						this.hideNotification();

						setTimeout(this.errorScan, 500);
					}, QR.SCANNING_DELAY);

					return;
				}

				this.hideNotification();
			});
	}

	loadingScan = () => {
		this.setState({
			notification: {
				status: 'loading',
				title: 'Обработка QR кода',
				message: this.getRandomFact()
			},
			scanning: true
		});

		this.tapticNotification('success');
	}

	successScan = (data) => {
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				activated_project_keys: prevState.user.activated_project_keys.concat([data]),
			},
			notification: {
				status: 'success',
				title: 'Удачно',
				message: `Ты открыл новый символ “${data.value.toUpperCase()}”!`
			}
		}), () => {
			setTimeout(this.hideNotification, 3000);
		});

		this.tapticNotification('success');
	}

	repeatedScan = (data) => {
		this.setState(({
			notification: {
				status: 'info',
				title: 'Sorry',
				message: `Символ “${data.value.toUpperCase()}” у тебя уже есть.`
			},
			scanning: false
		}), () => {
			setTimeout(this.hideNotification, 3000);
		});

		this.tapticNotification('warning');
	}

	errorScan = () => {
		this.setState(({
			notification: {
				status: 'error',
				title: 'Хм...',
				message: 'Зачем ты сканируешт свой QR?'
			},
			scanning: false
		}), () => {
			setTimeout(this.hideNotification, 3000);
		});

		this.tapticNotification('error');
	}

	finishGame = (data) => {
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				activated_project_keys: prevState.user.activated_project_keys.concat([data]),
			},

			notification: {
				status: 'success',
				title: 'Congratulations!',
				message: 'Ты собрал все символы и выиграл игру!'
			},

			scanning: true
		}), () => {
			setTimeout(() => {
				this.hideNotification();
				this.setState({ activeView: 'finish' });
			}, 3300);
		});

		this.tapticNotification('success');
	}

	thankYou = () => {
		this.setState(({
			notification: {
				status: 'info',
				title: 'Thx',
				message: this.getActiveProject().description
			}
		}), () => {
			setTimeout(this.hideNotification, 3000);
		});
	}

	sharedStory = () => {
		this.setState(({
			notification: {
				status: 'info',
				title: 'История опубликована',
			}
		}), () => {
			setTimeout(this.hideNotification, 3000);
		});
	}

	shareStory = () => {
		const svg = this.qrCode.current.firstElementChild;
		shareStory(connect, svgToBase64(svgPrepare(svg)), null /* reply-id @type string */);
	}

	getRandomFact = () => {
		const project = this.getActiveProject();

		if (project && Array.isArray(project.project_facts) && project.project_facts.length > 0) {
			const index = this.getRandomIndexFact(project.project_facts.length - 1);

			return project.project_facts[index].text;
		}

		return '';
	}

	getRandomIndexFact(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	allowNotification = () => {
		this.setState((prevState) => ({
			user: {
				...prevState.user,
				notifications_are_enabled: true
			}
		}));

		toggleNotifications(1);
	}

	saveFunds = (amount) => {
		const activeProject = this.getActiveProject();

		addFunds(activeProject.id, amount);
		this.setState({
			activeProject: {
				...activeProject,
				raised_funds: activeProject.raised_funds + amount
			}
		});
	}

	sendRequestFunding = (data) => {
		requestFunding(data).then(this.requestFundingSended);
	}

	requestFundingSended = () => {
		this.setState(({
			activeModal: null,

			notification: {
				status: 'success',
				title: 'Твоя заявка отправлена',
				message: 'В скором времени с тобой свяжутся'
			}
		}), () => {
			setTimeout(this.hideNotification, 5000);
		});
	}

	tapticNotification = (type) => {
		if (connect.supports('VKWebAppTapticNotificationOccurred')) {
			connect.send("VKWebAppTapticNotificationOccurred", { type });
		}
	}

	showRules = () => {
		this.setState(({
			notification: {
				status: 'rules',
				title: 'Правила',
				message: <span>
					- У тебя есть QR код с зашифрованным символом, у других людей тоже.<br />
					- У каждого разные QR коды, но есть повторяющиеся.<br />
					- Основная цель, найти и сканировать 5 разных QR кодов у 5-ти людей.<br />
					- Первый (или несколько первых), кто соберет все QR коды, забирает приз, который выставит фонд-партнёр
				</span>,
				actions: [
					{
						title: 'Ок, понял',
						type: 'primary',
						action: this.hideNotification
					}
				]
			}
		}));
	}

	hideNotification = () => {
		this.setState({ notification: null });
	}

	openRequestFundingModal = () => {
		this.setActiveModal(MODALS.REQUEST_FUNDING);
	}

	onRequestFundingSubmit = (data) => {
		this.sendRequestFunding(data);
		this.modalBack();
	}

	setActiveModal = (activeModal) => {
		this.setState({ activeModal });
	}

	modalBack = () => {
		this.setActiveModal(null);
	}
}