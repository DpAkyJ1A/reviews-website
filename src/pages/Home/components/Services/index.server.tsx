import React from 'react';

import Text from '@/common/Text/index.server';
import Link from 'next/link';
import Image from 'next/image';
import { getGoods } from '@/actions/good';
import { resolveImageSrc } from '@/helpers/images.hl';
import { IGood } from '@/types/good.types';

// Styles
import styles from './index.module.sass';

interface IProps {
  pageSection: { [key: string]: any };
}

export default async function Services(props: IProps) {
  const {
    pageSection: {
      title = '',
      goodButtonText = ''
    } = {}
  } = props;

  const goods = await getGoods('gray');
  const sortedGoods = goods.sort((a: IGood, b: IGood) => a.order - b.order);

  return (
    <div className={`${styles.services} relative--core width--100 height--100`}>
      <div className="container">
        <Text
          tag="h2"
          size="huge"
          weight="700"
          className="turn--center"
        >
          {title}
        </Text>
        <div className={`${styles.services__goods} width--100`}>
          {sortedGoods.map((good, index) => {
            const {
              id = '',
              label = ''
            } = good;

            return (
              <div key={good.id} className={styles['services__goods-item']}>
                <div className={styles['services__goods-item-wrapper']}>
                  <div>
                    <Text
                      size="medium"
                      weight="700"
                    >
                      {good.name}
                    </Text>
                    <Text
                      size="good-description"
                      className={styles['services__goods-item-description']}
                    >
                      {good.description}
                    </Text>
                  </div>
                  <div className={styles['services__goods-item-image-wrapper']}>
                    <Image
                      priority
                      // src={resolveImageSrc({ internal: good.url })}
                      src={`/img/goods/${label}.webp`}
                      alt={good.name}
                      // width={good.width / 3}
                      // height={good.height / 3}
                      width={300}
                      height={300}
                      className={styles['services__goods-item-image']}
                    />
                  </div>
                  <div className={`${styles['services__goods-item-bottom']} fl fl--justify-c fl--align-c fl--gap-20 fl--wrap`}>
                    <Text
                      size="medium"
                      weight="700"
                    >
                      ${good.price.toFixed(2)}
                    </Text>
                    <Link
                      href={`/product/${label}`}
                      className={`${styles['services__goods-item-button']} link--primary font--700 text--buy`}
                    >
                      {goodButtonText}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
