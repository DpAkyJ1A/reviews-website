import React from 'react';

import { colorTextPart } from '@/helpers/colorTextPart.hl';
import Text from '@/common/Text/index.server';
import Link from 'next/link';

// Styles
import styles from './index.module.sass';

interface IProps {
  title: string;
  pageSection: { [key: string]: any };
}

export default function Scene(props: IProps) {
  const {
    title,
    pageSection: {
      steps = [] as string[],
      button: {
        label: buttonLabel = '',
        url: buttonUrl = ''
      } = {}
    } = {}
  } = props;

  return (
    <div className={`${styles.scene} relative--core width--100 height--100`}>
      <div className="container">
        <Text
          tag="h1"
          size="huge"
          weight="700"
          className="turn--center"
        >
          {colorTextPart({ text: title, isBreak: true })}
        </Text>
        <div className={`${styles.scene__steps} width--fit-content margin--center`}>
          {steps.map((step: string, index: number) => (
            <React.Fragment key={step}>
              <div className={styles['scene__steps-item']}>
                <Text
                  size="index"
                  weight="500"
                  className={styles['scene__steps-item-index']}
                >
                  {index + 1}
                </Text>
                <Text
                  size="step"
                  weight="600"
                  className={styles['scene__steps-item-text']}
                >
                  {step.split('|').length > 1 ? (
                    <>
                      {step.split('|').map((item: string, i: number) => (
                        <React.Fragment key={`${step} piece - ${i}`}>
                          {item}
                          {i < step.split('|').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <>{step}</>
                  )}
                </Text>
              </div>
              {index < steps.length - 1 && <div className={styles['scene__steps-divider']} />}
            </React.Fragment>
          ))}
        </div>
        <Link
          href={buttonUrl}
          className={`${styles.scene__button} link--primary font--500 text--scene-button margin--center`}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
