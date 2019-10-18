import React from 'react';
import { string, func, shape, number, array, object, bool } from 'prop-types';

import connect from '@vkontakte/vk-connect';
import { Panel } from '@vkontakte/vkui';
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
	user, project,
	disabledOpenScan,
	qrCodeRef, share, disabledShare,
	openRequestFundingModal,
	showRules
}) => {
	function openQR() {
		connect.send('VKWebAppOpenQR');
	}

	function showPayForm() {
		connect.send('VKWebAppOpenPayForm', {
			app_id: VK.APP_ID,
			action: 'transfer-to-user',
			params: {
				user_id: VK.USER_ID
			}
		});
	}

	return (
		<Panel id={id} className="Home">
			{(user && project) && <>
				<div className="Home__white-wrapper">
					<QRCode
						className="Home__QRCode"
						userPic={user.avatar_200}
						token={user.active_project_token.token}
						loader={<Loader />}
						ref={qrCodeRef} />
					<div className="Home__actions">
						<Button
							className="Home__action  Home__action--scan"
							children="Сканировать QR код"
							size="medium"
							theme="info"
							full
							onClick={openQR}
							disabled={disabledOpenScan} />
						<Button
							className="Home__action  Home__action--share"
							children={<Icon24ShareOutline className="Home__Icon24ShareOutline" />}
							size="medium"
							theme="info"
							onClick={share}
							disabled={disabledShare} />
					</div>
				</div>

				<div className="Home__blue-wrapper">
					<Wave className="Home_Wave" />

					<div className="Home__content">
						<h2 className="Home__title">
							Сканируй QR коды друзей<br />и получи приз за весь шифр
						</h2>

						<Cipher
							className="Home__Cipher"
							activatedKeys={user.activated_project_keys}
							onClick={showRules} />

						<h2 className="Home__title">При поддержке</h2>

						<ProjectCard className="Home__ProjectCard" {...project} onClick={showPayForm} />

						<Button
							children="Вашему фонду нужно финансирование?"
							size="medium"
							theme="secondary"
							data-to="finansing"
							full
							onClick={openRequestFundingModal} />
					</div>
				</div>
			</>}
		</Panel>
	);
};

Home.propTypes = {
	id: string.isRequired,
	user: shape({
		vk_user_id: number,
		avatar_200: string,
		active_project_token: shape({ token: string }),
		activated_project_keys: array
	}),
	project: shape({
		background: string,
		name: string,
		logo: string,
		descriptiom: string,
		raised_funds: number,
		goal_funds: number
	}),
	disabledOpenScan: bool,
	qrCodeRef: object,
	share: func,
	disabledShare: bool,
	openRequestFundingModal: func
};

export default Home;
