import React from 'react';

interface ShapeProps {
    shapeType: 'circle' | 'square' | 'triangle';
    position: { x: number; y: number };
    onDelete: () => void;
}

const Shape: React.FC<ShapeProps> = ({ shapeType, position, onDelete }) => {
    const handleDoubleClick = () => {
        onDelete();
    };

    const renderShape = () => {
        switch (shapeType) {
            case 'circle':
                return <circle cx={position.x} cy={position.y} r="20" fill="blue" />;
            case 'square':
                return <rect x={position.x - 20} y={position.y - 20} width="40" height="40" fill="green" />;
            case 'triangle':
                return (
                    <polygon
                        points={`${position.x},${position.y - 20} ${position.x - 20},${position.y + 20} ${position.x + 20},${position.y + 20}`}
                        fill="red"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <g onDoubleClick={handleDoubleClick}>
            {renderShape()}
        </g>
    );
};

export default Shape;