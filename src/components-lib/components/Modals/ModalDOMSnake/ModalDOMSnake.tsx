import styles from "./ModalCanvasSnake.module.scss";

import * as Utilities from "@common-lib/utilities";

import { useModals } from "@components-lib/Modals/ModalContext";

import Button from "@components-lib/Button";
import Card from "@components-lib/Card";
import DOMSnake from "@components-lib/DOMSnake";

interface ModalDOMSnakeProps {
  buttonText?: string | any;
}

function ModalDOMSnake({ buttonText }: ModalDOMSnakeProps) {
  const { close } = useModals();

  return (
    <div className={styles.root}>
      <Card title="DOM SNAKE">
        <DOMSnake height={14} width={34} />
        <br />
        <br />
        <Button onClick={() => close()}>
          {Utilities.isEmpty(buttonText) ? "Close" : buttonText}
        </Button>
      </Card>
    </div>
  );
}

export default ModalDOMSnake;
