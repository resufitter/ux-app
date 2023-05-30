import styles from './index.less';
import BaseLayout from './baseLayout';



export default function App(props: any) {
  return <BaseLayout>{props.children}</BaseLayout>;
}
