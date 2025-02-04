import React from 'react';

import Text from '@/common/Text/index.server';
import Image from 'next/image';
import { colorTextPart } from '@/helpers/colorTextPart.hl';

// Styles
import styles from './index.module.sass';
import Accordion from './Accordion/index.server';

interface IProps {
  pageSection: { [key: string]: any };
}

export default function Questions(props: IProps) {
  const {
    pageSection: {
      title = '',
      faq
    } = {}
  } = props;

  return (
    <div className={`${styles.questions} relative--core width--100 height--100`}>
      <div className="container">
        <Text
          tag="h2"
          size="huge"
          weight="700"
          className={styles.questions__title}
        >
          {title}
        </Text>
        <Accordion items={faq} />
      </div>
    </div>
  );
}
