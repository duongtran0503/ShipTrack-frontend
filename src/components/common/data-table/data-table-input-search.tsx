
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
interface Props {
    handleParamKeyword: (value: string) => void
}
export default function DataTableInputSearch(props: Props) {
    const [value, setValue] = useState<string>("")
    return <div className=" p-1 flex items-center gap-x-2" >
        <Input
            placeholder="Tìm tên danh mục..."
            // Chuyển từ shopName sang name theo Interface mới
            value={value}
            onChange={(event) =>
                setValue(event.target.value)
            }
            className="h-8 w-64 shadow-sm"
        />
        <Button variant={"outline"} size={"sm"} onClick={() => props.handleParamKeyword(value)}>
            <Search />
        </Button>
    </div>
}