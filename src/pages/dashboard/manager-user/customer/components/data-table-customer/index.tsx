import TableUser from "@/pages/dashboard/manager-user/customer/components/data-table-customer/table-user";
import { MOCK_USERS } from "@/pages/dashboard/manager-user/customer/components/data-table-customer/type";

export default function TableCustomer() {
    return <div>
        <TableUser data={MOCK_USERS} pageCount={1} />
    </div>
}