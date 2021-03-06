import React, { useState } from 'react';
import { bool, func } from 'prop-types';

import { FormLayout, FormStatus, Input, Textarea } from '@vkontakte/vkui';
import Button from 'components/Button';

import './RequestFundingForm.css';

import useForm from 'hooks/use-form';

const INITIAL_STATE = {
    name: '',
    description: '',
    goal_funds: '',
    prize: '',
    link: '',
    contact: ''
};

const RequestFundingForm = ({ onSubmit, disabledSubmit }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [errors, setErrors] = useState(INITIAL_STATE);
    const [handleSubmit, handleChange, isValid, values] = useForm(submitCallback, changeCallback, INITIAL_STATE);

    function changeCallback(e) {
        setErrorMessage(null);
        setErrors(errors => ({ ...errors, [e.target.name]: false }));
    }

    function submitCallback(values) {
        if (!isValid()) {
            setErrorMessage('Заполните все поля');
            setErrors(errors => Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: !values[key] }), {}));

            return;
        }

        if (isNaN(values.goal_funds)) {
            setErrorMessage('Значение суммы сборов должно быть числом');
            setErrors(errors => ({ ...errors, goal_funds: true }));
            return;
        }

        if (values.goal_funds.indexOf('0') === 0) {
            setErrorMessage('Некорректное значение суммы сборов');
            setErrors(errors => ({ ...errors, goal_funds: true }));
            return;
        }

        const goal = Number(values.goal_funds);

        if (goal < 1) {
            setErrorMessage('Значение суммы сборов должно быть больше 1');
            setErrors(errors => ({ ...errors, goal_funds: true }));
            return;
        }

        if (goal > 2147483648 * 2) {
            setErrorMessage('Введите сумму сборов поменьше');
            setErrors(errors => ({ ...errors, goal_funds: true }));
            return;
        }

        if (onSubmit) {
            onSubmit({
                ...values,
                goal_funds: Number(goal.toFixed(0))
            });
        }
    }

    return (
        <FormLayout>
            <Input
                type="text"
                name="name"
                top="Название проекта"
                placeholder="Борьба за тигра"
                maxLength="250"
                value={values.name || ''}
                status={(errors.name) ? 'error' : undefined}
                onChange={handleChange} />
            <Textarea
                name="description"
                top="Описание проекта"
                value={values.description || ''}
                placeholder="Кому Вы хотите помочь и каким образом, на что пойдут собранные средства?"
                status={(errors.description) ? 'error' : undefined}
                onChange={handleChange} />
            <Input
                name="goal_funds"
                pattern="[0-9]*"
                inputMode="numeric"
                top="Сколько нужно собрать (в ₽)"
                placeholder="Например, 200000"
                maxLength="10"
                value={values.goal_funds || ''}
                status={(errors.goal_funds) ? 'error' : undefined}
                onChange={handleChange} />
            <Input
                name="prize"
                top="Приз за победу в проекте"
                placeholder="Сумма, предмет или событие"
                maxLength="250"
                value={values.prize || ''}
                status={(errors.prize) ? 'error' : undefined}
                onChange={handleChange} />
            <Textarea
                name="link"
                top="Подробнее о фонде"
                placeholder="Опишите фонд или укажите ссылку на сайт"
                maxLength="250"
                value={values.link || ''}
                status={(errors.link) ? 'error' : undefined}
                onChange={handleChange} />
            <Input
                name="contact"
                top="Контакты для связи"
                placeholder="Эл. почта, мессенджеры или соц. сети"
                maxLength="250"
                value={values.contact || ''}
                status={(errors.contact) ? 'error' : undefined}
                onChange={handleChange} />

            {(errorMessage) && <FormStatus title={errorMessage} state="error" />}

            <Button
                className="RequestFundingForm__Button"
                type="submit"
                size="medium"
                theme="primary"
                full
                children="Подать заявку"
                onClick={handleSubmit}
                disabled={disabledSubmit} />
        </FormLayout>
    );
};

RequestFundingForm.propTypes = {
    onSubmit: func,
    disabledSubmit: bool
};

export default RequestFundingForm;