import React from 'react';

import { Panel, PanelHeader, Group, Div, Button } from '@vkontakte/vkui';

export default function ({ id, goBack }) {
    return (
        <Panel id={id}>
            <PanelHeader>Finansing</PanelHeader>

            <Group title="Navigation Example">
                <Div>
                    <Button size="xl" level="2" onClick={goBack}>
                        Back
				    </Button>
                </Div>
            </Group>
        </Panel>
    );
};