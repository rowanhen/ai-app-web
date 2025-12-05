import { generateGradientFromSeed } from "@common-lib/utilities";
import ActionListItem from "@components-lib/ActionListItem";
import Avatar from "@components-lib/Avatar";
import { FC, useMemo } from "react";
import { getSessionUserId } from "~/app/config/session";
import styles from "./SideNavigationBar.module.scss";

const SideNavigationBar: FC = () => {
  const userId = getSessionUserId();
  const gradientBackground = useMemo(() => {
    return generateGradientFromSeed(userId || "");
  }, [userId]);

  return (
    <div className={styles.root}>
      <div className={styles.avatarContainer}>
        <Avatar style={{ background: gradientBackground }} to="/account" />
      </div>
      <nav className={styles.nav}>
        <ActionListItem to="/" icon={`⊹`}>
          Dashboard
        </ActionListItem>
        <ActionListItem to="/journal" icon={`⊹`}>
          Journal
        </ActionListItem>
        <ActionListItem to="/analytics" icon={`⊹`}>
          Analytics
        </ActionListItem>
        <ActionListItem to="/account" icon={`⊹`}>
          Settings
        </ActionListItem>
      </nav>
    </div>
  );
};

export default SideNavigationBar;
