import Button from "@components-lib/Button";
import Text from "@components-lib/Text";
import TradesTable from "@components/TradesTable";
import UserWallets from "@components/UserWallets";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  component: Account,
});

function Account() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text>product</Text>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button theme="SECONDARY">Home</Button>
        </Link>
      </header>

      {/* Main Content */}
      <main style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <UserWallets />
        <TradesTable />
      </main>
    </div>
  );
}
