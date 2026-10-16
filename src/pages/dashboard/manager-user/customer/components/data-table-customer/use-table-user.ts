import { type UserType, MOCK_USERS } from "@/pages/dashboard/manager-user/customer/components/data-table-customer/type"
import { useMemo } from "react"
import { useSearchParams } from "react-router"

export const useTableUser = () => {
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("per_page")) || 10
    const keyword = searchParams.get("name")?.toLowerCase() ?? ""
    const activeParam = searchParams.get("active")
    const roleParam = searchParams.get("role")

    const filtered = useMemo(() => {
        let result: UserType[] = [...MOCK_USERS]

        // Filter theo keyword (name)
        if (keyword) {
            result = result.filter((u) =>
                u.name.toLowerCase().includes(keyword)
            )
        }

        // Filter theo active (URL có thể là "true" / "false")
        if (activeParam) {
            const activeValues = activeParam.split(".").map((v) => v === "true")
            result = result.filter((u) => activeValues.includes(u.active))
        }

        // Filter theo role
        if (roleParam) {
            const roleValues = roleParam.split(".")
            result = result.filter((u) => roleValues.includes(u.role))
        }

        return result
    }, [keyword, activeParam, roleParam])

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))
    const start = (page - 1) * limit
    const paginated = filtered.slice(start, start + limit)

    return {
        users: paginated,
        totalPages,
        totalItems,
        isLoadingTable: false, // demo: không bao giờ loading
        error: null,
    }
}