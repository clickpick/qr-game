import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import { gaps } from 'helpers';

import thankYou from 'images/thankyou.png';

import './ThankYou.css';

const ThankYou = ({ className, project }) =>
    <div className={classNames(className, 'ThankYou')}>
        <h1 className="ThankYou__title" children="Спасибо за участие!" />
        <img className="ThankYou__image" src={thankYou} alt="Спасибо!" />
        <p className="ThankYou__message">
            За время флэшмоба мы собрали {gaps(project.raised_funds)}₽ на проект ”{project.name}”.
            <br />
            Несмотря на то, что проект закончился, ты можете пожертвовать средства, которые пойдут на этот или другие проекты этого фонда.
		</p>
    </div>;

ThankYou.propTypes = {
    className: string,
};

export default ThankYou;