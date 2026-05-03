// apiNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'API Request',
    icon: '🌐',
    handles: [
        { type: 'target', position: Position.Left, id: 'body' },
        { type: 'source', position: Position.Right, id: 'response' },
    ],
    fields: [
        {
            key: 'method',
            label: 'Method',
            type: 'select',
            defaultValue: 'GET',
            options: [
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
                { value: 'PUT', label: 'PUT' },
                { value: 'DELETE', label: 'DELETE' },
            ],
        },
        {
            key: 'url',
            label: 'URL',
            type: 'text',
            defaultValue: 'https://api.example.com',
        },
    ],
};

export const APINode = ({ id, data, selected }) => {
    return <BaseNode id={id} data={data} selected={selected} config={config} />;
};
