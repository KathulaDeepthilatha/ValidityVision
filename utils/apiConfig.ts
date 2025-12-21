// Helper to get API base URL with fallback
const getApiUrl = () => {
    const url = import.meta.env.VITE_API_URL;
    console.log(url);
    if (!url || url === 'undefined') {
        console.warn('VITE_API_URL is not defined. Using fallback: http://localhost:8080');
        return 'https://vision-1039670019942.asia-south1.run.app';
    }
    return url;
};

export const API_BASE_URL = getApiUrl();
