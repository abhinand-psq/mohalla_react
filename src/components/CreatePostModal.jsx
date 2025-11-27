import React, { useState, useRef } from 'react';
import { useCreatePost } from '../context/CreatePostContext';
import './CreatePostModal.css';

const CreatePostModal = () => {
    const { isCreatePostModalOpen, closeCreatePostModal } = useCreatePost();
    const [activeTab, setActiveTab] = useState('post');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const fileInputRef = useRef(null);

    const communities = [
        { id: 'tech', name: 'r/technology', icon: '💻' },
        { id: 'react', name: 'r/reactjs', icon: '⚛️' },
        { id: 'js', name: 'r/javascript', icon: '📜' },
        { id: 'web', name: 'r/webdev', icon: '🌐' },
        { id: 'game', name: 'r/gaming', icon: '🎮' },
    ];

    const [selectedCommunity, setSelectedCommunity] = useState(communities[0]);

    if (!isCreatePostModalOpen) return null;

    const handlePost = () => {
        console.log({
            type: activeTab,
            community: selectedCommunity.name,
            title,
            body: activeTab === 'post' ? body : undefined,
            url: activeTab === 'link' ? url : undefined,
            file: activeTab === 'image' ? selectedFile : undefined
        });
        closeCreatePostModal();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="create-post-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) closeCreatePostModal();
        }}>
            <div className="create-post-modal">
                <div className="modal-header">
                    <div className="header-content">
                        <h2>Create a post</h2>
                        <p className="sub-text">Share your thoughts, images, or links with the community.</p>
                    </div>
                    <button className="close-btn" onClick={closeCreatePostModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="community-selector">
                        <label>Choose a community</label>
                        <div className="community-dropdown">
                            <div
                                className="dropdown-trigger"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="selected-community">
                                    <div className="community-icon-small">{selectedCommunity.icon}</div>
                                    <span>{selectedCommunity.name}</span>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>

                            <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                                {communities.map(comm => (
                                    <div
                                        key={comm.id}
                                        className="dropdown-item"
                                        onClick={() => {
                                            setSelectedCommunity(comm);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <div className="community-icon-small">{comm.icon}</div>
                                        <span>{comm.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="tabs-container">
                        <button
                            className={`tab-btn ${activeTab === 'post' ? 'active' : ''}`}
                            onClick={() => setActiveTab('post')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <line x1="10" y1="9" x2="8" y2="9"></line>
                            </svg>
                            Post
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                            onClick={() => setActiveTab('image')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            Images & Video
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'link' ? 'active' : ''}`}
                            onClick={() => setActiveTab('link')}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </svg>
                            Link
                        </button>
                    </div>

                    <div className="form-content">
                        <div className="input-group">
                            <label>Title</label>
                            <div className="title-input-wrapper">
                                <input
                                    type="text"
                                    className="text-input"
                                    placeholder="An interesting title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={300}
                                />
                                <span className="char-count">{title.length}/300 characters</span>
                            </div>
                        </div>

                        {activeTab === 'post' && (
                            <div className="input-group">
                                <label>Text (optional)</label>
                                <textarea
                                    className="content-textarea"
                                    placeholder="Share your thoughts..."
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </div>
                        )}

                        {activeTab === 'image' && (
                            <div className="input-group">
                                {!selectedFile ? (
                                    <div
                                        className="file-upload-area"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                            accept="image/*,video/*"
                                            style={{ display: 'none' }}
                                        />
                                        <div className="upload-icon">
                                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="17 8 12 3 7 8"></polyline>
                                                <line x1="12" y1="3" x2="12" y2="15"></line>
                                            </svg>
                                        </div>
                                        <span className="upload-text">Upload Image or Video</span>
                                        <span className="upload-subtext">Drag and drop or click to upload</span>
                                    </div>
                                ) : (
                                    <div className="file-preview">
                                        {selectedFile.type.startsWith('video') ? (
                                            <video src={previewUrl} controls />
                                        ) : (
                                            <img src={previewUrl} alt="Preview" />
                                        )}
                                        <button className="remove-file-btn" onClick={removeFile}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'link' && (
                            <>
                                <div className="input-group">
                                    <label>URL</label>
                                    <input
                                        type="text"
                                        className="text-input"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Description (optional)</label>
                                    <textarea
                                        className="content-textarea"
                                        placeholder="What's this link about?"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        style={{ minHeight: '80px' }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="cancel-btn" onClick={closeCreatePostModal}>Cancel</button>
                    <button
                        className="post-btn"
                        onClick={handlePost}
                        disabled={!title}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
