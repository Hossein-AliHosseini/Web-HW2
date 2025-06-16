import React, { useEffect, useRef } from 'react';
import { ShapeType } from '../types';

interface CanvasProps {
    shapes: ShapeType[];
    deleteShape: (id: string) => void;
    selectedShape: string | null;
    addShape: (shape: ShapeType) => void;
    setSelectedShape: (shape: string | null) => void;
}

const DEFAULT_SIZE = 60;
const allowedTypes = ['circle', 'square', 'triangle'];

const Canvas: React.FC<CanvasProps> = ({
    shapes,
    deleteShape,
    selectedShape,
    addShape,
    setSelectedShape
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Make canvas fill parent
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth - 180; // leave space for sidebar
                canvasRef.current.height = window.innerHeight - 120; // leave space for header/counter
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (selectedShape !== 'circle' && selectedShape !== 'square' && selectedShape !== 'triangle') return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addShape({
                id: Date.now().toString(),
                type: selectedShape,
                x: x - DEFAULT_SIZE / 2,
                y: y - DEFAULT_SIZE / 2,
                width: DEFAULT_SIZE,
                height: DEFAULT_SIZE,
                color: selectedShape === 'circle' ? 'green' : selectedShape === 'square' ? 'orange' : 'red'
            });
            setSelectedShape(null);
        }
    };

    const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const shape = shapes.find(shape =>
                x >= shape.x && x <= shape.x + shape.width &&
                y >= shape.y && y <= shape.y + shape.height
            );
            if (shape) {
                deleteShape(shape.id);
            }
        }
    };

    // Drag and Drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const shapeType = e.dataTransfer.getData('shapeType');
        if (shapeType !== 'circle' && shapeType !== 'square' && shapeType !== 'triangle') return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addShape({
                id: Date.now().toString(),
                type: shapeType, // Now TypeScript knows this is safe
                x: x - DEFAULT_SIZE / 2,
                y: y - DEFAULT_SIZE / 2,
                width: DEFAULT_SIZE,
                height: DEFAULT_SIZE,
                color: shapeType === 'circle' ? 'green' : shapeType === 'square' ? 'orange' : 'red'
            });
        }
    };

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            shapes.forEach(shape => {
                ctx.fillStyle = shape.color || 'black';
                if (shape.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(shape.x + shape.width / 2, shape.y + shape.height / 2, shape.width / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (shape.type === 'square') {
                    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                } else if (shape.type === 'triangle') {
                    ctx.beginPath();
                    ctx.moveTo(shape.x + shape.width / 2, shape.y);
                    ctx.lineTo(shape.x, shape.y + shape.height);
                    ctx.lineTo(shape.x + shape.width, shape.y + shape.height);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        }
    }, [shapes]);

    return (
        <div
            style={{ flex: 1, height: '100%', display: 'flex' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
                onClick={handleCanvasClick}
                onDoubleClick={handleDoubleClick}
            />
        </div>
    );
};

export default Canvas;