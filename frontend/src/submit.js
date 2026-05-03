// submit.js

import { useStore } from './store';
import { useState } from 'react';

export const SubmitButton = () => {
    // Direct selectors instead of selector + shallow
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://frontend-assessment-92ad.onrender.com/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            alert(
                `Pipeline Analysis\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? '✅ Yes' : '❌ No (cycle detected)'}`
            );
        } catch (error) {
            alert(`Error: ${error.message}\n\nMake sure the backend is live on Render.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-container">
            <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Analyzing...' : 'Submit Pipeline'}
            </button>
        </div>
    );
};
