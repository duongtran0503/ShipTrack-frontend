````markdown
# Logistics Frontend (ReactJS + TypeScript + Vite)

Đây là source code Frontend cho dự án Logistics, được xây dựng bằng **ReactJS**, **TypeScript**, **Vite**, **Tailwind CSS** và **shadcn/ui**. Dự án cung cấp giao diện cho Khách hàng (Customer), Tài xế (Driver) và Quản trị viên (Admin).

## 🛠 Yêu cầu hệ thống (Prerequisites)

Trước khi chạy dự án, hãy đảm bảo máy tính của bạn đã cài đặt:

- [Node.js](https://nodejs.org/) (Phiên bản **18.x** hoặc **20.x** trở lên)
- [Git](https://git-scm.com/) (Để clone source code)

---

## ⚙️ Cấu hình biến môi trường (Bắt buộc)

Dự án sử dụng file `.env` để quản lý các biến môi trường và API Key. Nếu thiếu file này, bản đồ và các chức năng gọi API sẽ không hoạt động.

**Bước 1:** Tạo một file có tên là `.env` ngay tại thư mục gốc của Frontend (ngang hàng với `package.json`).

**Bước 2:** Copy và dán nội dung sau vào file `.env`:

```env
# API Endpoint của Backend (.NET)
VITE_API_ENDPOINT=http://localhost:5000/api

# Cấu hình SignalR Hub (Real-time)
VITE_HUB_URL=http://localhost:5000/hubs/logistics

# API Key của VietMap (Dùng cho bản đồ và geocoding)
VITE_VIETMAP_API_KEY=313cf4f4ae655b7fd528a04c42aed073dea31b3c6df0ea44
VITE_VIETMAP_MAP_KEY=313cf4f4ae655b7fd528a04c42aed073dea31b3c6df0ea44
```
````

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

**Bước 1:** Mở Terminal (Command Prompt, PowerShell, hoặc Git Bash) và clone source code:

```bash
git clone <URL_REPO_FRONTEND_CUA_BAN>
cd <ten-thu-muc-frontend>
```

**Bước 2:** Cài đặt các gói thư viện (Dependencies):

```bash
npm install
```

_(Hoặc `yarn install` / `pnpm install` nếu bạn dùng trình quản lý gói khác)._

**Bước 3:** Khởi chạy server phát triển (Development):

```bash
npm run dev
```

Sau khi chạy lệnh, Terminal sẽ hiển thị địa chỉ local (thường là `http://localhost:5173`). Hãy mở trình duyệt và truy cập vào địa chỉ đó để xem giao diện.

---

## 📁 Cấu hình Alias Đường Dẫn (Path Alias)

Dự án đã được cấu hình sẵn alias `@/` trỏ thẳng vào thư mục `src/` để code ngắn gọn và dễ bảo trì hơn.

Ví dụ, thay vì phải viết:

```typescript
import { Button } from '../../../components/ui/button';
```

Bạn có thể viết:

```typescript
import { Button } from '@/components/ui/button';
```

Cấu hình này đã được thiết lập sẵn trong `tsconfig.app.json` và `vite.config.ts`. Bạn không cần phải sửa gì thêm.

---

## 📦 Build dự án cho Production

Khi bạn muốn đóng gói dự án để deploy lên server (Vercel, Netlify, Nginx, v.v.), hãy chạy lệnh:

```bash
npm run build
```

Lệnh này sẽ tối ưu hóa code và tạo ra thư mục `dist/` chứa các file tĩnh (HTML, CSS, JS) sẵn sàng để deploy.

Để xem trước bản build ở máy local, chạy lệnh:

```bash
npm run preview
```

---

## 🧹 Kiểm tra lỗi Code (Linting)

Dự án sử dụng ESLint để đảm bảo code tuân thủ quy chuẩn. Để kiểm tra lỗi, chạy:

```bash
npm run lint
```

---

## 📌 Lưu ý quan trọng

1. Hãy đảm bảo **Backend** đang chạy ở cổng `http://localhost:5000` trước khi khởi động Frontend, nếu không các API sẽ bị lỗi `Network Error`.
2. File `.env` chứa API Key, **tuyệt đối không commit file này lên GitHub Public**. Hãy chắc chắn file `.gitignore` của bạn đã có dòng `.env`.

````

---

### 💡 Lời khuyên thêm cho bạn:
1. **Nhớ chặn file `.env`:** Bạn mở file `.gitignore` của frontend ra, đảm bảo có dòng `.env` và `.env.*` để tránh push API key lên mạng.
2. **Cấu hình Alias:** Tôi thấy bạn đã cấu hình alias rất chuẩn trong `tsconfig.app.json`. Tuy nhiên, hãy chắc chắn file `vite.config.ts` của bạn cũng đã cấu hình resolve alias này (nếu chưa, Vite sẽ không hiểu `@/` khi build):
   ```typescript
   // vite.config.ts
   import path from 'path';

   export default defineConfig({
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
     // ...
   });
````

3. **Tài khoản Seed Data:** Đừng quên hướng dẫn người dùng clone về test tài khoản (giống bên Backend).
    - Tài khoản test: `customer@gmail.com` / `123123` hoặc `driver@gmail.com` / `123123`. "admin@gmail.com"/'123123'
