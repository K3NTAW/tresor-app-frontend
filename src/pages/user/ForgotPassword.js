import React, { useState } from 'react';
import api from '../../comunication/axiosConfig';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await api.post('/auth/forgot-password', { email });
            setMessage(response.data);
            setIsError(false);
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred. Please try again.');
            setIsError(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Forgot Password</h2>
            <div className="message error" style={{ marginBottom: '1rem' }}>
                <strong>Warning:</strong> Resetting your password will make all of your currently encrypted secrets permanently unreadable. This action cannot be undone.
            </div>
            {message && (
                <div className={`message ${isError ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <button type="submit" className="btn">Send Reset Link</button>
            </form>
        </div>
    );
}

export default ForgotPassword; 