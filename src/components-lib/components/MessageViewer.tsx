import styles from "@components-lib/MessageViewer.module.scss";

interface MessageViewerProps {
  children: React.ReactNode;
}

const MessageViewer = ({ children }: MessageViewerProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.left}>
        <div className={styles.bubble}>{children}</div>
      </div>
      <div className={styles.right}>
        <figure className={styles.triangle} />
      </div>
    </div>
  );
};

export default MessageViewer;
