'use client';

import { useEffect, useState } from "react";

import Icon from "@/common/Icon/index.client";

import styles from './index.module.sass';
import { useCartStore } from "@/hooks/useCartStore";
import Text from "@/common/Text/index.server";
import Image from 'next/image';
import Button from "@/common/Button/index.client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { IGood } from "@/types/good.types";

interface IProps {
  whiteGoods?: IGood[];
}

export default function Cart(props: IProps) {
  const { whiteGoods } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { cart, totalPrice, clearCart, setGoods, goods } = useCartStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const viewCartHandle = () => {
    router.push('/cart');
  }

  const checkoutHandle = async () => {
    const updatedCart = cart.map((item) => {
      const whiteGood = goods.find((good) => good.label === item.actualLabel);

      if (!whiteGood) {
        toast("Something went wrong");
        return;
      }

      return {
        name: whiteGood?.name,
        description: whiteGood?.description,
        option: item?.optionIndex && whiteGood?.content?.options?.[item?.optionIndex]?.name || '',
        comment: item.comment,
        price: item.price,
        quantity: item.quantity
      }
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_SITE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: updatedCart,
          callbackUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { checkoutUrl } = await response.json();

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Try again.');
    }
  }

  useEffect(() => {
    if (!searchParams || !pathname) return;

    const session_id = searchParams.get("session_id");

    if (session_id) {
      clearCart();

      toast("Thank you for your purchase! Your order is being processed 🚀");

      router.push(pathname);
    }
  }, [searchParams, clearCart]);

  useEffect(() => {
    if (whiteGoods) {
      setGoods(whiteGoods);
    }
  }, [whiteGoods])

  return (
    <div className={styles.cart}>
      <Icon
        icon="linear/cart"
        size={40}
        classNames={{
          wrapper: `${styles.cart__open} cursor--pointer`,
          icon: 'stroke--white'
        }}
        onClick={() => setIsOpen(true)}
      />
      {cart.length > 0 ? (
        <span className={styles.cart__count}>
          <Text
            size="cart-count"
            color="black"
          >
            {cart.length}
          </Text>
        </span>
      ) : null}
      <div className={`${styles.cart__content} ${isOpen ? styles['cart__content--open'] : ''}`}>
        <Icon
          icon="linear/cross"
          size={50}
          classNames={{
            wrapper: `${styles.cart__close} cursor--pointer`,
            icon: 'stroke--white'
          }}
          onClick={() => setIsOpen(false)}
        />

        <Text
          size="cart"
          weight="700"
          className={`${styles.cart__title} turn--center`}
        >
          Cart
        </Text>

        {cart.length === 0 ? (
          <Text
            size="cart-item-title"
            weight="600"
            className={styles.cart__empty}
          >
            Cart is empty.
          </Text>
        ) : (
          <>
            <ul className={`${styles.cart__items} scrollbar fl--1`}>
              {cart.map((item) => (
                <li
                  key={`${item.id}-${item.optionIndex ?? "default"}`}
                  className={styles.cart__item}
                >
                  <Image
                    priority
                    src={`/img/goods/${item.label}.webp`}
                    width={88}
                    height={88}
                    alt={item.name}
                    className={styles['cart__item-image']}
                  />
                  <div className="fl--1">
                    <Text
                      size="cart-item-title"
                      weight="600"
                      className={styles['cart__item-title']}
                    >
                      {item.name}{item.option ? ` - ${item.option}` : ''}
                    </Text>
                    <Text
                      size="cart-item-price"
                      weight="600"
                      className={styles['cart__item-price']}
                    >
                      {item.quantity} x ${item.price.toFixed(2)}
                    </Text>

                    {item?.optionIndex === 0 || !item.option ? (
                      <div className={styles['cart__item-description-wrapper']}>
                        <Text
                          size="cart-item-description-label"
                          className={styles['cart__item-description-label']}
                        >
                          {item?.optionIndex === 0 ? 'Text' : 'Link'}:
                        </Text>
                        <Text
                          size="cart-item-description"
                          className={styles['cart__item-comment']}
                        >
                          {item.comment}
                        </Text>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cart__bottom}>
              <div className="fl fl--justify-b fl--align-c">
                <Text
                  size="cart-item-price"
                  weight="600"
                >
                  Total
                </Text>
                <Text
                  size="cart-item-price"
                  weight="600"
                >
                  ${totalPrice}
                </Text>
              </div>
              <Button
                onClick={viewCartHandle}
                className={`${styles['cart__view-cart-button']} width--100`}
              >
                View Cart
              </Button>
              <Button
                onClick={checkoutHandle}
                className={`${styles['cart__checkout-button']} width--100`}
              >
                Check Out
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
