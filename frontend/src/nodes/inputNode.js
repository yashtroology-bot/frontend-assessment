// inputNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'Input',
    icon: '📥',
    handles: [
        { type: 'source', position: Position.Right, id: 'value' },
    ],
    fields: [
        {
            key: 'inputName',
            label: 'Name',
            type: 'text',
            defaultValue: '',
        },
        {
            key: 'inputType',
            label: 'Type',
            type: 'select',
            defaultValue: 'Text',
            options: [
                { value: 'Text', label: 'Text' },
                { value: 'File', label: 'File' },
            ],
        },
    ],
};

export const InputNode = ({ id, data, selected }) => {
    // Use node id to generate a default name
    const nodeConfig = {
        ...config,
        fields: config.fields.map((f) =>
            f.key === 'inputName' && !data?.inputName
                ? { ...f, defaultValue: id.replace('customInput-', 'input_') }
                : f
        ),
    };

    return <BaseNode id={id} data={data} selected={selected} config={nodeConfig} />;
};
