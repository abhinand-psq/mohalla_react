import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import { useCreatePost } from '../context/CreatePostContext';
import './CommunityPage.css';

const CommunityPage = () => {
    const { subreddit } = useParams();
    const [activeTab, setActiveTab] = useState('Posts');
    const { openCreatePostModal } = useCreatePost();

    // Mock data based on the subreddit
    const communityData = {
        title: `r/${subreddit}`,
        subtitle: `r/${subreddit}`,
        members: '12.4M',
        online: '42.3k',
        description: `Subreddit dedicated to the news and discussions about the creation and use of ${subreddit} and its surrounding issues.`,
        created: 'Jan 25, 2008',
        bannerColor: '#33a8ff',
        iconColor: '#0079d3'
    };

    const rules = [
        "Follow Reddiquette",
        "No personal information",
        "No editorialized titles",
        "No old news",
        "No images/videos"
    ];

    const moderators = [
        "moderator1",
        "moderator2",
        "moderator3"
    ];

    const posts = [
        {
            id: 1,
            subreddit: subreddit,
            author: 'techEnthusiast42',
            time: '4 hours ago',
            title: `New breakthrough in ${subreddit} allows computers to understand context better than ever`,
            content: 'Researchers at MIT have developed a new neural network architecture that significantly improves contextual understanding...',
            votes: 15200,
            comments: 892
        },
        {
            id: 2,
            subreddit: subreddit,
            author: 'futureNow',
            time: '7 hours ago',
            title: `Apple announces new privacy features in iOS 18 related to ${subreddit}`,
            content: 'The latest update includes end-to-end encryption for all iCloud data and advanced tracking prevention...',
            votes: 9900,
            comments: 543
        },
        {
            id: 3,
            subreddit: subreddit,
            author: 'gadgetReviewer',
            time: '10 hours ago',
            title: `Tesla's new battery technology promises 500-mile range`,
            content: 'The company unveiled its latest battery technology at the shareholder meeting, claiming a 40% improvement in energy density...',
            votes: 6500,
            comments: 432
        }
    ];

    return (
        <div className="community-page">
            <div className="community-banner" style={{ backgroundColor: communityData.bannerColor }}></div>

            <div className="community-header">
                <div className="community-header-content">
                    <div className="community-icon-large">
                        {subreddit ? subreddit[0].toUpperCase() : 'R'}
                    </div>
                    <div className="community-title-container">
                        <h1 className="community-title">{communityData.title}</h1>
                        <div className="community-subtitle">{communityData.subtitle}</div>
                    </div>
                    <div className="community-actions">
                        <button className="back-btn" onClick={() => window.history.back()}>Back</button>
                        <button className="join-btn">Join</button>
                        <button className="bell-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="community-tabs">
                    {['Posts', 'About', 'Marketplace', 'Auctions'].map(tab => (
                        <div
                            key={tab}
                            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            <div className="community-container">
                <div className="community-feed">
                    <div className="create-post-container">
                        <div className="user-avatar-small">U</div>
                        <input
                            type="text"
                            placeholder="Create Post"
                            className="create-post-input"
                            onClick={openCreatePostModal}
                        />
                        <button className="create-post-icon-btn" onClick={openCreatePostModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                        </button>
                        <button className="create-post-icon-btn" onClick={openCreatePostModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </button>
                    </div>

                    {posts.map(post => (
                        <Post key={post.id} {...post} />
                    ))}
                </div>

                <div className="community-sidebar">
                    <div className="community-card">
                        <div className="card-header">
                            About Community
                        </div>
                        <div className="card-content">
                            <p className="about-description">{communityData.description}</p>
                            <div className="community-stats">
                                <div className="stat-item">
                                    <span className="stat-number">{communityData.members}</span>
                                    <span className="stat-label">Members</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">{communityData.online}</span>
                                    <span className="stat-label">Online</span>
                                </div>
                            </div>
                            <div className="created-date">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Created {communityData.created}
                            </div>
                            <button className="create-post-btn-full" onClick={openCreatePostModal}>Create Post</button>
                        </div>
                    </div>

                    <div className="community-card">
                        <div className="card-header">
                            Community Rules
                        </div>
                        <div className="card-content">
                            {rules.map((rule, index) => (
                                <div key={index} className="rule-item">
                                    <span className="rule-number">{index + 1}.</span>
                                    <span>{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="community-card">
                        <div className="card-header">
                            Moderators
                        </div>
                        <div className="card-content">
                            <div className="mod-list">
                                {moderators.map((mod, index) => (
                                    <div key={index} className="mod-item">
                                        <div className="user-avatar-small" style={{ width: 24, height: 24, fontSize: 12 }}>u</div>
                                        u/{mod}
                                    </div>
                                ))}
                            </div>
                            <button className="message-mods-btn">Message the mods</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
