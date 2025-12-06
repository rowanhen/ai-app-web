import ActionButton from "@components-lib/ActionButton";
import Card from "@components-lib/Card";
import { useModals } from "@components-lib/Modals/ModalContext";
import Text from "@components-lib/Text";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDeleteWalletsWalletId,
  useGetWallets,
} from "~/generated/api/wallets/wallets";

import { formatCryptoAddress } from "@common-lib/utilities";
import { Wallet } from "~/generated/api/schemas/wallet";
import ModalConfirmWalletRemoval from "./ModalConfirmWalletRemoval";

function UserWallets() {
  const { data: walletsResponse, isLoading, error } = useGetWallets();
  const deleteWalletMutation = useDeleteWalletsWalletId();
  const { open } = useModals();
  const queryClient = useQueryClient();

  const wallets = walletsResponse?.data?.wallets;

  const handleRemoveClick = (wallet: Wallet) => {
    const walletId = wallet.walletId;
    const walletAddress = wallet.address;

    open(ModalConfirmWalletRemoval, {
      walletAddress,
      onConfirm: () => {
        deleteWalletMutation.mutate(
          { walletId },
          {
            onSuccess: () => {
              // Invalidate wallets query to refetch
              queryClient.invalidateQueries({ queryKey: ["/wallets"] });
              // Also invalidate trades since removing a wallet affects trades
              queryClient.invalidateQueries({ queryKey: ["/trades"] });
            },
          }
        );
      },
    });
  };

  if (isLoading) {
    return (
      <Card title="Your Wallets">
        <Text>Loading wallets...</Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Your Wallets">
        <Text>Error loading wallets. Please try again.</Text>
      </Card>
    );
  }

  if (!wallets || wallets?.length === 0) {
    return (
      <Card title="Your Wallets">
        <Text>No wallets added yet.</Text>
      </Card>
    );
  }

  return (
    <div>
      <Card title={`Your Wallets (${wallets.length})`}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {wallets.map((wallet) => {
            const walletId = wallet.walletId;
            const walletAddress = wallet.address;

            return (
              <Card
                key={walletId}
                title={formatCryptoAddress(walletAddress, 6, 4)}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {wallet.createdAt && (
                    <Text>
                      <strong>Added:</strong>{" "}
                      {new Date(
                        wallet.createdAt as string
                      ).toLocaleDateString()}
                    </Text>
                  )}
                  <div style={{ marginTop: "1rem" }}>
                    <ActionButton
                      onClick={() => {
                        if (!deleteWalletMutation.isPending) {
                          handleRemoveClick(wallet);
                        }
                      }}
                    >
                      {deleteWalletMutation.isPending
                        ? "Removing..."
                        : "Remove"}
                    </ActionButton>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default UserWallets;
