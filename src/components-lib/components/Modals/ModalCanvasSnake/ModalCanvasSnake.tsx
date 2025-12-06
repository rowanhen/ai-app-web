import styles from "./ModalCanvasSnake.module.scss";

import * as Utilities from "@common-lib/utilities";

import { useModals } from "@components-lib/Modals/ModalContext";

import Button from "@components-lib/Button";
import CanvasSnake from "@components-lib/CanvasSnake";
import Card from "@components-lib/Card";

interface ModalCanvasSnakeProps {
  buttonText?: string | any;
}

function ModalCanvasSnake({ buttonText }: ModalCanvasSnakeProps) {
  const { close } = useModals();

  return (
    <div className={styles.root}>
      <Card title="CANVAS PLATFORMER">
        <CanvasSnake rows={12} />
        <br />
        <br />
        <Button onClick={() => close()}>
          {Utilities.isEmpty(buttonText) ? "Close" : buttonText}
        </Button>
      </Card>
    </div>
  );
}

export default ModalCanvasSnake;
