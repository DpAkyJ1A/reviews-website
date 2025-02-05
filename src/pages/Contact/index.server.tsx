import { IPage } from '@/types/page.types';

import Text from '@/common/Text/index.server';
import Form from './components/Form/index.client';
import Image from 'next/image';

// Styles
import styles from './index.module.sass';

interface IProps {
  page: IPage;
}

export default function Contact(props: IProps) {
  const {
    page: {
      title = '',
      content: {
        text,
        caption,
        buttonText
      } = {}
    } = {}
  } = props;

  return (
    <section className={`${styles.contact} relative--core width--100 height--100`}>
      <div className={`${styles.contact__container} container`}>
        <div className={styles.contact__content}>
          <Text
            tag="h1"
            size="huge"
            weight="700"
            className={styles.contact__title}
          >
            {title}
          </Text>
          <Text
            size="contact-text"
            className={styles.contact__text}
          >
            {text}
          </Text>
          <Text size="contact-text">
            {caption}
          </Text>
          <Form
            buttonText={buttonText}
          />
        </div>
        <div className={styles.contact__image}>
          <Image
            src="/img/book.svg"
            alt="Complaint book"
            fill
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
