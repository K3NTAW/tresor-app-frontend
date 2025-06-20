import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../comunication/axiosConfig';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromParams = params.get('token');
        setToken(tokenFromParams);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsError(true);
            return;
        }

        try {
            const response = await api.post(`/auth/reset-password?token=${token}`, { newPassword: password });
            setMessage(response.data);
            setIsError(false);
            setTimeout(() => navigate('/user/login'), 3000);
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred. Please try again.');
            setIsError(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Reset Password</h2>
            {message && (
                <div className={`message ${isError ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm new password"
                    />
                </div>
                <button type="submit" className="btn">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword; 