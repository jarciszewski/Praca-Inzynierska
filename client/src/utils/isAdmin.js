import axios from 'axios';

const isAdmin = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:8080/api/auth/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data === "Admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return false;
    } else {
      console.error("Error checking admin status:", error);
      return false;
    }
  }
};

export { isAdmin };