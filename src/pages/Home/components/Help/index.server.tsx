import React from 'react';

import Text from '@/common/Text/index.server';
import Image from 'next/image';
import { colorTextPart } from '@/helpers/colorTextPart.hl';

// Styles
import styles from './index.module.sass';

interface IProps {
  pageSection: { [key: string]: any };
}

export default function Help(props: IProps) {
  const {
    pageSection: {
      title = ''
    } = {}
  } = props;

  return (
    <div className={`${styles.help} relative--core width--100 height--100`}>
      <div className="container">
        <div className={styles.help__content}>
          <Text
            tag="h2"
            size="big-l"
            weight="700"
            className={styles.help__title}
          >
            {colorTextPart({ text: title })}
          </Text>
          <div className={styles.help__image}>
            <Image
              src="/img/help.svg"
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
