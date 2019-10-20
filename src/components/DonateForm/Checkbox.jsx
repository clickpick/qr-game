import React from 'react';
import { string, number, bool, func } from 'prop-types';
import classNames from 'classnames';

import './Checkbox.css';

const Checkbox = ({ className, value, checked, onChange }) =>
    <label className={classNames(className, 'DonateFormCheckbox', 'needsclick')}>
        <input
            className="DonateFormCheckbox__self"
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange} />
        <div className="DonateFormCheckbox__mark needsclick" children={`${value} ₽`} />
    </label>;

Checkbox.propTypes = {
    className: string,
    value: number.isRequired,
    checked: bool,
    onChange: func
};

export default Checkbox;