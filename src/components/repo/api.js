const baseUrl = import.meta.env.VITE_API_URL

export const apiUtility = {

    async get(url) {
        try {
            // console.log('get api url', `${baseUrl}`+ url);
            
            const response = await fetch(`${baseUrl}`+ url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache', // Disable caching
                    Pragma: 'no-cache', // Fallback for HTTP/1.0
                  },
            });
            if (!response.ok) {
                throw new Error(`GET request failed with status: ${response.status}`);
                // return "Unable to get data";
            }
            return await response.json();
        } catch (error) {
            console.error('Error during GET request:', error);
            throw error;
        }
    },

    async post(url, body) {
        try {

            // console.log('post api url', `${baseUrl}`+ url);
            
            const response = await fetch(`${baseUrl}`+ url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                return response.json();
            }
            return await response.json();
        } catch (error) {
            console.error('Error during POST request:', error);
            throw error;
        }
    },
};
