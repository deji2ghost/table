import { useEffect, useState } from "react";
import "./App.css";
import { LuLoader } from "react-icons/lu";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "./components/Table/table";
import { dataProps } from "./data/data";

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
        <Table
          tableHeader={table.getHeaderGroups()}
          tableBody={table.getRowModel()}
          table={table}
        />
      </>
    </div>
  );
}

export default App;
