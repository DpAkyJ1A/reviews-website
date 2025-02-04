import React from 'react';

// Components
import AccordionItem from './AccordionItem/index.client';

// Styles
import styles from './index.module.sass';

interface IAccordionProps {
    items: {
        question: string;
        answer: string;
    }[]
}

const Accordion = ({ items }: IAccordionProps) => {
    const middleIndex = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, middleIndex);
    const rightItems = items.slice(middleIndex);

    return (
        <div className={styles.accordion}>
            <ul className={styles.accordion__left}>
                {leftItems.map((item, idx) => (
                    <AccordionItem key={idx} {...item} />
                ))}
            </ul>
            <div className={styles.accordion__separator} />
            <ul className={styles.accordion__right}>
                {rightItems.map((item, idx) => (
                    <AccordionItem key={middleIndex + idx} {...item} />
                ))}
            </ul>
        </div>
    );
};

export default Accordion;
