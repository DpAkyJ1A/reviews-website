import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  classNames?: {
    section?: string;
    container?: string;
    content?: string;
  };
  id?: string;
}

export default function Section(props: IProps) {
  const {
    children,
    classNames: {
      section = '',
      container = '',
      content = ''
    } = {},
    id
  } = props;

  return (
    <section
      {...id && { id }}
      className={section}
    >
      <div className={`${container} container`}>
        <div className={content}>
          {children}
        </div>
      </div>
    </section>
  );
}
