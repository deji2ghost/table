import { flexRender } from "@tanstack/react-table";
import { HeaderProps } from "../../data/data";
import HeadRow from "./headRow";

const TableHeadRow = ({ HeaderGroup, id }: HeaderProps) => {
  return (
    <>
      <tr key={id} className="flex items-center justify-between">
        {HeaderGroup.headers.map((header) => (
          <HeadRow
            id={header.id}
            key={header.id}
            element={flexRender(
              header.column.columnDef.header,
              header.getContext()
            )}
          />
        ))}
      </tr>
    </>
  );
};

export default TableHeadRow;
