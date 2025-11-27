import React from 'react';
import { useCreatePost } from '../context/CreatePostContext';
import './RightSidebar.css';

const RightSidebar = () => {
    const { openCreatePostModal } = useCreatePost();

    const communities = [
        { id: 1, name: 'r/technology', members: '14m' },
        { id: 2, name: 'r/reactjs', members: '350k' },
        { id: 3, name: 'r/javascript', members: '2.1m' },
        { id: 4, name: 'r/webdev', members: '1.2m' },
        { id: 5, name: 'r/gaming', members: '30m' },
    ];

    return (
        <aside className="right-sidebar">
            {/* Home Card */}
            <div className="sidebar-card">
                <div className="home-banner"></div>
                <div className="home-content">
                    <div className="home-header">
                        <div className="home-snoo"></div>
                        <h3>Home</h3>
                    </div>
                    <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>

                    <button className="create-post-btn-large" onClick={openCreatePostModal}>
                        Create Post
                    </button>
                    <button className="create-community-btn">
                        Create Community
                    </button>
                </div>
            </div>

            {/* Premium Card */}
            <div className="sidebar-card premium-card">
                <div className="premium-content">
                    <div className="premium-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="premium-text">
                        <h3>Reddit Premium</h3>
                        <p>The best Reddit experience, with monthly Coins, exclusive awards, and no ads.</p>
                    </div>
                    <button className="premium-btn">Try Now</button>
                </div>
            </div>

            {/* Popular Communities */}
            <div className="sidebar-card">
                <div className="card-header">
                    <h3>POPULAR COMMUNITIES</h3>
                </div>
                <div className="community-list">
                    {communities.map((community) => (
                        <div key={community.id} className="community-item">
                            <div className="community-info">
                                <div className="community-icon"></div>
                                <div className="community-details">
                                    <span className="community-name">{community.name}</span>
                                    <span className="community-members">{community.members} members</span>
                                </div>
                            </div>
                            <button className="join-btn">Join</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Links */}
            <div className="sidebar-footer" style={{ padding: '12px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <span>User Agreement</span>
                    <span>Privacy Policy</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span>Content Policy</span>
                    <span>Moderator Code of Conduct</span>
                </div>
                <div style={{ marginTop: '12px' }}>
                    Reddit Inc © 2024. All rights reserved
                </div>
            </div>
        </aside>
    );
};

export default RightSidebar;
