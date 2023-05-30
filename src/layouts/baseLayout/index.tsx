import { Outlet } from 'umi';
import { Breadcrumb, Layout, Typography } from 'antd';
import styles from './index.less';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;


export default (props: any) => {
  return (
    <Layout>
      <Header className={styles.navs}>
        <Title className={styles.logo}>Resufitter</Title>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
}
