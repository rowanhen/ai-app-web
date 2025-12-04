import Button from "@components-lib/Button";
import Card from "@components-lib/Card";
import Input from "@components-lib/Input";
import ModalAlert from "@components-lib/modals/ModalAlert";
import { useModals } from "@components-lib/page/ModalContext";
import Text from "@components-lib/Text";
import TradesTable from "@components/TradesTable";
import UserWallets from "@components/UserWallets";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { usePostWallets } from "~/generated/api/wallets/wallets";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [walletAddress, setWalletAddress] = React.useState<string>("");
  const addWalletMutation = usePostWallets();
  const queryClient = useQueryClient();
  const { open } = useModals();

  const handleSubmit = () => {
    if (!walletAddress.trim()) {
      open(ModalAlert, {
        message: "Please enter a wallet address",
        buttonText: "OK",
      });
      return;
    }

    addWalletMutation.mutate(
      {
        data: {
          address: walletAddress.trim(),
          blockchain: "hyperliquid",
        },
      },
      {
        onSuccess: () => {
          // Clear the input
          setWalletAddress("");
          // Invalidate wallets query to refetch
          queryClient.invalidateQueries({ queryKey: ["/wallets"] });
          // Also invalidate trades since adding a wallet affects trades
          queryClient.invalidateQueries({ queryKey: ["/trades"] });
          // Show success message
          open(ModalAlert, {
            message: "Wallet added successfully!",
            buttonText: "OK",
          });
        },
        onError: (error: any) => {
          // Show error message
          const errorMessage =
            error?.data?.message ||
            error?.message ||
            "Failed to add wallet. Please try again.";
          open(ModalAlert, {
            message: errorMessage,
            buttonText: "OK",
          });
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
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
        <Text>product</Text>
        <Link to="/account" style={{ textDecoration: "none" }}>
          <Button theme="SECONDARY">account</Button>
        </Link>
      </header>

      {/* Main Content - Centered Card */}
      <main>
        <Card title="Enter your Hyperliquid wallet address">
          <Text>Enter your Hyperliquid wallet address</Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <Input
              placeholder="0x..."
              value={walletAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWalletAddress(e.target.value)
              }
              onKeyPress={handleKeyPress}
              disabled={addWalletMutation.isPending}
            />
            <Button
              onClick={handleSubmit}
              disabled={addWalletMutation.isPending || !walletAddress.trim()}
            >
              {addWalletMutation.isPending ? "Adding..." : "Add Wallet"}
            </Button>
          </div>
        </Card>
        <UserWallets />
        <TradesTable />
      </main>
    </div>
  );
}
