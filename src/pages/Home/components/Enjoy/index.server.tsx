import React from 'react';

import Text from '@/common/Text/index.server';
import Image from 'next/image';
import { colorTextPart } from '@/helpers/colorTextPart.hl';

// Styles
import styles from './index.module.sass';

interface IProps {
  pageSection: { [key: string]: any };
}

export default function Enjoy(props: IProps) {
  const {
    pageSection: {
      title = ''
    } = {}
  } = props;

  return (
    <div className={`${styles.enjoy} relative--core width--100 height--100`}>
      <div className="container">
        <div className={styles.enjoy__content}>
          <Text
            tag="h2"
            size="big-l"
            weight="700"
            className={styles.enjoy__title}
          >
            {colorTextPart({ text: title })}
          </Text>
          <div className={styles.enjoy__image}>
            <Image
              src="/img/enjoy.svg"
              alt={title}
              fill
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
