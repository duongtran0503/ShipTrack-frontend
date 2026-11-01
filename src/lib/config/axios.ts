import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_ENDPOINT;
console.log(apiUrl)
const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(response => {
    return response
}, (error) => {
    // Kiểm tra xem có phản hồi lỗi từ phía server không
    if (error.response) {
        // Server phản hồi với status code nằm ngoài khoảng 2xx

        // Trả về dữ liệu lỗi của server (hoặc toàn bộ error.response tùy bạn muốn)
        return Promise.reject(error.response.data);
    } else if (error.request) {
        // Request đã được gửi nhưng không nhận được phản hồi từ server (Lỗi mạng, sập server)
        return Promise.reject({ message: "Không thể kết nối đến server" });
    } else {
        // Có lỗi xảy ra khi thiết lập request
        return Promise.reject({ message: error.message });
    }
})

apiClient.interceptors.request.use(config => {
    return config;
})

export { apiClient };

