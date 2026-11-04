import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

let connection: HubConnection | null = null;

export const getSignalRConnection = (): HubConnection => {
    if (!connection) {
        const hubUrl = import.meta.env.VITE_HUB_URL || "http://localhost:5000/hubs/logistics";

        connection = new HubConnectionBuilder()
            .withUrl(hubUrl, {
                // Đính kèm JWT token qua query string khi negotiate (do WebSocket không hỗ trợ Authorization header trực tiếp)
                accessTokenFactory: () => {
                    const token = localStorage.getItem("accessToken") || "";
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
    if (conn.state === "Disconnected") {
        try {
            await conn.start();
            console.log("🟢 SignalR Connected Successfully.");
        } catch (err) {
            console.error("🔴 SignalR Connection Error: ", err);
            // Thử kết nối lại sau 5 giây nếu lỗi
            setTimeout(startSignalRConnection, 5000);
        }
    }
}

// Hàm dừng kết nối (dùng khi user Logout)
export async function stopSignalRConnection(): Promise<void> {
    if (connection && connection.state !== "Disconnected") {
        try {
            await connection.stop();
            console.log("⚪ SignalR Disconnected.");
        } catch (err) {
            console.error("🔴 Error stopping SignalR: ", err);
        }
    }
}