import React, { ChangeEvent } from 'react';
import { ShapeType } from '../types';

interface HeaderProps {
    title?: string;
    onImport: (importedShapes: ShapeType[]) => void;
    onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = "Drawing App", onImport, onExport }) => {
    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const result = reader.result;
                if (typeof result === 'string') {
                    const shapes = JSON.parse(result);
                    if (Array.isArray(shapes)) {
                        onImport(shapes);
                    } else {
                        alert("Invalid file format.");
                    }
                } else {
                    alert("Failed to read file.");
                }
            } catch {
                alert("Failed to import shapes.");
            }
        };
        reader.readAsText(file);
        // Reset input value to allow re-importing the same file
        e.target.value = '';
    };

    return (
        <header className="header">
            <h1>{title}</h1>
            <div className="header-buttons">
                <input
                    id="import-file"
                    type="file"
                    accept="application/json"
                    style={{ display: 'none' }}
                    onChange={handleImport}
                />
                <button onClick={() => document.getElementById('import-file')?.click()}>
                    Import
                </button>
                <button onClick={onExport}>Export</button>
            </div>
        </header>
    );
};

export default Header;