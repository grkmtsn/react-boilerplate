import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { authenticationService } from '@/services';

import Logo from '@/assets/img/Logo.png';
import LogoSmall from '@/assets/img/LogoSmall.png';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class PageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: '/dashboard',
      currentUser: null,
      collapsed: false,
    };

    props.history.listen(location => {
      this.setState({
        currentPath: location.pathname,
      });
    });
  }

  componentDidMount() {
    const { history } = this.props;
    const { pathname } = history.location;
    this.setState({
      currentPath: pathname,
    });
    authenticationService.currentUser.subscribe(x =>
      this.setState({
        currentUser: x,
      }),
    );
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  logout = () => {
    const { history } = this.props;
    authenticationService.logout();
    history.push('/login');
  };

  render() {
    const { collapsed, currentPath, currentUser } = this.state;
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Link to="/dashboard">
            <img src={collapsed ? LogoSmall : Logo} alt="React Boilerplate" />
          </Link>
          <Menu theme="dark" selectedKeys={[currentPath]} mode="inline">
            <Menu.Item key="/dashboard">
              <Link to="/dashboard">
                <Icon type="pie-chart" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Examples</span>
                </span>
              }
            >
              <Menu.Item title="Example List" key="/samplelist">
                <Link to="/samplelist">Example List</Link>
              </Menu.Item>
              <Menu.Item title="Example Form" key="4">
                <Link to="/sampleform">Example Form</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5" onClick={this.logout}>
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '0 16px' }}>
            Welcome, {currentUser && currentUser.username}
          </Header>
          <Content style={{ margin: '16px' }}>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

const PageLayoutWithRouter = withRouter(PageLayout);

export { PageLayoutWithRouter };
