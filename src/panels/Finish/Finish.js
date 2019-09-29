import React from 'react';

import connect from '@vkontakte/vk-connect';
import { Panel } from '@vkontakte/vkui';

import ThankYou from 'components/ThankYou';
import ProjectCard from 'components/ProjectCard';

import * as VK from 'constants/vk';

import './Finish.css';

const ThankYouPanel = ({ id, activeProject }) => {
    const showPayForm = () =>
        connect.send('VKWebAppOpenPayForm', {
            app_id: VK.APP_ID,
            action: 'transfer-to-user',
            params: {
                user_id: VK.USER_ID
            }
        });

    return (
        <Panel id={id} className="Finish">
            <div className="Finish__wrapper">
                <ThankYou className="Finish__ThankYou" project={activeProject} />
                <ProjectCard className="Finish__ProjectCard" {...activeProject} onClick={showPayForm} />
            </div>
        </Panel>
    );
}

export default ThankYouPanel;