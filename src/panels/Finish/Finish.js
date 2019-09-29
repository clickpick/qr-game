import React from 'react';
import { string, object } from 'prop-types';

import connect from '@vkontakte/vk-connect';
import { Panel } from '@vkontakte/vkui';

import ThankYou from 'components/ThankYou';
import ProjectCard from 'components/ProjectCard';
import AllowNotification from 'components/AllowNotification';

import * as VK from 'constants/vk';

import './Finish.css';

const Finish = ({ id, user, activeProject }) => {
    const showPayForm = () =>
        connect.send('VKWebAppOpenPayForm', {
            app_id: VK.APP_ID,
            action: 'transfer-to-user',
            params: {
                user_id: VK.USER_ID
            }
        });

    const allowNotifications = () => connect.send("VKWebAppAllowNotifications", {});

    const isDeni = !Boolean(Number(user.notifications_are_enabled));

    return (
        <Panel id={id} className="Finish">
            <div className="Finish__wrapper">
                <ThankYou className="Finish__ThankYou" project={activeProject} />
                <ProjectCard className="Finish__ProjectCard" {...activeProject} onClick={showPayForm} />

                {(isDeni) &&
                    <AllowNotification className="Finish__AllowNotification" allow={allowNotifications} />}
            </div>
        </Panel>
    );
};

Finish.propTypes = {
    id: string.isRequired,
    user: object,
    activeProject: object,
};

export default Finish;