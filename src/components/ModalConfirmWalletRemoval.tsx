import styles from "@components-lib/modals/ModalAlert.module.scss";

import { useModals } from "@components-lib/page/ModalContext";

import Button from "@components-lib/Button";
import Card from "@components-lib/Card";

interface ModalConfirmWalletRemovalProps {
  walletAddress: string;
  onConfirm: () => void;
}

function ModalConfirmWalletRemoval({
  walletAddress,
  onConfirm,
}: ModalConfirmWalletRemovalProps) {
  const { close } = useModals();

  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <div className={styles.root}>
      <Card title="Remove Wallet">
        Are you sure you want to remove this wallet?
        <br />
        <br />
        <strong>Wallet Address:</strong> {walletAddress}
        <br />
        <br />
        This will remove the wallet from your trades and any associated notes.
        <br />
        <br />
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button theme="SECONDARY" onClick={handleConfirm}>
            Remove
          </Button>
          <Button theme="SECONDARY" onClick={() => close()}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ModalConfirmWalletRemoval;

