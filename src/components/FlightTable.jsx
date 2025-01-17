import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import EditableCell from "./EditableCell"; // Si necesitas celdas editables
import usePVRFlights from "../hooks/usePVRFlights"; // Importa el hook

function FlightTable() {
  const { flights, loading, error } = usePVRFlights(); // Obtén los datos del hook

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
      cell: EditableCell,
    },
    {
      header: "Aerolinea",
      accessorKey: 'aerolinea',
    },
    {
      header: "Numero de vuelo",
      accessorKey: 'noArrival',
    },
    {
      header: "Hora llegada",
      accessorKey: 'arrivalTime',
    },
    {
      header: "Servicios",
      accessorKey: 'serviciosArrival',
      cell: EditableCell,
    },
    {
      header: "Destino",
      accessorKey: 'destinoArrival',
    },
    {
      header: "Salida",
      accessorKey: 'noDeparture',
    },
    {
      header: "ETA",
      accessorKey: 'departureTime',
    },
    {
      header: "Servicios",
      accessorKey: 'serviciosDeparture',
      cell: EditableCell,
    },
    {
      header: "Destino",
      accessorKey: 'destinoDeparture',
    },
    {
      header: "Posicion",
      accessorKey: 'posicion',
      cell: EditableCell,
    },
  ];
  console.log(flights);
  // Si no hay vuelos, aseguramos que haya al menos 50 filas vacías
  const data = flights.length > 0 ? flights : new Array(50).fill({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => setData(prev => prev.map((row, index) =>
        index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row
      )),
    },
  });

  if (loading) return <p>Cargando vuelos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-3">
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightTable;
