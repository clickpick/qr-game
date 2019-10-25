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
            setErrors(errors => Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
            return;
        }

        if (isNaN(values.goal_funds)) {
            setErrorMessage('Значение суммы сборов должно быть числом');
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
            {(errorMessage) && <FormStatus title={errorMessage} state="error" />}

            <Input
                type="text"
                name="name"
                top="Название проекта"
                placeholder="Борьба за тигра"
                value={values.name || ''}
                status={(errors.name) ? 'error' : undefined}
                onChange={handleChange} />
            <Textarea
                name="description"
                top="Описание проекта"
                value={values.description || ''}
                placeholder="Кому вы хотите помочь и каким образом, на что пойдут собранные средства?"
                status={(errors.description) ? 'error' : undefined}
                onChange={handleChange} />
            <Input
                name="goal_funds"
                pattern="[0-9]*"
                top="Сколько нужно собрать (в ₽)"
                placeholder="Например, 200000"
                value={values.goal_funds || ''}
                status={(errors.goal_funds) ? 'error' : undefined}
                onChange={handleChange} />
            <Input
                name="prize"
                top="Приз за победу в проекте"
                placeholder="Сумма, предмет или событие"
                value={values.prize || ''}
                status={(errors.prize) ? 'error' : undefined}
                onChange={handleChange} />
            <Textarea
                name="link"
                top="Подробнее о фонде"
                placeholder="Опишите фонд или укажите ссылку на сайт"
                value={values.link || ''}
                status={(errors.link) ? 'error' : undefined}
                onChange={handleChange} />
            <Input
                name="contact"
                top="Контакты для связи"
                placeholder="Эл. почта, мессенджеры или соцсети"
                value={values.contact || ''}
                status={(errors.contact) ? 'error' : undefined}
                onChange={handleChange} />

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