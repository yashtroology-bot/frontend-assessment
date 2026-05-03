// BaseNode.js
// Config-driven base node abstraction for all pipeline nodes.
// Adding a new node = defining a config object + wrapping in BaseNode.

import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Renders a single form field based on its config
const NodeField = ({ field, value, onChange }) => {
    switch (field.type) {
        case 'select':
            return (
                <label className="node-field">
                    <span className="node-field-label">{field.label}</span>
                    <select
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="nodrag node-select"
                    >
                        {field.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </label>
            );
        case 'number':
            return (
                <label className="node-field">
                    <span className="node-field-label">{field.label}</span>
                    <input
                        type="number"
                        value={value}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        onChange={(e) => onChange(field.key, Number(e.target.value))}
                        className="nodrag node-input"
                    />
                </label>
            );
        case 'text':
        default:
            return (
                <label className="node-field">
                    <span className="node-field-label">{field.label}</span>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="nodrag node-input"
                    />
                </label>
            );
    }
};

export const BaseNode = ({ id, data, selected, config, children }) => {
    const { label, icon, handles = [], fields = [] } = config;
    const updateNodeField = useStore((state) => state.updateNodeField);

    // Initialize field values from data or defaults
    const [fieldValues, setFieldValues] = useState(() => {
        const initial = {};
        fields.forEach((f) => {
            initial[f.key] = data?.[f.key] ?? f.defaultValue ?? '';
        });
        return initial;
    });

    const handleFieldChange = useCallback(
        (key, value) => {
            setFieldValues((prev) => ({ ...prev, [key]: value }));
            updateNodeField(id, key, value);
        },
        [id, updateNodeField]
    );

    return (
        <div className={`base-node ${selected ? 'selected' : ''}`}>
            {/* Render configured handles */}
            {handles.map((h, i) => (
                <Handle
                    key={h.id || `${id}-handle-${i}`}
                    type={h.type}
                    position={h.position || (h.type === 'source' ? Position.Right : Position.Left)}
                    id={h.id}
                    style={h.style}
                    className="node-handle"
                />
            ))}

            {/* Header */}
            <div className="node-header">
                {icon && <span className="node-icon">{icon}</span>}
                <span className="node-label">{label}</span>
            </div>

            {/* Body */}
            <div className="node-body">
                {/* Config-driven fields */}
                {fields.map((field) => (
                    <NodeField
                        key={field.key}
                        field={field}
                        value={fieldValues[field.key]}
                        onChange={handleFieldChange}
                    />
                ))}

                {/* Custom children (e.g., TextNode's textarea) */}
                {children}
            </div>
        </div>
    );
};
