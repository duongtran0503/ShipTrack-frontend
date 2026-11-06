import { getActiveAccessToken } from "@/lib/config/axios";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection: HubConnection | null = null;

export const getSignalRConnection = (): HubConnection => {
    const hubUrl = import.meta.env.VITE_HUB_URL || "http://localhost:5000/hubs/logistics";

    // Nếu đã có connection nhưng muốn đảm bảo nó dùng đúng token của tab hiện tại, 
    // hoặc nếu chưa có thì khởi tạo mới.
    if (!connection) {
        connection = new HubConnectionBuilder()
            .withUrl(hubUrl, {
                // 💡 Đính kèm token thông minh chuẩn theo sessionStorage của từng tab hiện tại
                accessTokenFactory: () => {
                    const token = getActiveAccessToken() || "";
                    return token;
                },
            })
            .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // Cấu hình thời gian thử kết nối lại tự động
            .configureLogging(LogLevel.Information)
            .build();
    }
    return connection;
};

// Hàm khởi động kết nối an toàn (tránh gọi start nhiều lần nếu đã connected)
export async function startSignalRConnection(): Promise<void> {
    const conn = getSignalRConnection();

    // Nếu kết nối đang ở trạng thái Disconnected, tiến hành start
    if (conn.state === "Disconnected") {
        try {
            await conn.start();
            console.log("🟢 SignalR Connected Successfully for current tab.");
        } catch (err) {
            console.error("🔴 SignalR Connection Error: ", err);
            // Thử kết nối lại sau 5 giây nếu lỗi
            setTimeout(startSignalRConnection, 5000);
        }
    }
}

// Hàm dừng kết nối (dùng khi user Logout hoặc chuyển tab)
export async function stopSignalRConnection(): Promise<void> {
    if (connection && connection.state !== "Disconnected") {
        try {
            await connection.stop();
            console.log("⚪ SignalR Disconnected.");
        } catch (err) {
            console.error("🔴 Error stopping SignalR: ", err);
        } finally {
            // Reset lại connection để lần đăng nhập sau hoặc đổi tài khoản tạo mới hoàn toàn instance sạch
            connection = null;
        }
    } else {
        connection = null;
    }
}