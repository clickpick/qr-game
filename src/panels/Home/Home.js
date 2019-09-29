import React from 'react';
import { string, func, shape, number, array, object } from 'prop-types';

import connect from '@vkontakte/vk-connect';
import { Panel } from '@vkontakte/vkui';
import Notification from 'components/Notification';
import Loader from 'components/Loader';
import QRCode from 'components/QRCode';
import Button from 'components/Button';
import Wave from 'components/Wave';
import Cipher from 'components/Cipher';
import ProjectCard from 'components/ProjectCard';

import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';

import * as VK from 'constants/vk';

import './Home.css';

const Home = ({
	id,
	user, activeProject, userProjectKey, activatedProjectKeys,
	notificationProps,
	qrCodeRef, shareStory,
	openAddProjectModal
}) => {
	const openQR = () => connect.send('VKWebAppOpenQR');
	const showPayForm = () =>
		connect.send('VKWebAppOpenPayForm', {
			app_id: VK.APP_ID,
			action: 'transfer-to-user',
			params: {
				user_id: VK.USER_ID
			}
		});

	return (
		<Panel id={id} className="Home">
			<Notification {...notificationProps} />

			<QRCode
				className="Home__QRCode"
				userPic={user.avatar_200}
				token={userProjectKey}
				loader={<Loader />}
				ref={qrCodeRef} />

			<div className="Home__actions">
				<Button
					className="Home__action  Home__action--scan"
					children="Сканировать QR код"
					size="medium"
					theme="info"
					full
					onClick={openQR} />
				<Button
					className="Home__action  Home__action--share"
					children={<Icon24ShareOutline className="Home__Icon24ShareOutline" />}
					size="medium"
					theme="info"
					onClick={shareStory} />
			</div>

			<div className="Home__blue-wrapper">
				<Wave className="Home_Wave" />

				<div className="Home__content">
					<h2 className="Home__title">
						Сканируй QR коды друзей<br />и получи приз за весь шифр
					</h2>

					<Cipher className="Home__Cipher" activatedKeys={activatedProjectKeys} />

					<h2 className="Home__title">При поддержке</h2>

					<ProjectCard className="Home__ProjectCard" {...activeProject} onClick={showPayForm} />

					<Button
						children="Вашему фонду нужно финансирование?"
						size="medium"
						theme="primary"
						data-to="finansing"
						full
						onClick={openAddProjectModal} />
				</div>
			</div>
		</Panel>
	);
};

Home.propTypes = {
	id: string.isRequired,
	activeProject: shape({
		background: string,
		name: string,
		logo: string,
		descriptiom: string,
		raised_funds: number,
		goal_funds: number,
	}),
	userProjectKey: string.isRequired,
	activatedProjectKeys: array.isRequired,
	openAddProjectModal: func,
	notificationProps: object,
	qrCodeRef: object,
	shareStory: func,
};

export default Home;
