import '../../App.css';
import '../../css/Secrets.css';
import React, {useEffect, useState} from 'react';
import {getSecretsforUser} from "../../comunication/FetchSecrets";

/**
 * Secrets
 * @author Peter Rutschmann
 */
const Secrets = ({loginValues}) => {
    const [secrets, setSecrets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSecrets = async () => {
            setErrorMessage('');
            if( ! loginValues.email){
                console.error('Secrets: No valid email, please do login first:' + loginValues);
                setErrorMessage("No valid email, please do login first.");
            } else {
                try {
                    const data = await getSecretsforUser(loginValues);
                    console.log(data);
                    setSecrets(data);
                } catch (error) {
                    console.error('Failed to fetch to server:', error.message);
                    setErrorMessage(error.message);
                }
            }
        };
        fetchSecrets();
    }, [loginValues]);

    return (
        <div className="secrets-container">
            <h1>My Secrets</h1>
            {errorMessage && <p className="message error">{errorMessage}</p>}
            <table className="secrets-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                {secrets?.length > 0 ? (
                    secrets.map(secret => (
                        <tr key={secret.id}>
                            <td>{secret.id}</td>
                            <td>{secret.userId}</td>
                            <td>
                                <div className="secret-content">
                                    {Object.entries(secret.content).map(([key, value]) => (
                                        <div key={key}>
                                            <span className="secret-content-key">{key}:</span> {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No secrets available</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Secrets;