// outputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'Output',
    icon: '📤',
    handles: [
        { type: 'target', position: Position.Left, id: 'value' },
    ],
    fields: [
        {
            key: 'outputName',
            label: 'Name',
            type: 'text',
            defaultValue: '',
        },
        {
            key: 'outputType',
            label: 'Type',
            type: 'select',
            defaultValue: 'Text',
            options: [
                { value: 'Text', label: 'Text' },
                { value: 'Image', label: 'Image' },
            ],
        },
    ],
};

export const OutputNode = ({ id, data, selected }) => {
    const nodeConfig = {
        ...config,
        fields: config.fields.map((f) =>
            f.key === 'outputName' && !data?.outputName
                ? { ...f, defaultValue: id.replace('customOutput-', 'output_') }
                : f
        ),
    };

    return <BaseNode id={id} data={data} selected={selected} config={nodeConfig} />;
};
