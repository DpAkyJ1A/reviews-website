import Menu from "./Menu/index.server";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart/index.client";

import { getMenu } from "@/actions/menu";

// Styles
import styles from './index.module.sass';

export default async function Header() {
  const { items } = await getMenu('main');

  return (
    <header className={styles.header}>
      <div className="container height--100 fl fl--justify-b fl--align-c">
        <Link href="/">
          <Image
            src="/img/logo.webp"
            alt="logo"
            width={115}
            height={80}
          />
        </Link>
        <Menu items={items} />
        <Cart />
      </div>
    </header>
  );
}
