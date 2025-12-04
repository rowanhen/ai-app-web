import Button from "@components-lib/Button";
import Card from "@components-lib/Card";
import Input from "@components-lib/Input";
import Text from "@components-lib/Text";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [walletAddress, setWalletAddress] = React.useState<string>("");

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <header>
        <Text style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>
          product
        </Text>
        <Link to="/account" style={{ textDecoration: "none" }}>
          <Button theme="SECONDARY">account</Button>
        </Link>
      </header>

      {/* Main Content - Centered Card */}
      <main>
        <Card title="Enter your Hyperliquid wallet address">
          <Text>Enter your Hyperliquid wallet address</Text>
          <Input
            placeholder="0x..."
            value={walletAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWalletAddress(e.target.value)
            }
          />
        </Card>
      </main>
    </div>
  );
}
