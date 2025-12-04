import styles from "@components-lib/modals/ModalAlert.module.scss";

import * as Utilities from "@common-lib/utilities";

import { useModals } from "@components-lib/page/ModalContext";

import Button from "@components-lib/Button";
import Card from "@components-lib/Card";

interface ModalAlertProps {
  buttonText?: string | any;
  message: string;
}

function ModalAlert({ message, buttonText }: ModalAlertProps) {
  const { close } = useModals();

  return (
    <div className={styles.root}>
      <Card title="ALERT">
        {message}
        <br />
        <br />
        <Button onClick={() => close()}>
          {Utilities.isEmpty(buttonText) ? "Close" : buttonText}
        </Button>
      </Card>
    </div>
  );
}

export default ModalAlert;
