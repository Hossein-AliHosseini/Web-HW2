import React, { ChangeEvent } from 'react';

interface HeaderProps {
    paintingName: string;
    setPaintingName: (name: string) => void;
    onExport: () => void;
    onImport: () => void;
    username: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ paintingName, setPaintingName, onExport, onImport, username, onLogout }) => {
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
                <span style={{ color: '#fff', marginRight: '1rem' }}>Logged in as: {username}</span>
                <button onClick={onExport}>Save</button>
                <button onClick={onImport}>Import</button>
                <button onClick={onLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;