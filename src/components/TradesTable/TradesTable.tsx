import ActionButton from "@components-lib/ActionButton";
import BlockLoader from "@components-lib/BlockLoader";
import Card from "@components-lib/Card";
import DatePicker from "@components-lib/DatePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { customInstance } from "~/app/config/mutator";
import type { SuccessResponse } from "~/generated/api/schemas";
import { useGetTrades } from "~/generated/api/trades/trades";
import styles from "./TradesTable.module.scss";
import { TradesTableContent } from "./TradesTableContent";

function TradesTable() {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  // Convert dates to timestamps (milliseconds)
  const params = React.useMemo(() => {
    const params: {
      startDate?: string;
      endDate?: string;
    } = {};
    if (startDate) {
      params.startDate = startDate.getTime().toString();
    }
    if (endDate) {
      params.endDate = endDate.getTime().toString();
    }
    return Object.keys(params).length > 0 ? params : undefined;
  }, [startDate, endDate]);

  const {
    data: tradesResponse,
    isLoading,
    error,
    isFetching,
  } = useGetTrades(params, {
    query: {
      placeholderData: (previousData) => previousData,
    },
  });
  const queryClient = useQueryClient();

  const syncTradesMutation = useMutation({
    mutationFn: async () => {
      return customInstance<SuccessResponse>({
        url: `/trades/sync`,
        method: "POST",
      });
    },
    onSuccess: () => {
      // Invalidate trades query to refetch after sync
      queryClient.invalidateQueries({ queryKey: ["/trades"] });
    },
  });

  const trades = tradesResponse?.data?.trades;
  const tradesCount = trades?.length ?? 0;

  const hasFilters = startDate || endDate;

  return (
    <div className={styles.container}>
      <Card title={`Your Trades (${tradesCount})`} style={{ flex: 1 }}>
        <div className={styles.refreshContainer}>
          <ActionButton onClick={() => syncTradesMutation.mutate()}>
            Refresh Trades
          </ActionButton>
          {(isLoading || isFetching) && <BlockLoader />}
        </div>
        <TradesTableContent
          error={error}
          trades={tradesResponse?.data?.trades ?? []}
          isFetching={isFetching}
        />
      </Card>
      <Card title="Filters">
        <div className={styles.filtersContainer}>
          <DatePicker
            label="Start Date"
            selectedDate={startDate}
            onDateSelect={setStartDate}
          />
          <DatePicker
            label="End Date"
            selectedDate={endDate}
            onDateSelect={setEndDate}
          />
          {hasFilters && (
            <ActionButton
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              style={{ marginTop: "1rem" }}
            >
              Clear Filters
            </ActionButton>
          )}
        </div>
      </Card>
    </div>
  );
}

export default TradesTable;
