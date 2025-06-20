import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../comunication/axiosConfig';

/**
 * LoginUser
 * @author Peter Rutschmann
 */
function LoginUser({ setLoginValues }) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await api.post('/auth/login', {
                email: credentials.email,
                password: credentials.password
            });

            if (response.data.jwt) {
                console.log('Login successful');
                const newLoginValues = {
                    email: credentials.email,
                    password: credentials.password,
                    token: response.data.jwt
                };
                setLoginValues(newLoginValues);
                
                // Navigate to home page or dashboard
                navigate('/');
            } else {
                console.error('Login failed: No JWT token received');
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || 'An error occurred during login. Please try again.');
        }
    };
    
    return (
        <div className="form-container">
            <h2>Login</h2>
            {errorMessage && (
                <div className="message error">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials(prevValues => ({...prevValues, email: e.target.value}))}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials(prevValues => ({...prevValues, password: e.target.value}))}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn">Login</button>
                <Link to="/forgot-password" className="form-link">Forgot Password?</Link>
            </form>
        </div>
    );
}

export default LoginUser;