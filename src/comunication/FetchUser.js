/**
 * Fetch methodes for user api calls
 * @author Peter Rutschmann
 */

import api from './axiosConfig';

export const getUsers = async (loginValues) => {
    try {
        const response = await api.get('/users', {
            headers: {
                'Authorization': `Bearer ${loginValues.token}`
            }
        });
        console.log('Users successfully retrieved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to get users:', error.response?.data?.message || error.message);
        throw new Error('Failed to get users. ' + (error.response?.data?.message || error.message));
    }
}

export const postUser = async (content, recaptchaToken) => {
    try {
        const payload = {
            ...content,
            recaptchaToken: recaptchaToken
        };
        const response = await api.post('/auth/register', payload);
        console.log('User successfully posted:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to post user:', error.response?.data?.message || error.message);
        throw new Error('Failed to save user. ' + (error.response?.data?.message || error.message));
    }
};