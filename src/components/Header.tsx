import React, { ChangeEvent } from 'react';
import { ShapeType } from '../types';

interface HeaderProps {
    paintingName: string;
    setPaintingName: (name: string) => void;
    onImport: (imported: any) => void;
    onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ paintingName, setPaintingName, onImport, onExport }) => {
    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const result = reader.result;
                if (typeof result === 'string') {
                    const data = JSON.parse(result);
                    onImport(data);
                } else {
                    alert("Failed to read file.");
                }
            } catch {
                alert("Failed to import painting.");
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    return (
        <header className="header">
            <input
                type="text"
                value={paintingName}
                onChange={e => setPaintingName(e.target.value)}
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    border: 'none',
                    background: 'transparent',
                    color: '#fff',
                    outline: 'none',
                    marginRight: 16,
                    maxWidth: 300
                }}
                aria-label="Painting name"
            />
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