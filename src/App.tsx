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
import { FaFaceGrinTongueSquint, FaNewspaper, FaSackDollar } from "react-icons/fa6";
import { BiLineChartDown } from "react-icons/bi";

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
      cell: ({ row }) => {
        const item = row.original

        return (<div>
            <h1 className="flex items-center gap-1 md:hidden"><FaSackDollar /> <span>Coin</span></h1>
            <h1>{item.name}</h1>
          </div>)
    },
      header: () => <span className="flex items-center gap-1"><FaSackDollar /> <span>Coin</span></span>,
    }),
    columnHelper.accessor("symbol", {
      cell: ({ row }) => {
        const item = row.original

        return (
        <div>
          <h1 className="flex items-center gap-1 md:hidden"><FaNewspaper /> <span>Code</span></h1>
          <h1>{item.symbol}</h1>
        </div>)
    },
      header: () => <span className="flex items-center gap-1"><FaNewspaper /> <span>Code</span></span>,
    }),
    columnHelper.accessor("price_usd", {
      cell: ({ row }) => {
        const item = row.original

        return (
          <div>
            <h1 className="flex items-center gap-1 md:hidden"><FaFaceGrinTongueSquint /> <span>Price</span></h1>
            <h1>{item.price_usd}</h1>
          </div>
      )
    },
      header: () => <span className="flex items-center gap-1"><FaFaceGrinTongueSquint /> <span>Price</span></span>,
    }),
    columnHelper.accessor("tsupply", {
      cell: ({ row }) => {
        const item = row.original

        return (
        <div>
          <h1 className="flex items-center gap-1 md:hidden"><BiLineChartDown /><span>Total Supply</span></h1>
          <h1>{item.tsupply} {item.symbol}</h1>
          </div>)
    },
      header: () => <span className="flex items-center gap-1"><BiLineChartDown /><span>Total Supply</span></span>,
    }),
  ];

  const table = useReactTable<dataProps>({
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
    <div className="min-h-screen bg-[#f3f3f3] flex justify-center items-center">
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
