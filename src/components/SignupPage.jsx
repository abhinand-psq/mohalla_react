import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../hooks/useAuth';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import SignupLoading from './SignupLoading';
import './SignupPage.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        state: '',
        district: '',
        taluk: '',
        block: '',
        panchayath: '',
        ward: ''
    });

    const [showLoading, setShowLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const { mutate: signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setShowLoading(true);
        signup(formData, {
            onSuccess: () => {
                setTimeout(() => {
                    navigate('/login');
                }, 10000);
            },
            onError: (err) => {
                console.error('Signup failed:', err);
                setShowLoading(false);
                // You might want to show an error message to the user here
            }
        });
    };

    if (showLoading) {
        return <SignupLoading />;
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join our community today</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>

                    <div className="form-section">
                        <h3 className="section-title">Personal Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="e.g. Abhinnad"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="e.g. P"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="e.g. abhinand"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. abhinnad@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title">Address Details</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="e.g. Kerala"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="district">District</label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="e.g. Kozhikode"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="taluk">Taluk</label>
                                <input
                                    type="text"
                                    id="taluk"
                                    name="taluk"
                                    value={formData.taluk}
                                    onChange={handleChange}
                                    placeholder="e.g. Kunnamangalam"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="block">Block</label>
                                <input
                                    type="text"
                                    id="block"
                                    name="block"
                                    value={formData.block}
                                    onChange={handleChange}
                                    placeholder="e.g. Kunnamangalam"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="panchayath">Panchayath</label>
                                <input
                                    type="text"
                                    id="panchayath"
                                    name="panchayath"
                                    value={formData.panchayath}
                                    onChange={handleChange}
                                    placeholder="e.g. Peruvayal Grama Panchayath"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ward">Ward</label>
                                <input
                                    type="text"
                                    id="ward"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    placeholder="e.g. 17"
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="signup-btn" disabled={isPending}>
                        {isPending ? 'Signing up...' : 'Sign Up'}
                    </button>
                    {error && <p className="error-message">{error.response?.data?.message || 'Signup failed. Please try again.'}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
