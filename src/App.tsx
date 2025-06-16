import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Counter from './components/Counter';
import { ShapeType } from './types';

const App: React.FC = () => {
    const [shapes, setShapes] = useState<ShapeType[]>([]);
    const [selectedShape, setSelectedShape] = useState<string | null>(null);

    const addShape = (shape: ShapeType) => {
        setShapes([...shapes, shape]);
    };

    const deleteShape = (id: string) => {
        setShapes(shapes.filter(shape => shape.id !== id));
    };

    const exportShapes = () => {
        const json = JSON.stringify(shapes);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'drawing.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const importShapes = (importedShapes: ShapeType[]) => {
        setShapes(importedShapes);
    };

    return (
        <div className="app">
            <Header 
                onExport={exportShapes} 
                onImport={importShapes} 
            />
            <div className="main-container">
                <Sidebar 
                    selectedShape={selectedShape} 
                    setSelectedShape={setSelectedShape} 
                    addShape={addShape} 
                />
                <Canvas 
                    shapes={shapes} 
                    deleteShape={deleteShape} 
                    selectedShape={selectedShape}
                    addShape={addShape}
                    setSelectedShape={setSelectedShape}
                />
            </div>
            <Counter shapes={shapes} />
        </div>
    );
};

export default App;