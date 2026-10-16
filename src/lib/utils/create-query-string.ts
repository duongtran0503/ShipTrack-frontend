import type { SearchParams } from "@/lib/types/query"

export type Params = Partial<
    Record<keyof SearchParams, string | number | null | undefined>
>

export function createQueryString(
    params: Params,
    searchParams: URLSearchParams
) {
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) {
            newSearchParams.delete(key)
        } else {
            newSearchParams.set(key, String(value))
        }
    }

    return newSearchParams.toString()
}