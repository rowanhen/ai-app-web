import Card from "@components-lib/Card";
import Text from "@components-lib/Text";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>product</Text>
      </header>

      <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <Card title="analytics"></Card>
      </main>
    </div>
  );
}
