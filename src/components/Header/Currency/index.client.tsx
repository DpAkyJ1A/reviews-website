'use client';

import { useEffect, useState } from "react";

import styles from './index.module.sass';
import Text from "@/common/Text/index.server";
import { useCurrencyStore } from "@/hooks/useCurrencyRates";
import { CURRENCIES } from "@/hooks/useCurrencyRates";

export default function Currency() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, fetchExchangeRates, convert, setCurrency, exchangeRates } = useCurrencyStore();

  useEffect(() => {
    console.log('exchangeRates', exchangeRates)
  }, [exchangeRates])

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <div className={styles.currency}>
      <Text size="small" onClick={() => setIsOpen((prev) => !prev)} className="cursor--pointer">
        {currency.symbol} - {currency.code}
      </Text>
      <Text size="tiny">
        50 usd = {convert(50).toFixed(2)} {currency.symbol}
      </Text>
      <div className={`${styles.currency__content} ${isOpen ? styles['currency__content--open'] : ''}`}>
        {CURRENCIES.map((item) => (
          <Text
            key={item.code}
            size="small"
            onClick={() => {
              setCurrency(item);
              setIsOpen(false);
            }}
            className="cursor--pointer"
          >
            {item.symbol} - {item.code}
          </Text>
        ))}
      </div>
    </div>
  );
}
