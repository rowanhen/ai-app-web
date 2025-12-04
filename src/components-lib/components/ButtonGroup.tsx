import styles from "@components-lib/ButtonGroup.module.scss";

import * as Utilities from "@common-lib/utilities";

import ActionButton from "@components-lib/ActionButton";
import DropdownMenuTrigger from "@components-lib/DropdownMenuTrigger";

interface ButtonGroupProps {
  items: any[];
  isFull?: boolean;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  if (!props.items) {
    return null;
  }

  return (
    <div
      className={Utilities.classNames(
        styles.root,
        props.isFull ? styles.full : null
      )}
    >
      {props.items.map((each) => {
        if (each.items) {
          return (
            <DropdownMenuTrigger
              key={each.body}
              items={each.items}
              hotkey={each.openHotkey}
            >
              <ActionButton hotkey={each.hotkey} isSelected={each.selected}>
                {each.body}
              </ActionButton>
            </DropdownMenuTrigger>
          );
        }

        return (
          <ActionButton
            key={each.body}
            onClick={each.onClick}
            hotkey={each.hotkey}
            isSelected={each.selected}
          >
            {each.body}
          </ActionButton>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
