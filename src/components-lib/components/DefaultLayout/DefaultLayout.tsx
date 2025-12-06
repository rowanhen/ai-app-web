import styles from "./DefaultLayout.module.scss";

import * as React from "react";

import ModalStack from "@components-lib/Modals/ModalStack";

interface DefaultLayoutProps {
  previewPixelSRC: string;
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  previewPixelSRC,
  children,
}) => {
  return (
    <div className={styles.body}>
      <img className={styles.pixel} src={previewPixelSRC} alt="" />
      {children}
      <ModalStack />
    </div>
  );
};

export default DefaultLayout;
