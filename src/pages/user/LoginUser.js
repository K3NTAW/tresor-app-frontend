import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

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
            console.log("Password: ", credentials.password);
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });
            console.log('Response status:', response.status);
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('Login successful:', data);
                
                // Store user data in localStorage or sessionStorage for persistence
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userEmail', data.email);
                localStorage.setItem('isLoggedIn', 'true');
                
                // Navigate to home page or dashboard
                navigate('/');
            } else {
                console.error('Login failed:', data);
                setErrorMessage(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login. Please try again.');
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