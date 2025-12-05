import styles from "./SideNavigationBarLayout.module.scss";

interface SideNavigationBarLayoutProps {
  children: React.ReactNode;
  sideNavigationBar: React.ReactNode;
}

export const SideNavigationBarLayout = ({
  children,
  sideNavigationBar,
}: SideNavigationBarLayoutProps) => {
  return (
    <div className={styles.root}>
      {sideNavigationBar}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
