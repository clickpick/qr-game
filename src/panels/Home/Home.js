import React from 'react';
import { string, func, shape, number, array, object, bool } from 'prop-types';
import { useSelector } from 'react-redux';

import { IOS, MOBILE_WEB } from 'constants/platform';

import { Panel } from '@vkontakte/vkui';
import Loader from 'components/Loader';
import QRCode from 'components/QRCode';
import Button from 'components/Button';
import Wave from 'components/Wave';
import Cipher from 'components/Cipher';
import ProjectCard from 'components/ProjectCard';

import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';

import './Home.css';

const Home = ({
	id,
	user, project,
	qrCodeRef, openQR, disabledOpenQR,
	share, disabledShare,
	showRules,
	openDonateForm,
	showPrize,
	openRequestFundingModal
}) => {
	const supportDonate = useSelector(state => state.platform) !== IOS;	

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
							disabled={disabledOpenQR} />
						<Button
							className="Home__action  Home__action--share"
							before={<Icon24ShareOutline className="Home__Icon24ShareOutline" />}
							children="Поделиться в истории"
							size="medium"
							full
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

						<ProjectCard
							className="Home__ProjectCard"
							{...project}
							supportDonate={supportDonate}
							onDonate={openDonateForm} />

						<Button
							className="Home__prize"
							theme="primary"
							size="medium"
							children="Призы за участие"
							full
							onClick={showPrize} />

						<Button
							theme="secondary"
							size="medium"
							children="Вашему фонду нужно финансирование?"
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
	qrCodeRef: object,
	openQR: func,
	disabledOpenQR: bool,
	share: func,
	disabledShare: bool,
	showRule: func,
	openDonateForm: func,
	showPrize: func,
	openRequestFundingModal: func,
};

export default Home;
