import styles from "@components-lib/ActionListItem.module.scss";
import { CustomLink } from "@components/CustomLink";
import type { LinkProps } from "@tanstack/react-router";

import * as React from "react";

interface ActionListItemProps {
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  to?: LinkProps["to"];
  target?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
}

const ActionListItem: React.FC<ActionListItemProps> = (props) => {
  const { href, to, target, onClick, children, icon, style } = props;

  if (href || to) {
    return (
      <CustomLink
        className={styles.item}
        to={to}
        href={href}
        target={target}
        style={style}
        tabIndex={0}
        role="link"
      >
        <figure className={styles.icon}>{icon}</figure>
        <span className={styles.text}>{children}</span>
      </CustomLink>
    );
  }

  return (
    <div
      className={styles.item}
      onClick={onClick}
      style={style}
      tabIndex={0}
      role="button"
    >
      <figure className={styles.icon}>{icon}</figure>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default ActionListItem;
