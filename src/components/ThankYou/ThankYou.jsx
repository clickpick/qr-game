import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import thankYou from 'images/thankyou.png';

import './ThankYou.css';

const ThankYou = ({ className }) =>
    <div className={classNames(className, 'ThankYou')}>
        <h1 className="ThankYou__title" children="Спасибо за участие!" />
        <img className="ThankYou__image" src={thankYou} alt="Спасибо!" />
        <p className="ThankYou__message">
            Ты молодец!
            <br />
            Несмотря на то, что игра закончилась, ты можешь пожертвовать средства, которые пойдут на проект "{project.name}".
		</p>
    </div>;

ThankYou.propTypes = {
    className: string,
};

export default ThankYou;