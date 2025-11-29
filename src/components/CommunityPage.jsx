import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import Post from './Post';
import Marketplace from './Marketplace';
import { useCreatePost } from '../context/CreatePostContext';
import './CommunityPage.css';

const CommunityPage = () => {
    const { subreddit: communityId } = useParams();
    const [activeTab, setActiveTab] = useState('Posts');
    const { openCreatePostModal } = useCreatePost();
    const navigate = useNavigate();

    const { data: communityData, isLoading, isError, error: communityError } = useQuery({
        queryKey: ['community', communityId],
        queryFn: async () => {
            const response = await api.get(`/communities/${communityId}`);
            return response.data.data;
        },
        retry: false
    });

    const { data: postsData, isLoading: isPostsLoading, error: postsError } = useQuery({
        queryKey: ['communityPosts', communityId],
        queryFn: async () => {
            const response = await api.get(`/posts/community/${communityId}`);
            return response.data;
        },
        enabled: !!communityId,
        retry: false
    });

    useEffect(() => {
        if ((communityError?.response?.status === 401) || (postsError?.response?.status === 401)) {
            navigate('/login');
        }
    }, [communityError, postsError, navigate]);

    const posts = postsData?.data?.map(post => {
        const mediaItem = post.media && post.media.length > 0 ? post.media[0] : null;
        return {
            id: post._id,
            subreddit: communityData?.name || 'loading...',
            communityId: communityId,
            author: post.author?.username || 'deleted',
            time: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'recently',
            title: post.content, // Using content as title since there is no title in the response
            description: post.description,
            postType: post.postType || 'post',
            content: post.content,
            image: mediaItem ? mediaItem.url : null,
            width: mediaItem ? mediaItem.width : null,
            votes: post.stats?.likesCount || 0,
            comments: post.stats?.commentsCount || 0
        };
    }) || [];

    if (isLoading) {
        return <div className="loading-container">Loading community details...</div>;
    }

    if (isError || !communityData) {
        return (
            <div className="error-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
                <img src="/assets/robot_guard.png" alt="Oops" style={{ maxWidth: '300px', marginBottom: '20px' }} />
                <h2>Oops! Community not found.</h2>
                <p>The community you are looking for does not exist or has been removed.</p>
                <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>Go Home</button>
            </div>
        );
    }

    return (
        <div className="community-page">
            <div
                className="community-banner"
                style={{
                    backgroundImage: communityData.banner?.url ? `url(${communityData.banner.url})` : 'none',
                    backgroundColor: communityData.banner?.url ? 'transparent' : '#33a8ff',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>

            <div className="community-header">
                <div className="community-header-content">
                    <div className="community-icon-large">
                        {communityData.icon?.url ? (
                            <img src={communityData.icon.url} alt={communityData.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            communityData.name ? communityData.name[0].toUpperCase() : 'R'
                        )}
                    </div>
                    <div className="community-title-container">
                        <h1 className="community-title">{communityData.name}</h1>
                        <div className="community-subtitle">r/{communityData.name}</div>
                    </div>
                    <div className="community-actions">
                        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
                        <button className="join-btn">{communityData.membershipStatus === 'joined' ? 'Joined' : 'Join'}</button>
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
                    {activeTab === 'Posts' && (
                        <>
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

                            {isPostsLoading ? (
                                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-secondary)' }}>Loading posts...</div>
                            ) : posts.length > 0 ? (
                                posts.map(post => (
                                    <Post key={post.id} {...post} />
                                ))
                            ) : (
                                <div className="empty-feed-notice">
                                    <h3>No posts yet</h3>
                                    <p>Be the first to create a post in this community!</p>
                                    <button className="btn btn-primary" onClick={openCreatePostModal} style={{ marginTop: '10px' }}>Create Post</button>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'Marketplace' && (
                        <Marketplace communityData={communityData} />
                    )}

                    {(activeTab === 'About' || activeTab === 'Auctions') && (
                        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '4px', border: '1px solid #ccc' }}>
                            <h3>{activeTab}</h3>
                            <p>This feature is coming soon!</p>
                        </div>
                    )}
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
                                    <span className="stat-number">{communityData.stats?.membersCount || 0}</span>
                                    <span className="stat-label">Members</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">{communityData.stats?.postsCount || 0}</span>
                                    <span className="stat-label">Posts</span>
                                </div>
                            </div>
                            <div className="created-date">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Created {new Date(communityData.createdAt).toLocaleDateString()}
                            </div>
                            <button className="create-post-btn-full" onClick={openCreatePostModal}>Create Post</button>
                        </div>
                    </div>

                    {communityData.allowedMarketplaceCategories && communityData.allowedMarketplaceCategories.length > 0 && (
                        <div className="community-card">
                            <div className="card-header">
                                Marketplace Categories
                            </div>
                            <div className="card-content">
                                <div className="categories-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {communityData.allowedMarketplaceCategories.map((cat, index) => (
                                        <span key={index} style={{ background: '#f0f2f5', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="community-card">
                        <div className="card-header">
                            Moderators
                        </div>
                        <div className="card-content">
                            <div className="mod-list">
                                {communityData.createdBy && (
                                    <div className="mod-item">
                                        <div className="user-avatar-small" style={{ width: 24, height: 24, fontSize: 12 }}>
                                            {communityData.createdBy.profilePic?.url ? (
                                                <img src={communityData.createdBy.profilePic.url} alt="mod" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                            ) : (
                                                'u'
                                            )}
                                        </div>
                                        u/{communityData.createdBy.username}
                                    </div>
                                )}
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
