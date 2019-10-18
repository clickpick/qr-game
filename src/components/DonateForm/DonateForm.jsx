import React, { useState } from 'react';
import { string, func, bool } from 'prop-types';
import classNames from 'classnames';

import './DonateForm.css';

import { FormLayout, FormStatus, Input } from '@vkontakte/vkui';
import Checkbox from './Checkbox';
import Button from 'components/Button';

import { getCutNumber } from 'helpers';

const amounts = [50, 100, 200, 500];

const DonateForm = ({ className, onSubmit, onCancel, disabledSubmit }) => {
    const [checkedValue, setCheckedValue] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);

    function handleCheckedValueChange(e) {
        setError(null);

        const value = Number(e.target.value);
        if (value === checkedValue) {
            setCheckedValue('');
            return;
        }

        setCheckedValue(value);
    }

    function handleAmountChange(e) {
        setError(null);

        const value = e.target.value.trim();

        if (!isNaN(value)) {
            setAmount(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        let value = checkedValue;

        if (value === '') {
            value = Number(amount);
        }

        if (isNaN(value)) {
            setError('Введите корректное значение суммы либо выберите из предложенных');
            return;
        }

        if (value < 1) {
            setError('Введённая сумма должна быть больше нуля');
            return;
        }
        
        onSubmit(value);
    }

    function getCurrentAmount(prefix = ' ', postfix = ' ₽') {
        let value = checkedValue;

        if (value === '') {
            value = Number(amount);
        }

        if (isNaN(value) || value === 0) {
            return '';
        }

        if (value >= 1000000) {
            return `${prefix}${getCutNumber(value, 1000000, 'M')}${postfix}`;
        }

        if (value >= 1000) {
            return `${prefix}${getCutNumber(value, 1000, 'K')}${postfix}`;
        }

        return `${prefix}${value}${postfix}`;
    }

    return (
        <FormLayout className={classNames(className, 'DonateForm')} onSubmit={handleSubmit}>
            {(error) &&
                <FormStatus title={error} state="error" />}

            <div className="DonateForm__amounts">
                {amounts.map((value, key) =>
                    <Checkbox
                        className="DonateForm__Checkbox"
                        key={key}
                        value={value}
                        checked={value === checkedValue}
                        onChange={handleCheckedValueChange} />)}
            </div>

            <Input
                top="Или введите свою сумму (₽)"
                placeholder="550"
                value={amount}
                status={(error) && 'error'}
                onChange={handleAmountChange}
                disabled={checkedValue !== ''} />

            <div className="DonateForm__actions">
                <Button
                    className="DonateForm__action"
                    size="medium"
                    theme="info"
                    children="Отмена"
                    onClick={onCancel} />
                <Button
                    className="DonateForm__action"
                    type="submit"
                    size="medium"
                    theme="primary"
                    full
                    children={`Пожертвовать${getCurrentAmount()}`}
                    disabled={disabledSubmit} />
            </div>
        </FormLayout>
    );
};

DonateForm.propTypes = {
    className: string,
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
    disabledSubmit: bool
};

export default DonateForm;