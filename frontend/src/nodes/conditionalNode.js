// conditionalNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'Conditional',
    icon: '🔀',
    handles: [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '65%' } },
    ],
    fields: [
        {
            key: 'condition',
            label: 'Condition',
            type: 'text',
            defaultValue: 'value > 0',
        },
    ],
};

export const ConditionalNode = ({ id, data, selected }) => {
    return <BaseNode id={id} data={data} selected={selected} config={config} />;
};
