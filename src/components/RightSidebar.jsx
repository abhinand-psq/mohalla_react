import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateCommunityModal from './CreateCommunityModal';
import { useCreatePost } from '../context/CreatePostContext';
import './RightSidebar.css';

const RightSidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { openCreatePostModal } = useCreatePost();

    const trendingCommunities = [
        { name: 'r/69216f71ae7ef35aba67df11?', members: '12.4M' },
        { name: 'r/gaming', members: '35.2M' },
        { name: 'r/programming', members: '6.1M' },
        { name: 'r/science', members: '28.5M' },
        { name: 'r/worldnews', members: '31.2M' },
    ];

    return (
        <aside className="right-sidebar">
            <div className="sidebar-card">
                <div className="card-header">
                    <h3>Trending Communities</h3>
                </div>
                <div className="community-list">
                    {trendingCommunities.map((community, index) => (
                        <div key={index} className="community-item">
                            <Link to={`/${community.name}`} className="community-info">
                                <div className="community-icon"></div>
                                <div className="community-details">
                                    <span className="community-name">{community.name}</span>
                                    <span className="community-members">{community.members} members</span>
                                </div>
                            </Link>
                            <button className="join-btn">Join</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sidebar-card premium-card">
                <div className="premium-content">
                    <div className="premium-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div className="premium-text">
                        <h3>Reddit Premium</h3>
                        <p>Enjoy an ad-free experience, exclusive badges, and more.</p>
                    </div>
                    <button className="premium-btn">Try Now</button>
                </div>
            </div>

            <div className="sidebar-card home-card">
                <div className="home-banner"></div>
                <div className="home-content">
                    <div className="home-header">
                        <div className="home-snoo"></div>
                        <h3>Home</h3>
                    </div>
                    <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
                    <button className="create-post-btn-large" onClick={openCreatePostModal}>Create Post</button>
                    <button className="create-community-btn" onClick={() => setIsModalOpen(true)}>Create Community</button>
                </div>
            </div>

            <CreateCommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </aside>
    );
};

export default RightSidebar;
