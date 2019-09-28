import React from 'react';
import { string, number, func } from 'prop-types';
import classNames from 'classnames';

import { Avatar, Progress, Button } from '@vkontakte/vkui';

import { gaps } from 'helpers';

import './ProjectCard.css';

const ProjectCard = ({ className, background, logo, name, description, raised_funds, goal_funds, onClick }) => {
    const progress = (raised_funds / goal_funds) * 100;
    const projectCardStyle = {
        background: 'rgba(0, 0, 0, 0.5)',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div className={classNames(className, 'ProjectCard')} style={projectCardStyle}>
            <div className="ProjectCard__l">
                <Avatar className="ProjectCard__Avatar" src={logo} />
            </div>
            <div className="ProjectCard__r">
                <h3 className="ProjectCard__name" children={name} />
                <p className="ProjectCard__description" children={description} />
                <div className="ProjectCard__progress-info">
                    <Progress className="ProjectCard__Progress" value={progress} />
                    <div className="ProjectCard__goal">
                        <span>0</span>
                        <span>{gaps(goal_funds)} ₽</span>
                    </div>
                </div>

                <Button
                    className="ProjectCard__Button"
                    children="Пожертвовать"
                    onClick={onClick} />
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    className: string,
    background: string.isRequired,
    name: string.isRequired,
    logo: string.isRequired,
    description: string.isRequired,
    raised_funds: number.isRequired,
    goal_funds: number.isRequired,
    onClick: func,
};

export default ProjectCard;