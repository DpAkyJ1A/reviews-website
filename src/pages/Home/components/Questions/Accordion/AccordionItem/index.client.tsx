"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Components
import Text from '@/common/Text/index.server';
import Icon from '@/common/Icon/index.client';

// Styles
import styles from '../index.module.sass';

interface IAccordionItemProps {
    question: string;
    answer: string;
}

const AccordionItem = ({ question, answer }: IAccordionItemProps) => {
    const [height, setHeight] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleAccordion = () => {
        const contentHeight = contentRef.current?.clientHeight || 0;
        setHeight(isActive ? 0 : contentHeight);
        setIsActive(!isActive);
    };

    return (
        <li
            onClick={toggleAccordion}
            className={`${styles.accordion__card} ${isActive ? styles['accordion__card--active'] : ''} cursor--pointer`}
        >
            <div className={`${styles.accordion__heading} ${isActive ? 'margin--b-14' : ''}`}>
                <Text
                    size="faq"
                    tag="h4"
                    weight="500"
                    className={styles['accordion__element-title']}
                >
                    {question}
                </Text>
                <Icon
                    size={60}
                    icon={`linear/${isActive ? 'minus' : 'plus'}`}
                    classNames={{
                        icon: `${styles['accordion__icon']} stroke--white`
                    }}
                />
            </div>
            <div className={styles['accordion__card-subcontent']} style={{ height: `${height}px` }}>
                <div ref={contentRef}>
                    <Text
                        size="ans"
                        className={`${styles['accordion__card-content']} ${isActive ? styles['accordion__card-content--active'] : ''}`}
                    >
                        {answer}
                    </Text>
                </div>
            </div>
        </li>
    );
};

export default AccordionItem;
