import { useEffect, useState } from "react";
import "./App.css";
import { LuLoader } from "react-icons/lu";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "./components/Table/table";
import { dataProps } from "./data/data";
import FetchTickers from "./services/calls";
import { AxiosError } from "axios";
import { columns } from "./utils/Constants";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<dataProps[]>([]);

  const table = useReactTable<dataProps>({
    data: data && data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const getTickers = async() => {
      try{
        setLoading(true)
        const newData = await FetchTickers()
        setData(newData.data.data)
      } catch (error){
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message || error.message); // Handle Axios error
        } else {
          setError('An unexpected error occurred'); // Handle non-Axios errors
        }
      } finally {
        setLoading(false)
      }
    }
    getTickers();
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
    <div className="min-h-screen py-8 bg-[#fdfdfd] flex justify-center items-center">
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
