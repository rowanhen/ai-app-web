import styles from "@components-lib/Message.module.scss";

import * as React from "react";

interface MessageProps {
  children: React.ReactNode;
}

const Message = ({ children }: MessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.left}>
        <figure className={styles.triangle} />
      </div>
      <div className={styles.right}>
        <div className={styles.bubble}>{children}</div>
      </div>
    </div>
  );
};

export default Message;
