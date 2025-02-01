import { IMenuItem } from "@/types/menu.types";
import Link from "next/link";

import styles from './index.module.sass';

interface IProps {
  items: IMenuItem[];
}

export default function Menu(props: IProps) {
  const { items } = props;

  return (
    <nav className={styles.menu}>
      {items.map(({ id, label, url }) => (
        <Link
          key={`menu item - ${label} - ${id}`}
          href={url}
          className="text--small color--white"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
