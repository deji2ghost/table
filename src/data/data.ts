import { HeaderGroup, Row, Table, useReactTable } from "@tanstack/react-table";

export interface dataProps {
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

export interface TableProps {
  tableHeader: HeaderGroup<dataProps>[];
  tableBody: {
    rows: Row<dataProps>[];
  };
  table: ReturnType<typeof useReactTable<dataProps>>;
}

export interface HeaderProps {
  HeaderGroup: HeaderGroup<dataProps>;
  id: string;
}

export interface HeadRowProps {
  id: string;
  element: React.ReactNode;
}

export interface TableBodyRowProps {
  row: Row<dataProps>;
  index: number;
  id: string;
  table: Table<dataProps>
}
