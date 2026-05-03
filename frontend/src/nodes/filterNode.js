// filterNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'Filter',
    icon: '🔍',
    handles: [
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
    ],
    fields: [
        {
            key: 'filterType',
            label: 'Operation',
            type: 'select',
            defaultValue: 'contains',
            options: [
                { value: 'contains', label: 'Contains' },
                { value: 'startsWith', label: 'Starts With' },
                { value: 'regex', label: 'Regex Match' },
                { value: 'length', label: 'Length >' },
            ],
        },
        {
            key: 'filterValue',
            label: 'Value',
            type: 'text',
            defaultValue: '',
        },
    ],
};

export const FilterNode = ({ id, data, selected }) => {
    return <BaseNode id={id} data={data} selected={selected} config={config} />;
};
