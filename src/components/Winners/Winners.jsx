import React from 'react';
import { string, arrayOf, object, array } from 'prop-types';
import classNames from 'classnames';

import './Winners.css';

import { Avatar } from '@vkontakte/vkui';

const Winners = ({ className, winners, prizes }) => {
    function renderWinner(winner, key) {
        const name = `${winner.first_name} ${winner.last_name}`;
        const prize = prizes[key];
        const place = `${key + 1} место${(prize && ` – ${prize}`)}`;

        return (
            <li
                key={key}
                className="Winners__winner">
                <Avatar className="Winners__Avatar" src={winner.avatar_200} />
                <div className="Winner__info">
                    <a
                        className="Winners__name"
                        href={`https://vk.com/id${winner.vk_user_id}`}
                        target="_blank"
                        rel="noopenner norefferer"
                        children={name} />
                    <span className="Winner__prize-place" children={place} />
                </div>
            </li>
        );
    }

    return <ul className={classNames(className, 'Winners')} children={winners.map(renderWinner)} />;
};

Winners.propTypes = {
    className: string,
    winners: arrayOf(object).isRequired,
    prizes: array.isRequired
};

export default Winners;