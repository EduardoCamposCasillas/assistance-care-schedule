import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import jsonData from "../../csvjson.json"
import EditableCell from "./EditableCell"
import { useState } from "react"
function FlightTable() {

  const columns = [
    {
      header: "ID",
      accessorKey: 'id',
    },
    {
      header: "Nombre",
      accessorKey: 'nombre',
      cell: EditableCell,
    },
    {
      header: "Servicios",
      accessorKey: 'serviciosAgente',
    },
    {
      header: "Aerolinea",
      accessorKey: 'aerolinea',
    },
    {
      header: "No. Vuelo",
      accessorKey: 'noArrival',
    },
    {
      header: "Hora",
      accessorKey: 'arrivalTime',
    },
    {
      header: "Servicios",
      accessorKey: 'serviciosArrival',
    },
    {
      header: "Destino",
      accessorKey: 'destinoArrival',
    },
    {
      header: "No. Vuelo",
      accessorKey: 'noDeparture',
    },
    {
      header: "ETA",
      accessorKey: 'departureTime',
    },
    {
      header: "Servicios",
      accessorKey: 'serviciosDeparture',
    },
    {
      header: "Destino",
      accessorKey: 'destinoDeparture',
    },
    {
      header: "Posicion",
      accessorKey: 'posicion',
    },

  ]
  const [data, setData] = useState(jsonData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => setData(
        prev => prev.map(
          (row, index) =>
            index === rowIndex ? {
              ...prev[rowIndex],
              [columnId]: value,
            } : row
        )
      )
    },
  })
  console.log(data)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th className="px-6 py-3" key={header.id}>
                      {header.column.columnDef.header}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map((row) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default FlightTable