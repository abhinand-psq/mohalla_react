import React, { useState } from 'react';
import './CreateCommunityModal.css';

const CreateCommunityModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        privacy: 'Public',
        description: '',
        state: '',
        district: '',
        ward: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNext = () => {
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleCreate = () => {
        console.log('Creating community:', formData);
        // Logic to create community would go here
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">
                        <h2>Create New Community</h2>
                        <p className="modal-subtitle">Build your community and connect with like-minded people.</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="stepper-container">
                    <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1</div>
                    <div className={`step-line ${step >= 2 ? 'filled' : ''}`}></div>
                    <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2</div>
                </div>

                <div className="modal-body">
                    {step === 1 ? (
                        <>
                            <div className="form-group">
                                <h3 className="form-label" style={{ fontSize: '16px', marginBottom: '12px' }}>Basic Details</h3>
                                <div className="form-row">
                                    <div className="form-col">
                                        <div className="label-row">
                                            <label className="form-label">Community Name <span className="required">*</span></label>
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-input"
                                            placeholder="e.g., Technology Enthusiasts"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            maxLength={50}
                                        />
                                        <span className="char-count">{formData.name.length}/50 characters</span>
                                    </div>
                                    <div className="form-col">
                                        <div className="label-row">
                                            <label className="form-label">Privacy <span className="required">*</span></label>
                                        </div>
                                        <select
                                            name="privacy"
                                            className="form-select"
                                            value={formData.privacy}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Public">Public - Anyone can view and join</option>
                                            <option value="Restricted">Restricted - Anyone can view, but only approved users can post</option>
                                            <option value="Private">Private - Only approved users can view and submit</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="label-row">
                                    <label className="form-label">Description <span className="required">*</span></label>
                                </div>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    placeholder="Tell us about your community..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    maxLength={500}
                                ></textarea>
                                <span className="char-count">{formData.description.length}/500 characters</span>
                            </div>

                            <div className="form-group">
                                <h3 className="form-label" style={{ fontSize: '16px', marginBottom: '12px' }}>Media</h3>
                                <div className="media-section">
                                    <div className="media-box">
                                        <div className="label-row" style={{ width: '100%', marginBottom: '8px' }}>
                                            <label className="form-label">Community Icon</label>
                                        </div>
                                        <div className="media-placeholder">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                        <div className="upload-text">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            Upload Icon
                                        </div>
                                    </div>
                                    <div className="media-box banner">
                                        <div className="label-row" style={{ width: '100%', marginBottom: '8px' }}>
                                            <label className="form-label">Community Banner</label>
                                        </div>
                                        <div className="media-placeholder">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                        <div className="upload-text">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            Upload Banner
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group">
                                <h3 className="form-label" style={{ fontSize: '16px', marginBottom: '4px' }}>Location Details (Optional)</h3>
                                <p style={{ fontSize: '14px', color: '#7c7c7c', marginBottom: '16px' }}>Help members in your area find your community</p>

                                <div className="form-group">
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>State</label>
                                    <select
                                        name="state"
                                        className="form-select"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a state</option>
                                        <option value="State1">State 1</option>
                                        <option value="State2">State 2</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>District/County</label>
                                    <select
                                        name="district"
                                        className="form-select"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a district</option>
                                        <option value="District1">District 1</option>
                                        <option value="District2">District 2</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Ward/Area</label>
                                    <select
                                        name="ward"
                                        className="form-select"
                                        value={formData.ward}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a ward</option>
                                        <option value="Ward1">Ward 1</option>
                                        <option value="Ward2">Ward 2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="summary-box">
                                <h3 className="summary-title">Summary</h3>
                                <div className="summary-row">
                                    <span className="summary-label">Community Name:</span>
                                    <span className="summary-value">{formData.name}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="summary-label">Privacy:</span>
                                    <span className="summary-value">{formData.privacy}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="modal-footer">
                    {step === 1 ? (
                        <>
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleNext}>Next</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary green" onClick={handleCreate}>Create Community</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCommunityModal;
