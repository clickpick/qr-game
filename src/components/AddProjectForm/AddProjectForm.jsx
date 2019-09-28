import React from 'react';

import { FormLayout, Input, Textarea } from '@vkontakte/vkui';
import Button from 'components/Button';

export default class AddProjectForm extends React.Component {
    state = {};

    render() {
        return (
            <FormLayout>
                <Input
                    top="Название проекта"
                    placeholder="Борьба за тигра" />
                <Textarea
                    top="Описание проекта"
                    placeholder="Кому вы хотите помочь и каким образом, на что пойдут собранные средства?" />
                <Input
                    top="Сколько нужно собрать (в ₽)"
                    placeholder="например, 200000" />
                <Input
                    top="Приз за победу в проекте"
                    placeholder="Сумма, предмет или событие" />
                <Input
                    top="Подробнее о фонде"
                    placeholder="Укажите ссылку на сайт или опишите фонд" />
                <Input
                    top="Контакты для связи"
                    placeholder="Эл.почта, мессенджеры или соцсети" />

                <Button
                    type="submit"
                    size="medium"
                    theme="primary"
                    full
                    children="Подать заявку" />
            </FormLayout>
        );
    }
}