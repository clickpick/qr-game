import React, { lazy, Suspense, useState } from 'react';
import { string, object, arrayOf, func } from 'prop-types';
import { useSelector } from 'react-redux';

import './Finish.css';

import { Panel } from '@vkontakte/vkui';

import ThankYou from 'components/ThankYou';
import ProjectCard from 'components/ProjectCard';
import Loader from 'components/Loader';

import { IOS } from 'constants/platform';
import { prizes } from 'constants/game';

const AllowNotifications = lazy(() => import('components/AllowNotifications'));
const Winners = lazy(() => import('components/Winners'));

const Finish = ({ id, user, project, winners, openDonateForm, enableNotifications }) => {
    const supportDonate = useSelector(state => state.platform) !== IOS;
    const [allowed, setAllowed] = useState(user.notifications_are_enabled !== '0');
    
    async function allowNotifications() {
        const result = await enableNotifications();
        setAllowed(result);
    }

    return (
        <Panel id={id} className="Finish">
            <div className="Finish__wrapper">
                <ThankYou className="Finish__ThankYou" project={project} />
                <ProjectCard
                    className="Finish__ProjectCard"
                    {...project}
                    supportDonate={supportDonate}
                    onDonate={openDonateForm} />
                
                {(!allowed) &&
                    <Suspense fallback={<Loader className="Finish__Loader" />}>
                        <AllowNotifications className="Finish__AllowNotifications" enable={allowNotifications} />
                    </Suspense>}

                <Suspense fallback={<Loader className="Finish__Loader" />}>
                    <h2 className="Finish__title" children="Победители" />
                    {(winners) &&
                        <Winners
                            className="Finish__Winners"
                            winners={winners}
                            prizes={prizes} />}
                </Suspense>
            </div>
        </Panel>
    );
};

Finish.propTypes = {
    id: string.isRequired,
    user: object,
    project: object,
    winners: arrayOf(object),
    openDonateForm: func,
    enableNotifications: func
};

export default Finish;