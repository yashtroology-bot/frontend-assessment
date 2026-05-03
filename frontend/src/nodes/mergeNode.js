// mergeNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'Merge',
    icon: '🔗',
    handles: [
        { type: 'target', position: Position.Left, id: 'input-a', style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: 'input-b', style: { top: '65%' } },
        { type: 'source', position: Position.Right, id: 'output' },
    ],
    fields: [
        {
            key: 'strategy',
            label: 'Strategy',
            type: 'select',
            defaultValue: 'concat',
            options: [
                { value: 'concat', label: 'Concatenate' },
                { value: 'merge', label: 'Merge Objects' },
                { value: 'zip', label: 'Zip' },
            ],
        },
    ],
};

export const MergeNode = ({ id, data, selected }) => {
    return <BaseNode id={id} data={data} selected={selected} config={config} />;
};
