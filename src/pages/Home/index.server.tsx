import { IPage } from '@/types/page.types';

import Scene from './components/Scene/index.server';
import Services from './components/Services/index.server';
import Asset from './components/Asset/index.server';
import Advantages from './components/Advantages/index.server';
import Help from './components/Help/index.server';
import Enjoy from './components/Enjoy/index.server';

// Styles
import styles from './index.module.sass';
import Questions from './components/Questions/index.server';

interface IProps {
  page: IPage;
}

export default function Home(props: IProps) {
  const {
    page: {
      title = '',
      content: {
        scene,
        services,
        asset,
        advantages,
        help,
        enjoy,
        questions
      } = {}
    } = {}
  } = props;

  return (
    <div className={`${styles.home} relative--core width--100 height--100`}>
      <Scene
        title={title}
        pageSection={scene}
      />
      <Services pageSection={services} />
      <Asset pageSection={asset} />
      <Advantages pageSection={advantages} />
      <Help pageSection={help} />
      <Enjoy pageSection={enjoy} />
      <Questions pageSection={questions} />
    </div>
  );
}
