import React from 'react';
import styles from './index.module.sass';

interface IProps {
  children: React.ReactNode;
}

export default function LightsBackground(props: IProps) {
  const {
    children
  } = props;

  return (
    <>
      <div className={`${styles.lights__wrapper} absolute--core width--100 height--100 overflow--hidden`}>
        <div className={`${styles.lights__group} ${styles['lights__group--1']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--1']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--2']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--2']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--3']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--4']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--3']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--5']} background--purple`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--4']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--6']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--7']} background--red`} />
          <div className={`${styles.lights__light} ${styles['lights__light--8']} background--light-blue`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--5']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--9']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--10']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--6']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--11']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--12']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--7']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--13']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--14']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--8']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--15']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--16']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--9']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--17']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--18']} background--red`} />
        </div>

        <div className={`${styles.lights__group} ${styles['lights__group--10']}`}>
          <div className={`${styles.lights__light} ${styles['lights__light--19']} background--purple`} />
          <div className={`${styles.lights__light} ${styles['lights__light--20']} background--red`} />
        </div>
      </div>

      <main className="relative--core z--5 width--100 height--100">
        {children}
      </main>
    </>
  );
}
