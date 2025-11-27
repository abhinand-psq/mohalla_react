import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-section">
                <h3 className="sidebar-title">Feeds</h3>
                <Link to="/" className="sidebar-item active">
                    <span className="icon">🏠</span>
                    Home
                </Link>
                <Link to="/r/popular" className="sidebar-item">
                    <span className="icon">🔥</span>
                    Popular
                </Link>
            </div>

            <div className="sidebar-section">
                <h3 className="sidebar-title">Recent</h3>
                <Link to="/r/reactjs" className="sidebar-item">
                    <span className="icon">r/</span>
                    r/reactjs
                </Link>
                <Link to="/r/javascript" className="sidebar-item">
                    <span className="icon">r/</span>
                    r/javascript
                </Link>
                <Link to="/r/webdev" className="sidebar-item">
                    <span className="icon">r/</span>
                    r/webdev
                </Link>
            </div>

            <div className="sidebar-section">
                <h3 className="sidebar-title">Communities</h3>
                <Link to="/r/gaming" className="sidebar-item">
                    <span className="icon">🎮</span>
                    r/gaming
                </Link>
                <Link to="/r/sports" className="sidebar-item">
                    <span className="icon">⚽</span>
                    r/sports
                </Link>
                <Link to="/r/technology" className="sidebar-item">
                    <span className="icon">💻</span>
                    r/technology
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
