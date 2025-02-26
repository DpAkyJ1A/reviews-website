import Menu from "./Menu/index.server";
import Link from "next/link";
import Image from "next/image";
import Cart from "./Cart/index.client";

import { getMenu } from "@/actions/menu";

// Styles
import styles from './index.module.sass';
import { IGood } from "@/types/good.types";
import Currency from "./Currency/index.client";

interface IProps {
  whiteGoods?: IGood[];
}

export default async function Header(props: IProps) {
  const { whiteGoods } = props;
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
        <Currency />
        <Cart whiteGoods={whiteGoods} />
      </div>
    </header>
  );
}
