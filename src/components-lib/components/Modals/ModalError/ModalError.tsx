import styles from "./ModalError.module.scss";

import { useModals } from "@components-lib/Modals/ModalContext";
import { useHotkeys } from "@modules-lib/hotkeys";

import ActionButton from "@components-lib/ActionButton";
import CardDouble from "@components-lib/CardDouble";
import Grid from "@components-lib/Grid";

interface ModalErrorProps {
  buttonText?: string | any;
  message: string | any;
  title?: string;
}

// TODO(jimmylee)
// Enter doesn't always work for some reason.
function ModalError({ message, buttonText, title }: ModalErrorProps) {
  const { close } = useModals();

  useHotkeys("enter", () => close());

  return (
    <div className={styles.root}>
      <CardDouble title={title}>
        <br />
        {message}
        <Grid>
          <ul>
            <li>
              Press{" "}
              <ActionButton hotkey="⏎" onClick={() => close()}>
                ENTER
              </ActionButton>{" "}
              to continue.
            </li>
          </ul>
        </Grid>
      </CardDouble>
    </div>
  );
}

export default ModalError;
