import React, { useState } from 'react';
import Post from './Post';
import { useCreatePost } from '../context/CreatePostContext';
import './Feed.css';

const Feed = () => {
    const [type, settype] = useState('best');
    const { openCreatePostModal } = useCreatePost();

    const posts = [
        {
            id: 2,
            subreddit: 'pics',
            author: 'naturePhotog',
            time: '2 hours ago',
            title: 'Captured this stunning sunset over the mountains',
            image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            votes: 8400,
            comments: 234
        },
        {
            id: 3,
            subreddit: 'worldnews',
            author: 'newsbot',
            time: '5 hours ago',
            title: 'Global renewable energy usage hits all-time high in 2024',
            content: 'According to the latest report by the International Energy Agency, renewable energy sources now account for...',
            votes: 21000,
            comments: 1500
        },
        {
            id: 4,
            subreddit: 'gaming',
            author: 'gamer_pro_99',
            time: '1 hour ago',
            title: 'The hidden easter egg in the latest update is mind-blowing!',
            content: 'I was exploring the northern region of the map when I stumbled upon this cave...',
            votes: 5600,
            comments: 420
        },
        {
            id: 5,
            subreddit: 'AskReddit',
            author: 'curious_mind',
            time: '8 hours ago',
            title: 'What is a skill that everyone should learn in their 20s?',
            content: 'I am turning 20 soon and want to make the most of this decade. Any advice?',
            votes: 32000,
            comments: 4500
        },
        {
            id: 6,
            subreddit: 'aww',
            author: 'cat_lover_123',
            time: '3 hours ago',
            title: 'My cat falling asleep on my keyboard while I try to work',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            votes: 12500,
            comments: 310
        }
    ];

    return (
        <div className="feed">
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

            <div className="filter-bar">
                <button onClick={() => settype('best')} className={`filter-btn ${type === 'best' ? 'active' : ''}`}>Best</button>
                <button onClick={() => settype('hot')} className={`filter-btn ${type === 'hot' ? 'active' : ''}`}>Hot</button>
                <button onClick={() => settype('new')} className={`filter-btn ${type === 'new' ? 'active' : ''}`}>New</button>
                <button onClick={() => settype('top')} className={`filter-btn ${type === 'top' ? 'active' : ''}`}>Top</button>
            </div>

            {posts.map(post => (
                <Post key={post.id} {...post} type={type} />
            ))}
        </div>
    );
};

export default Feed;
