import ActionButton from "@components-lib/ActionButton";
import Card from "@components-lib/Card";
import Input from "@components-lib/Input";
import ModalAlert from "@components-lib/modals/ModalAlert";
import { useModals } from "@components-lib/page/ModalContext";
import Text from "@components-lib/Text";
import TradesTable from "@components/TradesTable";
import UserWallets from "@components/UserWallets";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
        width: "100%",
        padding: "2rem",
        gap: "2rem",
        display: "flex",
        flexDirection: "column",
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

      {/* Main Content - Centered Card */}
      <main>
        <Card title="Lookup a wallet">
          <Text>Enter your Hyperliquid wallet address</Text>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <Input
                placeholder="0x..."
                value={walletAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWalletAddress(e.target.value)
                }
                onKeyDown={handleKeyPress}
                disabled={addWalletMutation.isPending}
              />
            </div>
            <ActionButton onClick={handleSubmit}>
              {addWalletMutation.isPending ? "Adding..." : "Add Wallet"}
            </ActionButton>
          </div>
        </Card>
        <UserWallets />
        <TradesTable />
      </main>
    </div>
  );
}
