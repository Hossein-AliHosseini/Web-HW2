import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Counter from './components/Counter';
import { ShapeType, PaintingData } from './types';

const App: React.FC = () => {
    const [shapes, setShapes] = useState<ShapeType[]>([]);
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [paintingName, setPaintingName] = useState<string>('Untitled Painting');

    const addShape = (shape: ShapeType) => {
        setShapes([...shapes, shape]);
    };

    const deleteShape = (id: string) => {
        setShapes(shapes.filter(shape => shape.id !== id));
    };

    const exportShapes = () => {
        const paintingData: PaintingData = {
            name: paintingName,
            shapes,
        };
        const json = JSON.stringify(paintingData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${paintingName || 'drawing'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importShapes = (imported: PaintingData | ShapeType[]) => {
        if (Array.isArray(imported)) {
            setShapes(imported);
            setPaintingName('Untitled Painting');
        } else if (imported && typeof imported === 'object' && Array.isArray(imported.shapes)) {
            setShapes(imported.shapes);
            setPaintingName(imported.name || 'Untitled Painting');
        } else {
            alert('Invalid file format.');
        }
    };

    return (
        <div className="app">
            <Header 
                paintingName={paintingName}
                setPaintingName={setPaintingName}
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