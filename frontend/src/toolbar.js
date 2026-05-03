// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-title">
                <span className="toolbar-logo">⚡</span>
                <h1>VectorShift Pipeline Builder</h1>
            </div>
            <div className="toolbar-nodes">
                {/* Original Nodes */}
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='text' label='Text' icon='📝' />

                {/* New Nodes */}
                <DraggableNode type='api' label='API' icon='🌐' />
                <DraggableNode type='conditional' label='Conditional' icon='🔀' />
                <DraggableNode type='merge' label='Merge' icon='🔗' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='logger' label='Logger' icon='📋' />
            </div>
        </div>
    );
};
