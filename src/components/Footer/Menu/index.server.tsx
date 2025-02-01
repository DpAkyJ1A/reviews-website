import { IMenu } from "@/types/menu.types";
import Link from "next/link";
import Text from "@/common/Text/index.server";

import styles from './index.module.sass';

interface IProps {
  menu: IMenu;
}

export default function Menu(props: IProps) {
  const {
    menu: {
      label: menuLabel = '',
      name = '',
      items = []
    } = {}
  } = props;

  return (
    <nav className={styles.menu}>
      <Text>
        {name}
      </Text>
      <div className={styles.menu__items}>
      {items.map(({ id, label, url }) => (
        <Link
          key={`menu - ${menuLabel} item - ${label} - ${id}`}
          href={url}
          className="text--small color--white"
        >
          {label}
        </Link>
      ))}
      </div>
    </nav>
  );
}
