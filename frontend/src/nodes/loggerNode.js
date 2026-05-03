// loggerNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'Logger',
    icon: '📋',
    handles: [
        { type: 'target', position: Position.Left, id: 'input' },
    ],
    fields: [
        {
            key: 'logLevel',
            label: 'Level',
            type: 'select',
            defaultValue: 'info',
            options: [
                { value: 'debug', label: 'Debug' },
                { value: 'info', label: 'Info' },
                { value: 'warn', label: 'Warning' },
                { value: 'error', label: 'Error' },
            ],
        },
    ],
};

export const LoggerNode = ({ id, data, selected }) => {
    return (
        <BaseNode id={id} data={data} selected={selected} config={config}>
            <p className="node-description">Logs data for debugging.</p>
        </BaseNode>
    );
};
