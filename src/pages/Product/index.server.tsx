import { IGood } from '@/types/good.types';

import Text from '@/common/Text/index.server';
import Image from 'next/image';

// Styles
import styles from './index.module.sass';
import { colorTextPart } from '@/helpers/colorTextPart.hl';
import ProductOptions from './components/ProductOptions/index.client';

interface IProps {
  good: IGood;
}

export default function Product(props: IProps) {
  const {
    good,
    good: {
      label,
      name = '',
      content: {
        pageTitle = '',
        pageSubtitle = ''
      } = {}
    } = {}
  } = props;

  return (
    <section className={`${styles.product} relative--core width--100 height--100`}>
      <div className={`${styles.product__container} container`}>
        <Text
          tag="h1"
          size="huge"
          weight="700"
          className={styles.product__title}
        >
          {colorTextPart({ text: `[${pageTitle}]` })}
        </Text>
        <div className={styles.product__wrapper}>
          <div className={styles.product__content}>
            <Text
              tag="h2"
              size="huge"
              weight="700"
              className={styles.product__text}
            >
              {pageSubtitle}
            </Text>
            <ProductOptions good={good} />
          </div>
          <Image
            priority
            src={`/img/goods/${label}.webp`}
            width={900}
            height={900}
            alt={name}
            className={styles.product__image}
          />
        </div>
      </div>
    </section>
  );
}
