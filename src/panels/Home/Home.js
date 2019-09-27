import React from 'react';
import { string, func } from 'prop-types';

import { Panel, PanelHeader, Button, Group, Div } from '@vkontakte/vkui';

import './Home.css';

const Home = ({ id, go }) => {
	return (
		<Panel id={id}>
			<PanelHeader>Home</PanelHeader>

			<Group title="Navigation Example">
				<Div>
					<Button size="xl" level="2" onClick={go} data-to="finansing">
						Show me the Persik, please
					</Button>
				</Div>
			</Group>
		</Panel>
	);
};

Home.propTypes = {
	id: string.isRequired,
	go: func.isRequired,
};

export default Home;
