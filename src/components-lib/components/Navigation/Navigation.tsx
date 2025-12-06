import styles from "./Navigation.module.scss";
import { CustomLink } from "@components/CustomLink";
import type { LinkProps } from "@tanstack/react-router";

import * as React from "react";

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  logoHref?: string;
  logoTo?: LinkProps["to"];
  logoTarget?: React.HTMLAttributeAnchorTarget;
  onClickLogo?: React.MouseEventHandler<HTMLButtonElement>;
  logo?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({
  children,
  logoHref,
  logoTo,
  logoTarget,
  onClickLogo,
  logo,
  left,
  right,
}) => {
  let logoElement = <button className={styles.logo}>{logo}</button>;

  if (onClickLogo) {
    logoElement = (
      <button className={styles.logo} onClick={onClickLogo}>
        {logo}
      </button>
    );
  } else if (logoTo || logoHref) {
    logoElement = (
      <CustomLink
        to={logoTo}
        href={logoHref}
        className={styles.logo}
        target={logoTarget}
      >
        {logo}
      </CustomLink>
    );
  }

  return (
    <nav className={styles.root}>
      {logoElement}
      <section className={styles.left}>{left}</section>
      <section className={styles.children}>{children}</section>
      <section className={styles.right}>{right}</section>
    </nav>
  );
};

export default Navigation;
