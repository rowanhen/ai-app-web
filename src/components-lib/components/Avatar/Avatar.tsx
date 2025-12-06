import styles from "./Avatar.module.scss";
import { CustomLink } from "@components/CustomLink";
import type { LinkProps } from "@tanstack/react-router";

import * as Utilities from "@common-lib/utilities";
import * as React from "react";

interface AvatarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className" | "children"
> {
  src?: string;
  href?: string;
  to?: LinkProps["to"];
  target?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, style: propStyle, href, to, target, children, ...rest } = props;

  const backgroundStyle = src ? { backgroundImage: `url(${src})` } : {};

  const combinedStyle = { ...propStyle, ...backgroundStyle };

  let avatarElement: React.ReactElement;

  if (to || href) {
    avatarElement = (
      <CustomLink
        className={Utilities.classNames(src ? styles.root : styles.placeholder)}
        style={combinedStyle}
        to={to}
        href={href}
        target={target}
        tabIndex={0}
        role="link"
      />
    );
  } else {
    avatarElement = (
      <figure
        className={Utilities.classNames(src ? styles.root : styles.placeholder)}
        style={combinedStyle}
      />
    );
  }

  if (!children) {
    return avatarElement;
  }

  return (
    <div className={styles.parent} {...rest}>
      {avatarElement}
      <span className={styles.right}>{children}</span>
    </div>
  );
};

export default Avatar;
