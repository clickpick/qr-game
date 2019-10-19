import React from 'react';
import { bool, func } from 'prop-types';

import { FormLayout, Input, Textarea } from '@vkontakte/vkui';
import Button from 'components/Button';

import './RequestFundingForm.css';

export default class RequestFundingForm extends React.Component {
    static propTypes = {
        onSubmit: func,
        disabledSubmit: bool
    };

    state = {
        name: '',
        description: '',
        goal_funds: '',
        prize: '',
        link: '',
        contact: '',

        showError: false,
    };

    render() {
        const { name, description, goal_funds, prize, link, contact, showError } = this.state;

        return (
            <FormLayout>
                <Input
                    name="name"
                    top="Название проекта"
                    placeholder="Борьба за тигра"
                    status={(showError && !name) ? 'error' : undefined}
                    onChange={this.onChange} />
                <Textarea
                    name="description"
                    top="Описание проекта"
                    placeholder="Кому вы хотите помочь и каким образом, на что пойдут собранные средства?"
                    status={(showError && !description) ? 'error' : undefined}
                    onChange={this.onChange} />
                <Input
                    name="goal_funds"
                    top="Сколько нужно собрать (в ₽)"
                    placeholder="Например, 200000"
                    status={(showError && !goal_funds) ? 'error' : undefined}
                    onChange={this.onChange} />
                <Input
                    name="prize"
                    top="Приз за победу в проекте"
                    placeholder="Сумма, предмет или событие"
                    status={(showError && !prize) ? 'error' : undefined}
                    onChange={this.onChange} />
                <Textarea
                    name="link"
                    top="Подробнее о фонде"
                    placeholder="Опишите фонд или укажите ссылку на сайт"
                    status={(showError && !link) ? 'error' : undefined}
                    onChange={this.onChange} />
                <Input
                    name="contact"
                    top="Контакты для связи"
                    placeholder="Эл. почта, мессенджеры или соцсети"
                    status={(showError && !contact) ? 'error' : undefined}
                    onChange={this.onChange} />

                <Button
                    className="RequestFundingForm__Button"
                    type="submit"
                    size="medium"
                    theme="primary"
                    full
                    children="Подать заявку"
                    onClick={this.onSubmit}
                    disabled={this.props.disabledSubmit} />
            </FormLayout>
        );
    }

    onSubmit = (e) => {
        e.preventDefault();

        const valid = this.validateForm();
        this.setState({ showError: !valid });

        if (valid) {
            const { name, description, goal_funds, prize, link, contact } = this.state;
            
            if (this.props.onSubmit) {
                this.props.onSubmit({
                    name, description, goal_funds, prize, link, contact
                });
            }
        }
    }

    onChange = (e) => {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value });
    }

    validateForm = () => {
        const { name, description, goal_funds, prize, link, contact } = this.state;

        return Boolean(name && description && goal_funds && prize && link && contact);
    }
}