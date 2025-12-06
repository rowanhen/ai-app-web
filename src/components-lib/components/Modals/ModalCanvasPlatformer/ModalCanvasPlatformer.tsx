import styles from "./ModalCanvasPlatformer.module.scss";

import * as Utilities from "@common-lib/utilities";

import { useModals } from "@components-lib/Modals/ModalContext";

import Button from "@components-lib/Button";
import CanvasPlatformer from "@components-lib/CanvasPlatformer";
import Card from "@components-lib/Card";

interface ModalCanvasPlatformerProps {
  buttonText?: string | any;
}

function ModalCanvasPlatformer({ buttonText }: ModalCanvasPlatformerProps) {
  const { close } = useModals();

  return (
    <div className={styles.root}>
      <Card title="ALERT">
        <CanvasPlatformer rows={12} />
        <br />
        <br />
        <Button onClick={() => close()}>
          {Utilities.isEmpty(buttonText) ? "Close" : buttonText}
        </Button>
      </Card>
    </div>
  );
}

export default ModalCanvasPlatformer;
