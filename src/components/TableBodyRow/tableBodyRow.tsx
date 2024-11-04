import { flexRender } from "@tanstack/react-table";
import BodyRow from "./bodyRow";
import { TableBodyRowProps } from "../../data/data";

const TableBodyRow = ({ row, index, id }: TableBodyRowProps) => {
  return (
    <tr
      key={id}
      className={`grid grid-cols-2 items-start md:flex md:flex-wrap md:items-center justify-between ${
        index % 2 !== 0 ? "bg-[#FFFFFF]" : "bg-[#E4E4E4]"
      }`}
    >
      {row.getVisibleCells().map((cell) => (
        <div className={`md:w-1/4`}>
            <BodyRow
              id={cell.id}
              element={flexRender(cell.column.columnDef.cell, cell.getContext())}
            />
        </div>
      ))}
    </tr>
  );
};

export default TableBodyRow;
