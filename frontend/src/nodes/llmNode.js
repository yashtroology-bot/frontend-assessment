// llmNode.js

import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

const config = {
    label: 'LLM',
    icon: '🤖',
    handles: [
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' },
    ],
    fields: [],
};

export const LLMNode = ({ id, data, selected }) => {
    return (
        <BaseNode id={id} data={data} selected={selected} config={config}>
            <p className="node-description">This is a LLM.</p>
        </BaseNode>
    );
};
