'use client';
import React, { useState } from 'react';

// Components
import Text from '@/common/Text/index.server';
import TextAreaComponent from '@/common/TextArea';
import Button from '@/common/Button/index.client';

import { useCartStore } from '@/hooks/useCartStore';
import { IGood } from '@/types/good.types';

// Styles
import styles from './index.module.sass';
import { toast } from 'react-toastify';

interface IProps {
  good: IGood;
}

const MAX_COUNT = 1000000;

const ProductOptions = (props: IProps) => {
  const {
    good: {
      id = '',
      label = '',
      price = 50,
      name = '',
      description = '',
      content: {
        whiteGoodLabel = '',
        options = [],
        textareaLabel = '',
        textareaFootNote = '',
        counterLabel = ''
      } = {}
    } = {}
  } = props;

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [comment, setComment] = useState('');

  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    if (count < MAX_COUNT) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const addItemToCart = () => {
    useCartStore.getState().addToCart({
      id,
      name,
      description,
      ...(options.length > 0 ? { optionIndex: selectedOptionIndex } : {}),
      option: options?.[selectedOptionIndex]?.short || '',
      comment: (options.length > 0 && selectedOptionIndex === 0) || !options.length ? comment : '',
      price: options.length > 0 ? options?.[selectedOptionIndex]?.price : price,
      quantity: options.length > 0 && selectedOptionIndex === 0 ? 1 : count,
      label,
      actualLabel: whiteGoodLabel
    });

    toast("The product has been added to the cart");
  };

  return (
    <div className={styles.options}>
      {options && options.length > 0 ? (
        <div className={styles.options__options}>
          {options.map((option: any, index: number) => {
            const { name, description, price } = option;

            return (
              <div
                key={index}
                className={`${styles.options__option} ${selectedOptionIndex === index ? styles['options__option--active'] : 'cursor--pointer'}`}
                onClick={() => setSelectedOptionIndex(index)}
              >
                <div className={styles['options__option-content']}>
                  <Text size="product-name" weight="600">
                    {name}
                  </Text>
                  <Text size="product-description">
                    *{description}
                  </Text>
                </div>
                <Text size="product-price" weight="700">
                  ${price.toFixed(2)}
                </Text>
              </div>
            )
          })}
        </div>
      ) : null}

      {selectedOptionIndex === 0 ? (
        <>
          <TextAreaComponent
            label={`${textareaLabel}:`}
            name="message"
            value={comment}
            onChange={(_, value) => setComment(value)}
            classNames={{
              wrapper: `${styles.options__textarea} fl--1`,
              field: styles['options__textarea-field']
            }}
          />

          <Text
            size="tiny"
            className={styles['options__textarea-footnote']}
          >
            *{textareaFootNote}
          </Text>
        </>
      ) : (
        <>
          <Text
            size="menu-name"
            weight="700"
            className={styles['options__counter-label']}
          >
            {counterLabel}
          </Text>
          <div className={styles.options__counter}>
            <span
              className={`${styles['options__counter-btn']} ${styles['options__counter-btn--left']} ${count <= 1 ? 'opacity--06' : 'cursor--pointer'}`}
              onClick={handleDecrement}
            >-</span>
            <span className="text--menu-name color--black font--700 turn--center padding--h-8 fl--1">
              {count}
            </span>
            <span
              className={`${styles['options__counter-btn']} ${styles['options__counter-btn--right']} ${count >= MAX_COUNT ? 'opacity--06' : 'cursor--pointer'}`}
              onClick={handleIncrement}
            >+</span>
          </div>
        </>
      )}

      <Button
        disabled={options && options.length > 0 ? selectedOptionIndex === 0 ? !comment : false : !comment}
        className={`${styles.options__button} width--100`}
        onClick={addItemToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductOptions;
