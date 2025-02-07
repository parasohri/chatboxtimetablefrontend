import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://chatboxtimetablebackend-mb8q.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getData = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const putData = async (endpoint, data) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};
