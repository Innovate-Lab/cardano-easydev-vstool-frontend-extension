import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    timeout: 5000, // Increased to 5 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Add request interceptor for handling errors
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            console.error('Response error:', error.response.status);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Request error:', error.request);
        } else {
            // Something else went wrong
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export {
    axiosInstance
};

