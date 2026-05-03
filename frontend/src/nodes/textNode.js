// textNode.js
// Special node with dynamic resizing and {{ variable }} handle detection.

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data, selected }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const textareaRef = useRef(null);
    const updateNodeField = useStore((state) => state.updateNodeField);

    // Dynamic resizing: auto-adjust textarea height on every text change
    useEffect(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    }, [currText]);

    // Parse {{ variable }} patterns from text
    const variables = useMemo(() => {
        const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
        const found = new Set();
        let match;
        while ((match = regex.exec(currText)) !== null) {
            found.add(match[1]);
        }
        return Array.from(found);
    }, [currText]);

    const handleTextChange = (e) => {
        setCurrText(e.target.value);
        updateNodeField(id, 'text', e.target.value);
    };

    return (
        <div className={`base-node text-node ${selected ? 'selected' : ''}`}>
            {/* Dynamic variable handles on the left */}
            {variables.map((varName, index) => (
                <Handle
                    key={`${id}-var-${varName}`}
                    type="target"
                    position={Position.Left}
                    id={`${id}-var-${varName}`}
                    style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
                    className="node-handle variable-handle"
                />
            ))}

            {/* Fixed output handle on the right */}
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
                className="node-handle"
            />

            {/* Header */}
            <div className="node-header">
                <span className="node-icon">📝</span>
                <span className="node-label">Text</span>
            </div>

            {/* Body */}
            <div className="node-body">
                <label className="node-field">
                    <span className="node-field-label">Content</span>
                    <textarea
                        ref={textareaRef}
                        value={currText}
                        onChange={handleTextChange}
                        className="nodrag node-textarea"
                        rows={1}
                        placeholder="Type text... use {{variable}} for dynamic handles"
                    />
                </label>

                {/* Show parsed variables */}
                {variables.length > 0 && (
                    <div className="text-node-vars">
                        {variables.map((v) => (
                            <span key={v} className="text-node-var-tag">{v}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
