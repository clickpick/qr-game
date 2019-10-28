import React from 'react';
import { string, object, func } from 'prop-types';
import { useSelector } from 'react-redux';

import { IOS } from 'constants/platform';

import { Panel } from '@vkontakte/vkui';

import ThankYou from 'components/ThankYou';
import ProjectCard from 'components/ProjectCard';

import './Finish.css';

const Finish = ({ id, user, project, openDonateForm }) => {
    const supportDonate = useSelector(state => state.platform) !== IOS;
    // const allowNotifications = () => connect.send("VKWebAppAllowNotifications", {});

    // const isDeni = !Boolean(Number(user.notifications_are_enabled));

    return (
        <Panel id={id} className="Finish">
            <div className="Finish__wrapper">
                <ThankYou className="Finish__ThankYou" project={project} />
                <ProjectCard
                    className="Finish__ProjectCard"
                    {...project}
                    supportDonate={supportDonate}
                    onDonate={openDonateForm} />
            </div>
        </Panel>
    );
};

Finish.propTypes = {
    id: string.isRequired,
    user: object,
    project: object,
    openDonateForm: func
};

export default Finish;