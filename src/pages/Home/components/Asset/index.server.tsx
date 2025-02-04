import React from 'react';

import Text from '@/common/Text/index.server';
import Link from 'next/link';
import Image from 'next/image';
import { resolveImageSrc } from '@/helpers/images.hl';

// Styles
import styles from './index.module.sass';

interface IProps {
  pageSection: { [key: string]: any };
}

export default function Asset(props: IProps) {
  const {
    pageSection: {
      title = '',
      text = ''
    } = {}
  } = props;

  return (
    <div className={`${styles.asset} relative--core width--100 height--100`}>
      <div className="container">
        <div className={styles.asset__card}>
          <div className={styles.asset__content}>
            <Text
              tag="h2"
              size="huge-s"
              weight="700"
              className={styles.asset__title}
            >
              {title}
            </Text>
            <Text
              size="medium-s"
              className={styles.asset__text}
            >
              {text}
            </Text>
          </div>
          <Image
            src="/img/asset.svg"
            alt="asset abstract"
            width={592}
            height={614}
            className={styles.asset__image}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
