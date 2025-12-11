import React, { useState } from 'react';
import './AuctionDetails.css';

const AuctionDetails = ({ auction, onBack }) => {
    const [bidAmount, setBidAmount] = useState((auction.currentPrice + 100).toString());

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Derived or Default Data (since we are using mock data in list, extending it here)
    const minIncrement = 100;
    const minBid = auction.currentPrice + minIncrement;
    const description = "This item is in excellent condition. Bought it 6 months ago, barely used. Original box and accessories included. Prefer local pickup but can ship if needed.";
    const sellerLocation = "Delhi, Delhi";
    const bidHistory = [
        { bidder: "u/bidder123", time: "2 min ago", amount: auction.currentPrice, avatar: "B", color: "#3b82f6" },
        { bidder: "u/collector99", time: "15 min ago", amount: auction.currentPrice - 100, avatar: "C", color: "#3b82f6" },
        { bidder: "u/techbuyer", time: "45 min ago", amount: auction.currentPrice - 200, avatar: "T", color: "#3b82f6" },
    ];

    const handleQuickBid = (increment) => {
        setBidAmount((parseInt(bidAmount || 0) + increment).toString());
    };

    return (
        <div className="auction-details-container">
            {/* Back Button */}
            <div className="back-btn-container">
                <button className="back-to-auctions-btn" onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Auctions
                </button>
            </div>

            <div className="details-layout">
                {/* Left Column */}
                <div className="details-left">
                    <div className="main-image-card">
                        <img src={auction.image} alt={auction.title} className="main-image" />
                        {auction.status === 'LIVE' && (
                            <div className="live-badge-overlay">
                                <span className="live-dot"></span>
                                LIVE
                            </div>
                        )}
                    </div>

                    <div className="info-card">
                        <h3>Product Details</h3>
                        <p className="product-description">{description}</p>
                    </div>

                    <div className="info-card">
                        <h3>Seller Information</h3>
                        <div className="seller-profile">
                            <div className="seller-avatar-large">
                                {auction.seller ? auction.seller[2].toUpperCase() : 'U'}
                            </div>
                            <div className="seller-details">
                                <h4>{auction.seller}</h4>
                                <span className="seller-role">Community Member</span>
                            </div>
                        </div>
                        <div className="seller-meta">
                            <div className="meta-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                {sellerLocation}
                            </div>
                            <div className="meta-item verified-text">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                Verified r/technology Member
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="details-right">
                    {/* Current Bid */}
                    <div className="current-bid-card">
                        <div className="bid-label">Current Highest Bid</div>
                        <div className="bid-amount-large">{formatCurrency(auction.currentPrice)}</div>
                        <div className="bid-timer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {auction.timeRemaining}
                        </div>
                    </div>

                    {/* Place Bid */}
                    <div className="place-bid-card">
                        <h3>Place Your Bid</h3>
                        <div className="min-bid-hint">Minimum bid: {formatCurrency(minBid)}</div>

                        <div className="bid-input-group">
                            <span className="currency-symbol">₹</span>
                            <input
                                type="number"
                                className="bid-input"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                            />
                        </div>

                        <button className="place-bid-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2L9 7M14 12l5-5M3.5 15.5l5.5 5.5M2 22l4-4M10 2l-7 7 10 10 7-7-10-10z" />
                            </svg>
                            Place Bid
                        </button>

                        <div className="quick-bid-buttons">
                            <button className="quick-bid-btn" onClick={() => handleQuickBid(100)}>+₹100</button>
                            <button className="quick-bid-btn" onClick={() => handleQuickBid(500)}>+₹500</button>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="stats-card">
                        <div className="stat-row">
                            <span className="stat-key">Starting Price:</span>
                            <span className="stat-val">{formatCurrency(auction.startingPrice)}</span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-key">Total Bids:</span>
                            <span className="stat-val group-val">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 4 }}>
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                {auction.bidsCount}
                            </span>
                        </div>
                        <div className="stat-row">
                            <span className="stat-key">Min. Increment:</span>
                            <span className="stat-val">{formatCurrency(minIncrement)}</span>
                        </div>
                    </div>

                    {/* Bid History */}
                    <div className="info-card">
                        <div className="bid-history-header">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                            Bid History
                        </div>
                        <div className="bid-history-list">
                            {bidHistory.map((bid, index) => (
                                <div key={index} className="history-item">
                                    <div className="bidder-info">
                                        <div className="bidder-avatar" style={{ backgroundColor: bid.color }}>
                                            {bid.avatar}
                                        </div>
                                        <div className="bidder-details">
                                            <span className="bidder-name">{bid.bidder}</span>
                                            <span className="bid-time">{bid.time}</span>
                                        </div>
                                    </div>
                                    <span className="bid-history-amount">{formatCurrency(bid.amount)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionDetails;
