import Menu from "./Menu/index.server";
import Link from "next/link";
import Image from "next/image";

import { getMenus } from "@/actions/menu";

// Styles
import styles from './index.module.sass';

export default async function Footer() {
  const { quick, legal } = await getMenus(['quick', 'legal']);

  return (
    <footer className={styles.footer}>
      <div className="container height--100 fl fl--justify-b">
        <Link href="/">
          <Image
            src="/img/logo.webp"
            alt="logo"
            width={193}
            height={134}
          />
        </Link>
        <div className={`${styles.footer__menus}`}>
          <Menu menu={quick} />
          <Menu menu={legal} />
        </div>
      </div>
    </footer>
  );
}
