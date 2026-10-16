
import type { Table } from "@tanstack/react-table"
import { createContext, useContext, useState } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableInstanceContextProps<T = any> {
  tableInstance: Table<T>
  setTableInstance: React.Dispatch<React.SetStateAction<Table<T>>>
}

const TableInstanceContext = createContext<TableInstanceContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableInstance: {} as Table<any>,
  setTableInstance: () => { },
})

// eslint-disable-next-line react-refresh/only-export-components
export function useTableInstanceContext() {
  const context = useContext(TableInstanceContext)
  if (!context) {
    throw new Error(
      "useTableInstanceContext must be used within a TableInstanceProvider"
    )
  }
  return context
}

export function TableInstanceProvider<T>({
  table,
  children,
}: {
  table: Table<T>
  children: React.ReactNode
}) {
  const [tableInstance, setTableInstance] = useState<Table<T>>(table)

  return (
    <TableInstanceContext.Provider value={{ tableInstance, setTableInstance }}>
      {children}
    </TableInstanceContext.Provider>
  )
}