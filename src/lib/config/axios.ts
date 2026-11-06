import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_ENDPOINT;
console.log(apiUrl);

const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
/**
 * 💡 Lấy Access Token từ sessionStorage của riêng Tab hiện tại (Hỗ trợ đa tài khoản đa tab)
 */
export const getActiveAccessToken = () => {
    const activeEmail = sessionStorage.getItem("shiptrack_active_email");
    if (activeEmail) {
        return sessionStorage.getItem(`accessToken_${activeEmail}`);
    }
    return null;
};
// ==================== REQUEST INTERCEPTOR ====================
// Tự động kiểm tra và gắn accessToken vào header trước khi gửi request
apiClient.interceptors.request.use(
    (config) => {
        const token = getActiveAccessToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ==================== RESPONSE INTERCEPTOR ====================
apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Kiểm tra xem có phản hồi lỗi từ phía server không
        if (error.response) {
            // Server phản hồi với status code nằm ngoài khoảng 2xx
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Request đã được gửi nhưng không nhận được phản hồi từ server (Lỗi mạng, sập server)
            return Promise.reject({ message: "Không thể kết nối đến server" });
        } else {
            // Có lỗi xảy ra khi thiết lập request
            return Promise.reject({ message: error.message });
        }
    }
);

export { apiClient };

