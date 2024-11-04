import { createColumnHelper } from "@tanstack/react-table";
import { dataProps } from "../data/data";

const columnHelper = createColumnHelper<dataProps>();

export const columns = [
  columnHelper.accessor("name", {
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div>
          <h1 className="flex items-center gap-1 md:hidden text-[14px] font-bold">💰 Coin</h1>
          <h1 className="text-[14px]">{item.name}</h1>
        </div>
      );
    },
    header: () => <span className="flex items-center gap-1 text-[14px]">💰 Coin</span>,
  }),
  columnHelper.accessor("symbol", {
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div>
          <h1 className="flex items-center gap-1 md:hidden text-[14px] font-bold">📄 Code</h1>
          <h1 className="text-[14px]">{item.symbol}</h1>
        </div>
      );
    },
    header: () => <span className="flex items-center gap-1 text-[14px]">📄 Code</span>,
  }),
  columnHelper.accessor("price_usd", {
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div>
          <h1 className="flex items-center gap-1 md:hidden text-[14px] font-bold">🤑 Price</h1>
          <h1 className="text-[14px]">{item.price_usd}</h1>
        </div>
      );
    },
    header: () => <span className="flex items-center gap-1 text-[14px]">🤑 Price</span>,
  }),
  columnHelper.accessor("tsupply", {
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div>
          <h1 className="flex items-center gap-1 md:hidden text-[14px] font-bold">📉 Total Supply</h1>
          <h1 className="text-[14px]">
            {item.tsupply} {item.symbol}
          </h1>
        </div>
      );
    },
    header: () => (
      <span className="flex items-center gap-1 text-[14px]">📉Total Supply</span>
    ),
  }),
];
