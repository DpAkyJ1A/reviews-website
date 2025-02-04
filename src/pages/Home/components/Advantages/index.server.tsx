import React from 'react';

import Text from '@/common/Text/index.server';
import Image from 'next/image';
import { colorTextPart } from '@/helpers/colorTextPart.hl';

// Styles
import styles from './index.module.sass';

interface IProps {
  pageSection: { [key: string]: any };
}

export default function Advantages(props: IProps) {
  const {
    pageSection: {
      title = '',
      cards = []
    } = {}
  } = props;

  return (
    <div className={`${styles.advantages} relative--core width--100 height--100`}>
      <div className="container">
        <Text
          tag="h2"
          size="huge"
          weight="700"
          className={styles.advantages__title}
        >
          {colorTextPart({ text: title })}
        </Text>
        <div className={styles.advantages__cards}>
          {cards.map((card: any, i: number) => (
            <div key={card.title} className={styles.advantages__card}>
              <div className={styles['advantages__card-wrapper']}>
                <div>
                  <Text
                    size="big"
                    weight="700"
                  >
                    {card.title}
                  </Text>
                  <Text
                    size="card-text"
                    className={styles['advantages__card-text']}
                  >
                    {card.text}
                  </Text>
                </div>
                <div className={`${styles['advantages__card-image-wrapper']} ${styles[`advantages__card-image-wrapper--${i+1}`]}`}>
                  <Image
                    src={`/img/advantages-${i + 1}.svg`}
                    alt={card.title}
                    fill
                    unoptimized
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
