/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(
      row.index,
      column.id,
      value
    )
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  return (

    <input
      className="w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-offset-2"
      value={value}
      onChange={(e => setValue(e.target.value))}
      onBlur={onBlur}
    >
    </input>

  )
}
export default EditableCell;