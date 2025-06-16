import React from 'react';
import { ShapeType } from '../types';

interface SidebarProps {
    selectedShape: string | null;
    setSelectedShape: (shape: string | null) => void;
    addShape: (shape: ShapeType) => void;
}

const shapeOptions = [
    { id: 'circle', label: 'Circle', emoji: '🟢' },
    { id: 'square', label: 'Square', emoji: '🟧' },
    { id: 'triangle', label: 'Triangle', emoji: '🔺' },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedShape, setSelectedShape }) => {
    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, shapeId: string) => {
        e.dataTransfer.setData('shapeType', shapeId);
    };

    return (
        <aside className="sidebar" style={{ width: 150, padding: 16, borderRight: '1px solid #ccc' }}>
            <h3>Shapes</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {shapeOptions.map(shape => (
                    <li
                        key={shape.id}
                        draggable
                        onDragStart={e => handleDragStart(e, shape.id)}
                        style={{
                            margin: '8px 0',
                            cursor: 'grab',
                            fontWeight: selectedShape === shape.id ? 'bold' : 'normal',
                            color: selectedShape === shape.id ? '#1976d2' : '#333',
                            userSelect: 'none'
                        }}
                        onClick={() => setSelectedShape(selectedShape === shape.id ? null : shape.id)}
                    >
                        <span style={{ marginRight: 8 }}>{shape.emoji}</span>
                        {shape.label}
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: 24, fontSize: 12, color: '#888' }}>
                <div>Click or drag a shape, then drop on the canvas to add.</div>
                <div>Double-click a shape on canvas to delete.</div>
            </div>
        </aside>
    );
};

export default Sidebar;