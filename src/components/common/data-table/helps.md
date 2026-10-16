### Summary
Chào Dương, đây là bản tổng kết rút gọn, tập trung hoàn toàn vào **nội dung kỹ thuật cốt lõi** và **cách vận hành** của hệ thống DataTable chuyên nghiệp mà bạn đã nghiên cứu. Bản này loại bỏ các ví dụ dự án cụ thể để bạn có cái nhìn tổng quan nhất về thư viện.

---

## 1. Tầng Logic & Trạng thái (Logic Layer)

### **`useDataTable` (Hook điều khiển chính)**

* **Nội dung:** Là trung tâm xử lý dữ liệu. Nó quản lý trạng thái của Phân trang (Pagination), Sắp xếp (Sorting), và Bộ lọc (Filtering).
* **Điểm cốt lõi:**
* **URL-State Sync:** Mọi thay đổi (page, sort) được đồng bộ trực tiếp lên thanh địa chỉ trình duyệt, cho phép lưu trạng thái bảng khi tải lại trang.
* **Server-side Processing:** Sử dụng chế độ `manual` (Pagination/Sorting/Filtering = true) để đẩy toàn bộ việc tính toán dữ liệu cho Backend xử lý, giúp Client cực kỳ nhẹ.
* **Debounce Search:** Tự động trì hoãn việc gọi API khi người dùng gõ tìm kiếm để tối ưu hiệu suất.


* **Lưu ý:** Cần cấu hình đúng định dạng chuỗi query (ví dụ dấu `.` hoặc `,`) để tương thích với API của bạn.

### **`TableInstanceProvider` (Context API)**

* **Nội dung:** Đóng vai trò là "trạm phát sóng" dữ liệu.
* **Điểm cốt lõi:** Chia sẻ biến `table` (chứa toàn bộ trạng thái) cho tất cả các thành phần con mà không cần truyền props qua nhiều tầng.
* **Cách dùng:** Phải bọc component này bên ngoài cùng của bảng để các thành phần như Toolbar hay Pagination có thể hoạt động.

---

## 2. Tầng Giao diện hiển thị (UI Layer)

### **`DataTable` (Khung bảng tổng thể)**

* **Nội dung:** Thành phần kết hợp các mảnh ghép lại thành giao diện hoàn chỉnh.
* **Điểm cốt lõi:**
* **FlexRender:** Cơ chế render linh hoạt cho phép hiển thị bất kỳ nội dung nào từ text, badge đến hình ảnh trong từng ô dữ liệu.
* **Floating Bar:** Thanh công cụ tự động hiện lên khi có ít nhất một hàng được chọn, dùng cho các thao tác hàng loạt.


* **Cách dùng:** Nhận biến `table` từ hook `useDataTable` và render cấu trúc `<table>` tiêu chuẩn.

### **`DataTableColumnHeader` (Tiêu đề cột thông minh)**

* **Nội dung:** Thay thế tiêu đề tĩnh bằng một menu tương tác.
* **Điểm cốt lõi:** Tích hợp trực tiếp các nút Sắp xếp (Asc/Desc) và Ẩn cột ngay tại đầu mỗi cột.
* **Cách dùng:** Khai báo trong phần `header` của định nghĩa cột (`ColumnDef`).

### **`DataTablePagination` (Điều khiển phân trang)**

* **Nội dung:** Quản lý việc chuyển trang và số lượng hàng hiển thị.
* **Điểm cốt lõi:** Tự động khóa (disable) các nút điều hướng khi ở trang đầu/cuối và cập nhật tham số `page` lên URL.

---

## 3. Tầng Bộ lọc & Tiện ích (Filters & Utilities)

### **`DataTableFacetedFilter` (Bộ lọc đa mục)**

* **Nội dung:** Bộ lọc dạng danh sách chọn (Multi-select) tích hợp tìm kiếm.
* **Điểm cốt lõi:**
* **Smart Badges:** Tự động thu gọn hiển thị khi chọn quá nhiều mục để tránh tràn giao diện.
* **Faceted Counts:** Hiển thị số lượng kết quả tương ứng với từng lựa chọn ngay trong menu.



### **`DataTableColumnsVisibility` (Quản lý ẩn/hiện cột)**

* **Nội dung:** Menu quản lý danh sách các cột đang hiển thị.
* **Điểm cốt lõi:**
* **Bulk Toggle:** Bật/tắt nhanh các cột không cần thiết để làm gọn bảng dữ liệu lớn.
* **Hotkeys:** Hỗ trợ phím tắt (thường là `Shift + C`) để mở nhanh menu.



---

## Tổng kết quy trình triển khai:

1. **Định nghĩa kiểu dữ liệu và Cột:** Xác định các trường dữ liệu và dùng `DataTableColumnHeader` cho tiêu đề.
2. **Khởi tạo Logic:** Gọi `useDataTable` để lấy biến `table`.
3. **Lắp ghép giao diện:**
* Bọc tất cả vào `TableInstanceProvider`.
* Đặt `DataTableToolbar` (chứa các bộ lọc) lên trên.
* Đặt `DataTable` ở giữa.
* `DataTablePagination` sẽ nằm ở dưới cùng (hoặc tích hợp trong DataTable).



Dương có muốn mình hỗ trợ viết một file **`columns.tsx`** mẫu theo chuẩn này cho một loại dữ liệu bất kỳ không?


Component `DataTableColumnHeader` là một thành phần cực kỳ quan trọng trong bộ UI Table mà bạn đang nghiên cứu. Nói một cách đơn giản, nó là **"Tiêu đề cột thông minh"**.

Thay vì chỉ hiển thị một dòng chữ tĩnh (ví dụ: "Tên sản phẩm"), nó cung cấp cho người dùng một menu để tương tác trực tiếp với cột đó.

Dưới đây là 4 chức năng chính mà nó thực hiện:

### 1. Điều khiển Sắp xếp (Sorting Control)

Đây là tính năng quan trọng nhất. Khi click vào tiêu đề, nó cho phép người dùng chọn:

* **Asc (Ascending):** Sắp xếp tăng dần.
* **Desc (Descending):** Sắp xếp giảm dần.
* Nó tự động thay đổi icon (Mũi tên lên, mũi tên xuống, hoặc icon mặc định) để người dùng biết cột nào đang được sort.

### 2. Đồng bộ với URL (Server-side State)

Bạn hãy chú ý dòng code: `const [columnName, sortOrder] = searchParams.get("sort")?.split(".") ?? []`.

* Component này không chỉ đổi màu icon cho vui, nó đọc trực tiếp từ URL của trình duyệt (ví dụ: `?sort=price.desc`).
* Điều này giúp trạng thái sắp xếp luôn tồn tại ngay cả khi người dùng F5 lại trang hoặc gửi link cho người khác. Rất phù hợp với kiến trúc của **Shopio** khi bạn muốn lọc danh sách sản phẩm.

### 3. Ẩn cột (Column Visibility)

Nó cung cấp tùy chọn **"Hide"** (icon con mắt gạch chéo).

* Khi click vào đây, cột đó sẽ biến mất khỏi bảng.
* Tính năng này rất hữu ích cho các bảng có quá nhiều dữ liệu (như bảng quản lý chi tiết đơn hàng), giúp người dùng ẩn đi những thông tin họ không quan tâm để đỡ rối mắt.

### 4. Xử lý UI linh hoạt (Responsive & Accessible)

* Nó sử dụng `DropdownMenu` của Radix UI, đảm bảo việc hiển thị đẹp mắt và hỗ trợ tốt cho người dùng sử dụng bàn phím (Accessibility).
* Nó tự động kiểm tra: Nếu một cột được cấu hình là `getCanSort() === false`, nó sẽ không hiển thị các nút sort để tránh lỗi logic.

---

### Cách áp dụng vào code của bạn:

Trong file định nghĩa cột (`columns.tsx`), thay vì viết `header: "Giá"`, bạn sẽ dùng nó như thế này:

```tsx
{
  accessorKey: "price",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Giá bán" />
  ),
}

```

**Tóm lại:** Thành phần này biến cái header vô hồn thành một "bộ điều khiển" mạnh mẽ, giúp bảng của bạn trông chuyên nghiệp như các dashboard của Stripe hay Vercel.

Component `DataTableColumnsVisibility` là một công cụ giúp người dùng **tùy chỉnh hiển thị các cột** trong bảng một cách nhanh chóng.

Nếu cái `DataTableColumnHeader` bạn xem lúc nãy cho phép ẩn từng cột một tại tiêu đề, thì component này giống như một "trung tâm điều khiển" giúp ẩn/hiện hàng loạt cột từ một menu duy nhất.

Dưới đây là 3 điểm "xịn" nhất của component này:

### 1. Menu bật/tắt cột hàng loạt

Nó quét qua toàn bộ các cột trong bảng (`table.getAllColumns()`), sau đó tạo ra một danh sách các checkbox.

* Khi bạn tích vào một checkbox, cột đó sẽ hiện ra.
* Khi bỏ tích, cột đó sẽ biến mất ngay lập tức.
* Nó thông minh ở chỗ chỉ liệt kê các cột **có thể ẩn** (`column.getCanHide()`), tránh việc người dùng vô tình ẩn đi các cột quan trọng (như cột ID hoặc cột Thao tác).

### 2. Hỗ trợ phím tắt (Hotkeys) - Rất chuyên nghiệp

Bạn có thể thấy dòng: `useHotkeys("shift+c", () => { ... })`.

* Người dùng chỉ cần nhấn tổ hợp phím **Shift + C** trên bàn phím là menu này tự động bật ra.
* Đây là tính năng cực kỳ hữu ích cho các Admin thường xuyên phải làm việc với các bảng dữ liệu lớn, giúp họ thao tác nhanh mà không cần dùng chuột.

### 3. Trải nghiệm người dùng (UX) tinh tế

* **Tooltip:** Khi di chuột vào nút "Columns", nó hiện ra một khung nhỏ nhắc nhở phím tắt (`Shift + C`) nhờ component `<Kbd>`.
* **Table Instance Context:** Nó lấy dữ liệu bảng thông qua `useTableInstanceContext()`. Điều này có nghĩa là bạn có thể đặt component này ở **bất cứ đâu** trong trang (ví dụ trên thanh Toolbar) mà nó vẫn hiểu và điều khiển được cái bảng bên dưới.

---

### Ứng dụng thực tế cho dự án của bạn:

* **Dự án Shopio:** Trong trang quản lý sản phẩm, có thể bạn có rất nhiều cột: *Tên, Giá, Kho, Ngày tạo, SKU, Cân nặng, Kích thước...* Không phải lúc nào người bán cũng muốn xem hết. Họ sẽ dùng nút này để chỉ hiện *Tên* và *Kho* cho gọn.
* **Dự án SmartDoc-AI:** Người dùng có thể ẩn bớt các cột thông tin phụ của tài liệu (như *Dung lượng file* hay *Người tạo*) để tập trung vào *Tên tài liệu* và *Ngày chỉnh sửa*.

**Một lưu ý nhỏ:** Component này sử dụng `tableInstance` từ một `Provider`. Để nó hoạt động, bạn cần đảm bảo bảng của bạn được bọc trong một Context Provider tương ứng (giống như cách tác giả repo kia đã làm).


Đây chính là "trái tim" giúp các component con (như `DataTableColumnsVisibility` hay `DataTableToolbar`) có thể điều khiển được bảng mà không cần bạn phải truyền `props` qua quá nhiều tầng (gọi là **Prop Drilling**).

Hãy tưởng tượng `TableInstanceProvider` như một **trạm phát sóng**: Nó thu thập mọi thông tin của bảng (dữ liệu, trạng thái ẩn/hiện cột, phân trang) và phát cho bất kỳ component nào bên trong nó cần dùng.

---

### Phân tích chi tiết mã nguồn:

#### 1. Khởi tạo Context (`createContext`)

Đoạn code này tạo ra một "kho chứa" dùng chung.

* **`tableInstance`**: Chứa toàn bộ trạng thái hiện tại của bảng (TanStack Table object).
* **`setTableInstance`**: Hàm để cập nhật lại bảng nếu cần.

#### 2. Custom Hook (`useTableInstanceContext`)

Đây là một cách viết rất chuyên nghiệp. Thay vì mỗi lần dùng bạn phải gọi `useContext(TableInstanceContext)`, bạn chỉ cần gọi `useTableInstanceContext()`.

* **Cơ chế an toàn:** Nếu bạn quên không bọc Provider bên ngoài mà đã dùng Hook này, nó sẽ `throw new Error`. Điều này giúp bạn tránh được các lỗi "undefined" khó chịu khi phát triển dự án **Shopio** hay **SmartDoc-AI**.

#### 3. Component Provider (`TableInstanceProvider`)

Đây là nơi "bao bọc" các thành phần của bảng. Nó nhận vào biến `table` (được tạo từ hook `useReactTable`) và chia sẻ nó xuống dưới.

---

### Cách áp dụng thực tế (Step-by-step):

Để hệ thống này hoạt động, bạn cần tổ chức file `data-table.tsx` của mình như sau:

```tsx
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // 1. Khởi tạo table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // ... các cấu hình khác
  })

  return (
    // 2. Bọc toàn bộ Table và Toolbar vào Provider
    <TableInstanceProvider table={table}>
      <div className="space-y-4">
        {/* Giờ thì Toolbar có thể dùng useTableInstanceContext để lấy thông tin bảng */}
        <DataTableToolbar /> 
        
        <div className="rounded-md border">
          <Table>
            {/* Render bảng như bình thường */}
          </Table>
        </div>
        
        <DataTablePagination />
      </div>
    </TableInstanceProvider>
  )
}

```

### Tại sao bạn nên dùng cách này thay vì truyền Props?

1. **Code cực kỳ sạch:** Bạn không cần phải viết `<DataTableToolbar table={table} />`. Toolbar tự biết cách "tìm" đến table thông qua Context.
2. **Dễ dàng mở rộng:** Nếu sau này bạn muốn thêm một nút "Xuất Excel" hay "Xóa hàng loạt", bạn chỉ cần tạo component mới và gọi `useTableInstanceContext()`.
3. **Tối ưu hiệu suất:** Việc tách biệt logic quản lý instance giúp bạn dễ dàng kiểm soát quá trình re-render, điều này rất quan trọng khi bạn xử lý danh sách hàng trăm tài liệu trong **SmartDoc-AI** trên máy có cấu hình RAM vừa phải.

**Bạn đã nắm được cách kết nối giữa Provider này và các component UI chưa? Nếu rồi, mình có thể hướng dẫn bạn cách viết một bộ Filter (lọc dữ liệu) cực kỳ linh hoạt dựa trên Context này.**


Component `DataTableFacetedFilter` là một bộ lọc **đa lựa chọn (Multi-select)** cực kỳ mạnh mẽ. Nếu bạn từng dùng các trang như Tiki hay Shopee, bạn sẽ thấy nó giống hệt bộ lọc bên trái (lọc theo Thương hiệu, Màu sắc, v.v.).

Đây là linh hồn của phần lọc dữ liệu trong dự án **Shopio** (lọc theo Danh mục, Trạng thái đơn hàng) hoặc **SmartDoc-AI** (lọc theo Loại tài liệu, Phòng ban).

### Các tính năng "đắt giá" của component này:

#### 1. Hiển thị thông minh (Smart Badges)

* Nó không chỉ hiển thị một danh sách nhàm chán. Khi bạn chọn 1 hoặc 2 item, nó sẽ hiện tên các item đó lên (ví dụ: "Active", "Pending").
* Nếu bạn chọn quá nhiều (từ 3 cái trở lên), nó sẽ tự động thu gọn lại thành số lượng (ví dụ: "3 selected") để thanh Toolbar không bị tràn, giữ giao diện sạch sẽ.

#### 2. Hiển thị số lượng (Faceted Counts)

Hãy chú ý đoạn `column?.getFacetedUniqueValues()`.

* Nó có khả năng hiển thị số lượng bản ghi tương ứng với mỗi lựa chọn ngay bên cạnh (ví dụ: `Active (15)`, `Pending (2)`).
* Điều này giúp người dùng biết trước là nếu họ bấm vào "Pending" thì sẽ có bao nhiêu kết quả hiện ra.

#### 3. Tích hợp thanh tìm kiếm nhanh

Bên trong menu popover có một `<CommandInput />`. Nếu danh sách lọc của bạn quá dài (ví dụ lọc danh sách 50 thương hiệu điện thoại), người dùng có thể gõ để tìm nhanh thương hiệu họ cần thay vì cuộn chuột.

#### 4. Đồng bộ hóa State phức tạp

Thay vì chỉ lọc ở Client, component này nhận vào `setSelectedOptions`. Khi bạn click chọn một item, nó sẽ cập nhật vào một mảng các điều kiện lọc. Mảng này sau đó thường được dùng để build lại URL (ví dụ: `?status=active.pending`) để gửi lên Server (Spring Boot/Django) lấy dữ liệu mới.

---

### Cách áp dụng thực tế vào dự án của bạn:

Trong `DataTableToolbar`, bạn sẽ gọi nó như thế này:

```tsx
// Ví dụ lọc theo trạng thái sản phẩm trong Shopio
<DataTableFacetedFilter
  column={table.getColumn("status")}
  title="Trạng thái"
  options={[
    { label: "Đang bán", value: "active", icon: CheckIcon },
    { label: "Hết hàng", value: "out_of_stock", icon: CrossIcon },
  ]}
  selectedOption={currentFilter} // Lấy từ state của bạn
  setSelectedOptions={setFilters} // Hàm cập nhật state
/>

```

### Tại sao nó giúp tối ưu hệ thống (RAM/Performance)?

Bằng cách lọc chính xác ngay từ đầu thông qua các Faceted Filter này, bạn sẽ giảm thiểu lượng dữ liệu thừa tải từ Backend về Frontend. Thay vì load 1000 sản phẩm rồi mới lọc, người dùng chọn "Hết hàng" và bạn chỉ load đúng 20 sản phẩm đó. Điều này cực kỳ phù hợp với tiêu chí tiết kiệm tài nguyên mà bạn đặt ra.

**Bạn có muốn mình hướng dẫn cách viết logic để chuyển đổi những cái "click" trên bộ lọc này thành một URL string hoàn chỉnh để gửi lên API không?**

Component `DataTablePagination` này là mảnh ghép cuối cùng để hoàn thiện bộ UI Table chuyên nghiệp của bạn. Nó chịu trách nhiệm điều hướng qua các trang dữ liệu, giúp ứng dụng không phải tải toàn bộ hàng nghìn bản ghi cùng lúc—điều này cực kỳ quan trọng để **tiết kiệm RAM** và tối ưu hiệu năng như mục tiêu của bạn.

Dưới đây là phân tích chi tiết các chức năng của nó:

### 1. Hiển thị thông tin lựa chọn (Selection State)

Dòng đầu tiên của component hiển thị số lượng hàng đang được chọn:
`{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.`

* Tính năng này cực kỳ hữu ích cho các tác vụ như **Xóa hàng loạt** sản phẩm trong **Shopio** hoặc **Tải về hàng loạt** tài liệu trong **SmartDoc-AI**.

### 2. Điều chỉnh số hàng trên mỗi trang (Rows per page)

Component sử dụng một `Select` để người dùng chọn xem họ muốn xem 10, 20 hay 50 bản ghi cùng lúc.

* **Logic quan trọng:** Khi thay đổi số lượng bản ghi/trang (`onValueChange`), code tự động đưa người dùng về trang đầu tiên (`table.setPageIndex(0)`). Điều này giúp tránh lỗi logic khi số lượng trang bị thay đổi đột ngột.

### 3. Điều hướng linh hoạt (Navigation)

Nó cung cấp 4 nút bấm điều hướng chuẩn:

* **Về trang đầu/Đến trang cuối:** Sử dụng `DoubleArrow` icons (chỉ hiện trên màn hình lớn `lg:flex`).
* **Trang trước/Trang sau:** Sử dụng `Chevron` icons.
* **Trạng thái Disabled:** Các nút tự động "mờ đi" nếu không thể chuyển tiếp (ví dụ: đang ở trang cuối thì nút Next sẽ bị khóa).

### 4. Đồng bộ với URL (Server-side Pagination)

Hãy chú ý hai dòng này:
`const page = searchParams.get("page") ?? 1`
`const perPage = searchParams.get("per_page") ?? 10`

Giống như các component trước, nó đọc trực tiếp từ URL. Điều này có nghĩa là khi người dùng nhấn "Next", URL sẽ chuyển thành `?page=2`.

* **Lợi ích:** Khi bạn làm việc với **Spring Boot**, Backend của bạn chỉ cần nhận 2 tham số này để thực hiện câu lệnh `LIMIT 10 OFFSET 10` trong SQL. Nó giúp hệ thống của bạn xử lý hàng triệu sản phẩm mà vẫn cực kỳ nhẹ nhàng.

---

### Cách kết nối vào `DataTable` của bạn:

Trong file `data-table.tsx` dùng chung, bạn chỉ cần đặt nó ở phía dưới cùng:

```tsx
export function DataTable({ columns, data, pageCount }) {
  // ... khởi tạo table instance
  
  return (
    <TableInstanceProvider table={table}>
       <div className="space-y-4">
          <DataTableToolbar />
          <div className="rounded-md border">
            <Table>...</Table>
          </div>
          {/* Đặt Pagination ở đây */}
          <DataTablePagination />
       </div>
    </TableInstanceProvider>
  )
}

```

### Điểm lưu ý cho Dương khi dùng với Spring Boot:

Trong dự án **Shopio**, mặc dù component này gọi các hàm như `table.nextPage()`, nhưng vì bạn đang dùng **Manual Pagination** (phân trang thủ công phía server), các hàm này thực chất sẽ kích hoạt việc thay đổi URL. Bạn cần lắng nghe sự thay đổi URL này ở trang `page.tsx` để gọi lại API từ Spring Boot.

**Bạn đã hoàn tất việc tìm hiểu các component cốt lõi của bộ Table này! Bạn có muốn mình tổng hợp lại một quy trình chuẩn để bạn copy bộ code này vào dự án mới một cách nhanh nhất không?**

Đây là component "tổng lực" kết hợp tất cả các mảnh ghép mà Dương đã xem từ nãy đến giờ thành một giao diện hoàn chỉnh. Hãy để mình phân tích những điểm hay nhất của file `DataTable` này, đặc biệt là cách nó giúp ích cho dự án **Shopio** của bạn.

---

### 1. Cơ chế render linh hoạt (`flexRender`)

Tác giả sử dụng `flexRender` của TanStack Table. Đây là lý do tại sao bảng của bạn có thể hiển thị bất cứ thứ gì:

* **Headers:** Có thể là chữ thuần túy hoặc là component `DataTableColumnHeader` (có menu Sort).
* **Cells:** Có thể là text, số, hoặc một cái **Badge** trạng thái, hoặc một tấm **hình sản phẩm** thu nhỏ.
* Nó tự động xử lý `isPlaceholder` để tránh lỗi khi render các cột được nhóm (grouped columns).

### 2. Sự xuất hiện của `floatingBar` (Tính năng nâng cao)

Đây là một chi tiết rất tinh tế. Dương để ý đoạn:
`{table.getFilteredSelectedRowModel().rows.length > 0 && floatingBar}`

* Khi bạn tích chọn một hoặc nhiều sản phẩm trong **Shopio**, một thanh công cụ sẽ "nổi" lên ở phía dưới (thường chứa các nút như: *Xóa hàng loạt, Cập nhật giá, Xuất hóa đơn*).
* Nếu không chọn hàng nào, nó sẽ tự ẩn đi để tiết kiệm không gian màn hình.

### 3. Tối ưu hóa giao diện (UX)

* **`data-state={row.getIsSelected() && "selected"}`**: Khi bạn click chọn một hàng, hàng đó sẽ đổi màu nền (thường là màu xanh nhạt hoặc xám). Điều này giúp người dùng không bị nhầm lẫn khi thao tác trên các bảng nhiều dữ liệu.
* **`No results`**: Một chi tiết nhỏ nhưng quan trọng. Thay vì để bảng trắng trơn khi không tìm thấy sản phẩm, nó sẽ hiện thông báo căn giữa rất rõ ràng.

### 4. Tích hợp sẵn Phân trang

`DataTablePagination` được đặt ngay bên dưới bảng. Vì nó nằm trong cùng một luồng logic với `table` instance, mọi thao tác đổi trang ở đây sẽ lập tức làm bảng render lại dữ liệu mới.

---

### Cách Dương sử dụng nó trong Page (ví dụ Product Page):

```tsx
// src/app/admin/products/page.tsx

export default function ProductsPage() {
  // Giả sử bạn đã khởi tạo 'table' bằng hook useDataTable
  const { table } = useDataTable({ data, columns, ... })

  return (
    <DataTable 
      table={table} 
      floatingBar={
        <div className="p-2 bg-black text-white rounded shadow">
           <Button onClick={handleBulkDelete}>Xóa các sản phẩm đã chọn</Button>
        </div>
      }
    >
      {/* Bạn có thể bỏ DataTableToolbar vào đây thông qua {children} */}
      <DataTableToolbar />
    </DataTable>
  )
}

```

### Tại sao cấu trúc này cực kỳ "sướng" khi code?

1. **Dùng chung cho cả 2 dự án:** Dương có thể copy nguyên file này vào cả **Shopio** (Java) và **SmartDoc-AI** (Django). Nó chỉ là cái "vỏ" render, không quan tâm Backend là gì.
2. **Sạch sẽ:** Mọi logic phức tạp về tính toán vị trí, phân trang, filter đã được đóng gói hết vào biến `table`. File giao diện này chỉ tập trung vào việc hiển thị.
3. **Tiết kiệm RAM:** Bằng cách tách biệt phần UI (`DataTable`) và phần Logic (`useDataTable`), React sẽ chỉ re-render những phần thực sự thay đổi, giúp máy dev của bạn chạy nhẹ nhàng hơn.

**Dương đã nắm được cách kết nối biến `table` vào component này chưa? Nếu muốn, mình có thể hướng dẫn bạn cách viết cái hook `useDataTable` - nơi thực sự "điều khiển" mọi thứ đằng sau hậu trường!**


Đây là file **quan trọng nhất** trong toàn bộ hệ thống DataTable của bạn. Hook `useDataTable` đóng vai trò là "bộ não" điều khiển mọi logic: từ việc xử lý URL, Debounce tìm kiếm, cho đến việc đồng bộ trạng thái giữa Client và Server.

Vì Dương đang làm dự án **Shopio (Java)** và **SmartDoc-AI (Python)**, hook này cực kỳ hữu ích vì nó chuyển toàn bộ gánh nặng xử lý dữ liệu cho Backend.

---

### Các tính năng "đắt giá" trong Hook này:

#### 1. Đồng bộ hóa URL (URL-State Management)

Đây là kỹ thuật chuyên nghiệp nhất hiện nay. Mọi thay đổi trên bảng (chuyển trang, lọc, sắp xếp) đều được cập nhật lên thanh địa chỉ (URL).

* **Lợi ích:** Người dùng có thể copy link `.../products?page=2&status=active` gửi cho đồng nghiệp, và khi mở ra, bảng sẽ hiện đúng trang 2 với trạng thái active.
* Nó sử dụng `router.push` với `{ scroll: false }` để giữ nguyên vị trí cuộn trang, tạo cảm giác mượt mà như ứng dụng Single Page.

#### 2. Xử lý Tìm kiếm thông minh với Debounce

Dương hãy chú ý đoạn `useDebounce(..., 500)`.

* Khi người dùng gõ tên sản phẩm vào ô tìm kiếm, nó sẽ **không** gọi API ngay lập tức sau mỗi phím gõ. Nó đợi người dùng ngừng gõ trong **500ms** rồi mới bắt đầu lọc.
* **Tối ưu tài nguyên:** Giảm số lượng request gửi lên Spring Boot/Django, giúp server của bạn không bị quá tải khi có nhiều người dùng cùng tìm kiếm.

#### 3. Chế độ "Manual" (Server-side)

Trong cấu hình `useReactTable`, tác giả đặt:

```ts
manualPagination: true,
manualSorting: true,
manualFiltering: true,

```

Điều này ép TanStack Table **không** tự lọc dữ liệu trên trình duyệt. Thay vào đó, nó chỉ lấy các thông số (page, sort, filter) và chờ bạn cung cấp dữ liệu mới từ API. Điều này rất đúng với phong cách tiết kiệm RAM máy tính người dùng mà bạn muốn.

#### 4. Validate dữ liệu với Zod

Sử dụng `z.object` để parse `searchParams`. Nếu ai đó cố tình nhập `?page=abc` (không phải số) vào URL, Zod sẽ tự động đưa nó về giá trị mặc định là `1`, giúp ứng dụng của bạn không bị crash.

---

### Cách áp dụng cho Shopio & SmartDoc-AI:

Để hook này hoạt động với Backend của bạn, quy trình sẽ như sau:

1. **Tại Client (Next.js):** Hook này sẽ tạo ra các URL như:
`?page=1&per_page=10&sort=price.desc&category=electronics`
2. **Tại Backend (Spring Boot/Django):** Bạn viết API nhận các Params này:
* **Spring Boot:** Dùng `@RequestParam` hoặc `Pageable` để nhận `page`, `size`, `sort`.
* **Django:** Dùng `request.GET.get('page')` hoặc `django-filter`.



### Một mẹo nhỏ cho Dương:

Trong file này, tác giả dùng dấu chấm `.` để phân tách (ví dụ: `price.desc` hoặc `active.pending`).

* Nếu Backend Java của bạn yêu cầu dấu phẩy `,` (ví dụ: `price,desc` - chuẩn mặc định của Spring Data JPA), bạn chỉ cần sửa nhẹ ở hàm `useEffect` chỗ `sorting` và `filterableColumnFilters`.

---

### Tổng kết hệ thống DataTable bạn đang có:

1. **Type định nghĩa:** Đảm bảo an toàn dữ liệu.
2. **Provider:** Chia sẻ dữ liệu cho các component con.
3. **UI Components:** Header, Pagination, Faceted Filter, Column Visibility.
4. **Hook useDataTable:** Điều khiển toàn bộ logic và URL.

Dương đã có trong tay một bộ mã nguồn **Table chuẩn Enterprise**. Bạn có muốn mình viết một ví dụ hoàn chỉnh về file `page.tsx` để kết nối "bộ não" này với dữ liệu thật từ API không? Nếu có dữ liệu mẫu của Shopio, mình sẽ làm ví dụ sát thực tế luôn!

