// src/lib/hooks/use-data-table.ts
import type { DataTableFilterField } from "@/components/common/data-table/types"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { createQueryString } from "@/lib/utils/create-query-string"
import {
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table"
import * as React from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router"

interface UseDataTableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    pageCount: number
    defaultPerPage?: number
    defaultSort?: `${Extract<keyof TData, string | number>}.${"asc" | "desc"}`
    filterFields?: DataTableFilterField<TData>[]
}

export function useDataTable<TData, TValue>({
    data,
    columns,
    pageCount,
    defaultPerPage = 10,
    defaultSort,
    filterFields = [],
}: UseDataTableProps<TData, TValue>) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const searchParamsString = searchParams.toString()

    const page = Number(searchParams.get("page")) || 1
    const perPage = Number(searchParams.get("per_page")) || defaultPerPage
    const sort = searchParams.get("sort") ?? defaultSort
    const [column, order] = sort?.split(".") ?? []

    const { searchableColumns, filterableColumns } = React.useMemo(
        () => ({
            searchableColumns: filterFields.filter((field) => !field.options),
            filterableColumns: filterFields.filter((field) => field.options),
        }),
        [filterFields]
    )

    // Initial column filters từ URL
    const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
        return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
            (filters, [key, value]) => {
                const filterableColumn = filterableColumns.find(
                    (c) => c.value === key
                )
                const searchableColumn = searchableColumns.find((c) => c.value === key)

                if (filterableColumn) {
                    filters.push({ id: key, value: value.split(".") })
                } else if (searchableColumn) {
                    filters.push({ id: key, value: [value] })
                }
                return filters
            },
            []
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterableColumns, searchableColumns, searchParamsString])

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>(initialColumnFilters)

    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: page - 1,
            pageSize: perPage,
        })

    const pagination = React.useMemo(
        () => ({ pageIndex, pageSize }),
        [pageIndex, pageSize]
    )

    // ---- Pagination → URL ----
    React.useEffect(() => {
        const currentPage = Number(searchParams.get("page")) || 1
        const currentPerPage =
            Number(searchParams.get("per_page")) || defaultPerPage

        if (currentPage === pageIndex + 1 && currentPerPage === pageSize) return

        navigate(
            `${pathname}?${createQueryString(
                { page: pageIndex + 1, per_page: pageSize },
                searchParams
            )}`,
            { preventScrollReset: true, replace: true }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, searchParamsString])

    const [sorting, setSorting] = React.useState<SortingState>([
        { id: column ?? "", desc: order === "desc" },
    ])

    // ---- Sorting → URL ----
    React.useEffect(() => {
        const currentSort = searchParams.get("sort") ?? defaultSort
        const nextSort = sorting[0]?.id
            ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
            : undefined

        if (currentSort === nextSort) return
        if (!currentSort && !nextSort) return

        navigate(
            `${pathname}?${createQueryString({ page, sort: nextSort }, searchParams)}`,
            { preventScrollReset: true, replace: true }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorting, searchParamsString])

    const table = useReactTable({
        data,
        columns,
        pageCount: pageCount ?? -1,
        state: {
            pagination,
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    })

    // ============================================================
    // 🔑 FIX DEBOUNCE: Tách searchable và filterable, debounce CHUỖI STRING
    // ============================================================

    // 1️⃣ Tách 2 loại filter
    const searchableFilters = React.useMemo(
        () =>
            columnFilters.filter((filter) =>
                searchableColumns.find((column) => column.value === filter.id)
            ),
        [columnFilters, searchableColumns]
    )

    const filterableFilters = React.useMemo(
        () =>
            columnFilters.filter((filter) =>
                filterableColumns.find((column) => column.value === filter.id)
            ),
        [columnFilters, filterableColumns]
    )

    // 2️⃣ Convert searchableFilters thành string ổn định
    //    String này CHỈ đổi khi filter value thực sự đổi
    const searchableFiltersString = React.useMemo(
        () => JSON.stringify(searchableFilters),
        [searchableFilters]
    )

    // 3️⃣ Debounce CHUỖI STRING (không phải object/array)
    const debouncedSearchableFiltersString = useDebounce(
        searchableFiltersString,
        500
    )

    // 4️⃣ Parse lại từ string đã debounce
    const debouncedSearchableFilters = React.useMemo(
        () => JSON.parse(debouncedSearchableFiltersString) as ColumnFiltersState,
        [debouncedSearchableFiltersString]
    )

    // ---- Filtering → URL ----
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        if (!mounted) {
            setMounted(true)
            return
        }

        const newParamsObject: Record<string, string | number | null> = {
            page: 1,
        }

        // Handle debounced searchable filters
        for (const col of debouncedSearchableFilters) {
            if (typeof col.value === "string") {
                Object.assign(newParamsObject, { [col.id]: col.value })
            }
        }

        // Handle filterable filters (không debounce)
        for (const col of filterableFilters) {
            if (Array.isArray(col.value)) {
                Object.assign(newParamsObject, { [col.id]: col.value.join(".") })
            }
        }

        // Xóa filter cũ không còn
        for (const key of searchParams.keys()) {
            if (key === "page" || key === "per_page" || key === "sort") continue

            const isSearchable = searchableColumns.find((c) => c.value === key)
            const isFilterable = filterableColumns.find((c) => c.value === key)

            if (isSearchable && !debouncedSearchableFilters.find((c) => c.id === key)) {
                Object.assign(newParamsObject, { [key]: null })
            }
            if (isFilterable && !filterableFilters.find((c) => c.id === key)) {
                Object.assign(newParamsObject, { [key]: null })
            }
        }

        const nextQS = createQueryString(newParamsObject, searchParams)
        const currentQS = searchParams.toString()

        // 🛑 GUARD
        if (nextQS === currentQS) return

        navigate(`${pathname}?${nextQS}`, {
            preventScrollReset: true,
            replace: true,
        })

        table.setPageIndex(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        debouncedSearchableFiltersString,
        JSON.stringify(filterableFilters),
        searchParamsString,
    ])

    return { table }
}