import React from 'react';
import { string, number, func, bool } from 'prop-types';
import classNames from 'classnames';

import { Avatar, Progress, Button } from '@vkontakte/vkui';

import { gaps } from 'helpers';

import './ProjectCard.css';

const ProjectCard = ({
    className,
    poster_url, banner_url, name, description, raised_funds, goal_funds,
    onDonate, disabledDonate
}) => {
    const showProgress = goal_funds !== null && goal_funds > 0;
    let progress;
    if (showProgress) {
        progress = (raised_funds / goal_funds) * 100;
    }

    const projectCardStyle = {
        background: 'rgba(0, 0, 0, 0.5)',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner_url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div className={classNames(className, 'ProjectCard')} style={projectCardStyle}>
            <div className="ProjectCard__l">
                <Avatar className="ProjectCard__Avatar" src={poster_url} />
            </div>
            <div className="ProjectCard__r">
                <h3 className="ProjectCard__name" children={name} />
                <p className="ProjectCard__description" children={description} />

                {(showProgress) &&
                    <div className="ProjectCard__progress-info">
                        <Progress className="ProjectCard__Progress" value={progress} />
                        <div className="ProjectCard__goal">
                            <span>0</span>
                            <span>{gaps(goal_funds)} ₽</span>
                        </div>
                    </div>}

                <Button
                    className="ProjectCard__Button"
                    children="Пожертвовать от 1 ₽"
                    onClick={onDonate}
                    disabled={disabledDonate} />
            </div>
        </div>
    );
};

ProjectCard.propTypes = {
    className: string,
    banner_url: string.isRequired,
    name: string.isRequired,
    poster_url: string.isRequired,
    description: string.isRequired,
    raised_funds: number.isRequired,
    goal_funds: number,
    onDonate: func,
    disabledDonate: bool,
};

export default ProjectCard;