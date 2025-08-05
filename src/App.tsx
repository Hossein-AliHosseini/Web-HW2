import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Counter from './components/Counter';
import { ShapeType, PaintingData } from './types';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
    const [shapes, setShapes] = useState<ShapeType[]>([]);
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [paintingName, setPaintingName] = useState<string>('Untitled Painting');
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username') || null);

    const addShape = (shape: ShapeType) => {
        setShapes([...shapes, shape]);
    };

    const deleteShape = (id: string) => {
        setShapes(shapes.filter(shape => shape.id !== id));
    };

    const saveDrawing = async () => {
        if (!username) {
            alert('Please login to save.');
            return;
        }
        const paintingData: PaintingData = {
            name: paintingName,
            shapes,
        };
        try {
            const response = await fetch(`http://localhost:8080/api/drawing?username=${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paintingData),
            });
            if (response.ok) {
                alert('Drawing saved!');
            } else {
                alert('Failed to save drawing.');
            }
        } catch (error) {
            alert('Error saving drawing: ' + error);
        }
    };

    const fetchDrawing = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/drawing?username=${username}`);
            if (response.ok) {
                const text = await response.text();
                if (text) {
                    try {
                        const imported: PaintingData = JSON.parse(text);
                        setShapes(imported.shapes);
                        setPaintingName(imported.name || 'Untitled Painting');
                    } catch (e) {
                        console.error("Error parsing JSON:", e);
                        alert("Error parsing drawing data.");
                    }
                } else {
                    setShapes([]);
                    setPaintingName('Untitled Painting');
                }
            } else {
                alert('Failed to load drawing.');
            }
        } catch (error) {
            alert('Error loading drawing: ' + error);
        }
    };

    const handleLogin = (user: string) => {
        setUsername(user);
        // No initial fetch here
    };

    const handleLogout = () => {
        setUsername(null);
        setShapes([]);
        setPaintingName('Untitled Painting');
    };

    const handleImport = () => {
        if (!username) {
            alert('Please login to import.');
            return;
        }
        fetchDrawing(username);
    };

    return (
        <div className="app">
            {username ? (
                <>
                    <Header
                        paintingName={paintingName}
                        setPaintingName={setPaintingName}
                        onExport={saveDrawing}
                        onImport={handleImport}
                        username={username}
                        onLogout={handleLogout}
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
                </>
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;