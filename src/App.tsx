import { useEffect, useState } from "react";
import "./App.css";
import { LuLoader } from "react-icons/lu";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface dataProps {
  csupply: string;
  id: string;
  market_cap_usd: string;
  msupply: string;
  name: string;
  nameid: string;
  percent_change_1h: string;
  percent_change_7d: string;
  percent_change_24h: string;
  price_btc: string;
  price_usd: string;
  rank: number;
  symbol: string;
  tsupply: string;
  volume24: number;
  volume24a: number;
}
function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<dataProps[]>([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.coinlore.net/api/tickers/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const columnHelper = createColumnHelper<dataProps>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Coin</span>,
    }),
    columnHelper.accessor("symbol", {
      cell: (info) => info.getValue(),
      header: () => <span>Code</span>,
    }),
    columnHelper.accessor("price_usd", {
      cell: (info) => <>${info.getValue()}</>,
      header: () => <span>Price</span>,
    }),
    columnHelper.accessor("tsupply", {
      cell: (info) => (
        <>
          {info.getValue()} {info.row.original.symbol}
        </>
      ),
      header: () => <span>Total Supply</span>,
    }),
  ];

  const table = useReactTable({
    data: data && data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-1 justify-center border items-center h-screen">
        <span>Loading...</span>
        <span>
          <LuLoader />
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-1 justify-center border items-center h-screen">
        Error message: {error}
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f3f3f3] flex justify-center items-center">
      <>
        <table className="outline outline-gray-600 text-left shadow-2xl w-[80%] rounded mx-auto">
          <thead className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="flex items-center justify-between"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 w-full">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`flex items-center justify-between ${
                  index % 2 !== 0 ? "bg-[#FFFFFF]" : "bg-[#E4E4E4]"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 w-full">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <div></div>
          <div className="px-3 flex justify-between relative">
            {table.getCanPreviousPage() ? (
              <button className=" top-0" onClick={() => table.previousPage()}>prev</button> )
              :
              <span></span>
            }
            {table.getCanNextPage() ? (
              <button className=" top-0" onClick={() => table.nextPage()}>next</button>
            ) : <span></span>}
          </div>
        </table>
      </>
    </div>
  );
}

export default App;
