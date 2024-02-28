import axios from 'axios';

const verifyToken = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No token found in localStorage");
        }

        const response = await axios.get("http://localhost:8080/api/auth/verify", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data.userId;
    } catch (error) {
        console.error("Error checking token:", error);
        throw error;
    }
};

export { verifyToken };