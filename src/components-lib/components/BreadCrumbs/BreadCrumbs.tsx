import styles from "./BreadCrumbs.module.scss";
import { CustomLink } from "@components/CustomLink";
import type { LinkProps } from "@tanstack/react-router";

import * as React from "react";

interface BreadCrumbsItem {
  url?: string;
  to?: LinkProps["to"];
  name: string;
}

interface BreadCrumbsProps {
  items: BreadCrumbsItem[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className={styles.root}>
      {items.map((item, index) => {
        const linkElement = item.to || item.url ? (
          <CustomLink
            className={styles.link}
            to={item.to}
            href={item.url}
            target={item.url ? "_blank" : undefined}
            tabIndex={0}
            role="link"
          >
            {item.name}
          </CustomLink>
        ) : (
          <span className={styles.link}>{item.name}</span>
        );

        return (
          <span className={styles.line} key={index}>
            {index === items.length - 1 ? (
              <span>{linkElement}</span>
            ) : (
              linkElement
            )}
            {index < items.length - 1 && (
              <span className={styles.symbol}> ❯ </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
