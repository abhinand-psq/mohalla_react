import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import './Sidebar.css';

const Sidebar = () => {
    const { data: communitiesData, isLoading, error } = useQuery({
        queryKey: ['myCommunities'],
        queryFn: async () => {
            try {
                const response = await api.get('/communities/my');
                return response.data;
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    return { data: [], isUnauthorized: true };
                }
                throw err;
            }
        },
        retry: false
    });

    const communities = communitiesData?.data || [];
    const isUnauthorized = communitiesData?.isUnauthorized;
    const isEmpty = communities.length === 0;

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
                <h3 className="sidebar-title">Communities</h3>
                {isLoading ? (
                    <div className="sidebar-loading">Loading...</div>
                ) : (isUnauthorized || isEmpty) ? (
                    <div className="sidebar-empty-state">
                        <p>Join communities to see them here!</p>
                    </div>
                ) : (
                    communities.map((community) => (
                        <Link
                            key={community._id}
                            to={`/r/${community._id}`}
                            className="sidebar-item"
                        >
                            <span className="icon">
                                {community.icon?.url ? (
                                    <img
                                        src={community.icon.url}
                                        alt={community.name}
                                        style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    'r/'
                                )}
                            </span>
                            {community.name}
                        </Link>
                    ))
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
