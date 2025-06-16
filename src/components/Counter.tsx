import React from 'react';
import { ShapeType } from '../types';

interface CounterProps {
    shapes: ShapeType[];
}

const Counter: React.FC<CounterProps> = ({ shapes }) => {
    // Remove the type assertion from the reducer
    const counts = shapes.reduce((acc: { [key: string]: number }, shape) => {
        acc[shape.type] = (acc[shape.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="counter" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontWeight: 'bold', color: '#4F8A8B' }}>🟢 Circle: <span style={{ color: '#222' }}>{counts.circle || 0}</span></span>
            <span style={{ fontWeight: 'bold', color: '#F9A826' }}>🟧 Square: <span style={{ color: '#222' }}>{counts.square || 0}</span></span>
            <span style={{ fontWeight: 'bold', color: '#E23E57' }}>🔺 Triangle: <span style={{ color: '#222' }}>{counts.triangle || 0}</span></span>
        </div>
    );
};

export default Counter;