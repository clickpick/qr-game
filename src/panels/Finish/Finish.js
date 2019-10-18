import React from 'react';
import { string, object } from 'prop-types';

import connect from '@vkontakte/vk-connect';
import { Panel } from '@vkontakte/vkui';

import ThankYou from 'components/ThankYou';
import ProjectCard from 'components/ProjectCard';

import * as VK from 'constants/vk';

import './Finish.css';

const Finish = ({ id, user, project }) => {
    const showPayForm = () =>
        connect.send('VKWebAppOpenPayForm', {
            app_id: VK.APP_ID,
            action: 'transfer-to-user',
            params: {
                user_id: VK.USER_ID
            }
        });

    // const allowNotifications = () => connect.send("VKWebAppAllowNotifications", {});

    // const isDeni = !Boolean(Number(user.notifications_are_enabled));

    return (
        <Panel id={id} className="Finish">
            <div className="Finish__wrapper">
                <ThankYou className="Finish__ThankYou" project={project} />
                <ProjectCard className="Finish__ProjectCard" {...project} onClick={showPayForm} />
            </div>
        </Panel>
    );
};

Finish.propTypes = {
    id: string.isRequired,
    user: object,
    project: object,
};

export default Finish;