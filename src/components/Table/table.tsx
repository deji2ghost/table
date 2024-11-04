import { TableProps } from "../../data/data";
import TableBodyRow from "../TableBodyRow/tableBodyRow";
import TableHeadRow from "../TableHeadRow/tableHeadRow";

const Table = ({ tableHeader, tableBody, table }: TableProps) => {
  return (
    <table className="border text-left shadow-2xl w-[95%] md:w-[60%] rounded mx-auto">
      <thead className="bg-white hidden md:block">
        {tableHeader.map((headerGroup) => (
          <TableHeadRow
            HeaderGroup={headerGroup}
            id={headerGroup.id}
            key={headerGroup.id}
          />
        ))}
      </thead>
      <tbody className="">
        {tableBody.rows.map((row, index) => (
          <TableBodyRow table={table} row={row} id={row.id} key={row.id} index={index} />
        ))}
      </tbody>
      <div className="px-1 flex justify-between relative">
        {table.getCanPreviousPage() ? (
          <button className="font-semibold p-1" onClick={() => table.previousPage()}>
            Previous
          </button>
        ) : (
          <span></span>
        )}
        {table.getCanNextPage() ? (
          <button className="font-semibold p-1" onClick={() => table.nextPage()}>
            Next
          </button>
        ) : (
          <span></span>
        )}
      </div>
    </table>
  );
};

export default Table;
