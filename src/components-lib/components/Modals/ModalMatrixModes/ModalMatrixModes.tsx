import styles from "./ModalMatrixModes.module.scss";

import * as Utilities from "@common-lib/utilities";

import { useModals } from "@components-lib/Modals/ModalContext";

import Button from "@components-lib/Button";
import Card from "@components-lib/Card";
import MatrixLoader from "@components-lib/MatrixLoader";

interface ModalMatrixModesProps {
  buttonText?: string | any;
}

function ModalMatrixModes({ buttonText }: ModalMatrixModesProps) {
  const { close } = useModals();

  return (
    <div className={styles.root}>
      <Card title="MATRIX MODES">
        <Card title="KATAKANA DEFAULT">
          <MatrixLoader rows={32} mode="katakana" />
        </Card>
        <Card title="GREEK LTR">
          <MatrixLoader direction="left-to-right" rows={8} mode="greek" />
        </Card>
        <br />
        <br />
        <Button onClick={() => close()}>
          {Utilities.isEmpty(buttonText) ? "Close" : buttonText}
        </Button>
      </Card>
    </div>
  );
}

export default ModalMatrixModes;
