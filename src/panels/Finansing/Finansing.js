import React from 'react';

import { Panel, Group, Div, Button } from '@vkontakte/vkui';

export default function ({ id, goBack }) {
    return (
        <Panel id={id}>
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