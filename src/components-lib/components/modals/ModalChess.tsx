import styles from "@components-lib/modals/ModalChess.module.scss";

import * as Utilities from "@common-lib/utilities";

import { useModals } from "@components-lib/page/ModalContext";
import { useHotkeys } from "@modules-lib/hotkeys";

import Button from "@components-lib/Button";
import CardDouble from "@components-lib/CardDouble";
import Chessboard from "@components-lib/Chessboard";

interface ModalErrorProps {
  buttonText?: string | any;
  board: string[][];
  title?: string;
}

function ModalChess({ board, buttonText, title }: ModalErrorProps) {
  const { close } = useModals();

  useHotkeys("enter", () => close());

  return (
    <div className={styles.root}>
      <CardDouble title={title} style={{ textAlign: "center" }}>
        <Chessboard board={board} />
        <br />
        <br />
        <Button onClick={() => close()}>
          {Utilities.isEmpty(buttonText) ? "CLOSE" : buttonText}
        </Button>
      </CardDouble>
    </div>
  );
}

export default ModalChess;
