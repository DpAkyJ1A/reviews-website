'use client';

import { useState } from "react";

import Icon from "@/common/Icon/index.client";

import styles from './index.module.sass';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.cart}>
      <Icon
        icon="linear/cart"
        size={40}
        classNames={{
          wrapper: `${styles.cart} cursor--pointer`,
          icon: 'stroke--white'
        }}
        onClick={() => setIsOpen(true)}
      />
      <div className={`${styles.cart__content} ${isOpen ? styles['cart__content--open'] : ''}`}>
        <Icon
          icon="linear/cross"
          size={50}
          classNames={{
            wrapper: `cursor--pointer`,
            icon: 'stroke--white'
          }}
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
