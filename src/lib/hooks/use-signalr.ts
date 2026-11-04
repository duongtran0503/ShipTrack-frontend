import { getSignalRConnection, startSignalRConnection } from "@/lib/signalR/signalr-hub";
import { HubConnection } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export function useSignalR() {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const conn = getSignalRConnection();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConnection(conn);

        // Lắng nghe các sự kiện lifecycle của connection
        conn.onreconnecting(() => {
            console.warn("🔄 SignalR Reconnecting...");
            setIsConnected(false);
        });

        conn.onreconnected(() => {
            console.log("🟢 SignalR Reconnected.");
            setIsConnected(true);
        });

        conn.onclose(() => {
            console.warn("🔴 SignalR Connection Closed.");
            setIsConnected(false);
        });

        // Khởi động kết nối nếu chưa chạy
        startSignalRConnection().then(() => {
            setIsConnected(conn.state === "Connected");
        });

        // Cleanup function khi component unmount
        return () => {
            // Lưu ý: Không stop connection ở đây nếu muốn giữ kết nối xuyên suốt toàn bộ các trang của App.
            // Chỉ gọi stopSignalRConnection() khi User Đăng Xuất (Logout).
        };
    }, []);

    return {
        connection,
        isConnected,
    };
}