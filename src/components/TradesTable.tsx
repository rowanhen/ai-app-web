import Card from "@components-lib/Card";
import DataTable from "@components-lib/DataTable";
import Text from "@components-lib/Text";
import * as React from "react";
import { useGetTrades } from "~/generated/api/trades/trades";

function TradesTable() {
  const { data: tradesResponse, isLoading, error } = useGetTrades();

  const trades = tradesResponse?.data?.trades;

  // Format trades data for DataTable (2D string array)
  const tableData = React.useMemo(() => {
    if (!trades || trades.length === 0) {
      return [["No trades available"]];
    }

    // Define the columns we want to display
    const columns = [
      { key: "tradeId", label: "Trade ID" },
      { key: "coin", label: "Coin" },
      { key: "sz", label: "Position Size" },
      { key: "startPosition", label: "Start Position" },
      { key: "closedPnl", label: "PnL" },
    ];

    // Create header row
    const headerRow = columns.map((col) => col.label);

    // Create data rows
    const dataRows = trades.map((trade) => {
      return columns.map((col) => {
        const value = trade[col.key as keyof typeof trade];
        if (value === null || value === undefined) {
          return "";
        }
        return String(value);
      });
    });

    return [headerRow, ...dataRows];
  }, [trades]);

  if (isLoading) {
    return (
      <Card title="Your Trades">
        <Text>Loading trades...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Your Trades">
        <Text>Error loading trades. Please try again.</Text>
      </Card>
    );
  }

  if (!trades || trades.length === 0) {
    return (
      <Card title="Your Trades">
        <Text>No trades found.</Text>
      </Card>
    );
  }

  return (
    <Card title={`Your Trades (${trades.length})`}>
      <div style={{ maxHeight: "500px", width: "100%", overflowY: "scroll" }}>
        <DataTable data={tableData} />
      </div>
    </Card>
  );
}

export default TradesTable;
