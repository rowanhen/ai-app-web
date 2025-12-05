import DataTable from "@components-lib/DataTable";
import * as React from "react";
import { Trade } from "~/generated/api/schemas";
import styles from "./TradesTable.module.scss";

interface TradesTableContentProps {
  error: unknown;
  trades: Trade[];
  isFetching: boolean;
}

// Format timestamp from bigint string to readable date
function formatTimestamp(timestamp: string): string {
  try {
    const timestampNum = BigInt(timestamp);
    const date = new Date(Number(timestampNum));
    return date.toLocaleString();
  } catch {
    return timestamp;
  }
}

export function TradesTableContent({
  error,
  trades,
  isFetching,
}: TradesTableContentProps) {
  // Format trades data for DataTable (2D string array)
  const tableData = React.useMemo(() => {
    if (error) {
      return [["Error loading trades. Please try again."]];
    }

    // Only show "No trades available" if we have a confirmed empty result and not fetching
    // With placeholderData, we'll keep showing previous data while fetching
    if (trades.length === 0 && !isFetching) {
      return [["No trades available"]];
    }

    // If fetching and no trades yet, return empty to avoid flashing "No trades available"
    if (trades.length === 0 && isFetching) {
      return [];
    }

    // Define the columns we want to display (removed tradeId, added timestamp)
    const columns = [
      { key: "timestamp", label: "Timestamp" },
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
        const value = (trade as unknown as Record<string, unknown>)[col.key];
        if (value === null || value === undefined) {
          return "";
        }
        // Format timestamp specially
        if (col.key === "timestamp" && typeof value === "string") {
          return formatTimestamp(value);
        }
        return String(value);
      });
    });

    return [headerRow, ...dataRows];
  }, [error, trades, isFetching]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tradesTableWrapper}>
        <DataTable data={tableData} />
      </div>
    </div>
  );
}
