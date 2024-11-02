import { TableProps } from "../../data/data";
import TableBodyRow from "../TableBodyRow/tableBodyRow";
import TableHeadRow from "../TableHeadRow/tableHeadRow";

const Table = ({ tableHeader, tableBody, table }: TableProps) => {
  return (
    <table className="border text-left shadow-2xl w-[80%] rounded mx-auto">
      <thead className="bg-white">
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
          <TableBodyRow row={row} id={row.id} key={row.id} index={index} />
        ))}
      </tbody>
      <div></div>
      <div className="px-3 flex justify-between relative">
        {table.getCanPreviousPage() ? (
          <button className=" top-0" onClick={() => table.previousPage()}>
            prev
          </button>
        ) : (
          <span></span>
        )}
        {table.getCanNextPage() ? (
          <button className=" top-0" onClick={() => table.nextPage()}>
            next
          </button>
        ) : (
          <span></span>
        )}
      </div>
    </table>
  );
};

export default Table;
