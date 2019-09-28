import React from 'react';
import { string, func, shape, number } from 'prop-types';

import { Panel } from '@vkontakte/vkui';
import Loader from 'components/Loader';
import QRCode from 'components/QRCode';
import Button from 'components/Button';
import Cipher from 'components/Cipher';
import ProjectCard from 'components/ProjectCard';

import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';

import './Home.css';

const Home = ({ id, go, user, activeProject, userProjectKey, activatedProjectKeys }) => {
	return (
		<Panel id={id} className="Home">
			<QRCode
				className="Home__QRCode"
				userPic={user.avatar_200}
				token={userProjectKey}
				loader={<Loader />} />

			<div className="Home__actions">
				<Button
					className="Home__action  Home__action--scan"
					children="Сканировать QR код"
					size="medium"
					theme="info"
					full />
				<Button
					className="Home__action  Home__action--share"
					children={<Icon24ShareOutline className="Home__Icon24ShareOutline" />}
					size="medium"
					theme="info" />
			</div>

			<div className="Home__blue-wrapper">
				<h2 className="Home__title">
					Сканируй QR коды друзей<br />и получи приз за весь шифр
				</h2>

				<Cipher className="Home__Cipher" activatedKeys={activatedProjectKeys} />

				<h2 className="Home__title">При поддержке</h2>

				<ProjectCard className="Home__ProjectCard" {...activeProject} />
				
				<Button
					children="Помощь в сборе средств для вашего фонда"
					size="medium"
					theme="primary"
					data-to="finansing"
					full
					onClick={go} />
			</div>
		</Panel>
	);
};

Home.propTypes = {
	id: string.isRequired,
	go: func.isRequired,
	activeProject: shape({
		background: string,
		name: string,
		logo: string,
		descriptiom: string,
		raised_funds: number,
		goal_funds: number,
	})
};

export default Home;
