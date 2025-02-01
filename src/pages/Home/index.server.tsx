import { IPage } from '@/types/page.types';

import { colorTextPart } from '@/helpers/colorTextPart.hl';
import Text from '@/common/Text/index.server';

// Styles
import styles from './index.module.sass';

interface IProps {
  page: IPage;
}

export default function Home(props: IProps) {
  const { page } = props;

  return (
    <div className={`${styles.home} relative--core width--100 height--100`}>
      {/* <Text size='huge'>
        {colorTextPart(page.title)}
      </Text> */}
    </div>
  );
}