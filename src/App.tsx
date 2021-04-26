import React from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import { Link, Route, withRouter } from 'react-router-dom';
import ProfileConteiner from './components/Profile/ProfileConteiner'
import Page from './Page/Page'
import DialogesConteiner from './components/Dialog/DialogConteiner';
import UsersConteiner from './components/Users/UsersConteiner'
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initialazedApp } from './redux/app-reduser';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { AppReduser } from './redux/redux-store';
import { Layout, Menu, Breadcrumb } from 'antd';
import "antd/dist/antd.css";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Navbar from './components/Navbar/Navbar';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

type DispatchPropsType = {
  initialazedApp: () => void
}

type MapPropsType = {
  initialized: boolean
}
type PropsType = DispatchPropsType & MapPropsType

class App extends React.Component<PropsType> {

  componentDidMount() {
    this.props.initialazedApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout>
        <Navbar/>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                <Menu.Item key="1"> <Link to='/profile'>ProfilePage</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/dialog'>Dialog</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                <Menu.Item key="5"><Link to='/users'>Users</Link></Menu.Item>
                <Menu.Item key="6"><Link to='/page'>Page</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route path='/profile/:userId?' render={() => <ProfileConteiner />} />
              <Route path='/dialog' render={() => <DialogesConteiner />} />
              <Route path='/page' render={() => <Page />} />
              <Route path='/users' render={() => <UsersConteiner />} />
              <Route path='/login' render={() => <Login />} />
            </Content>
          </Layout>
        </Layout>
      </Layout>












    );
  }
}

const mapStateToProps = (state: AppReduser): MapPropsType => ({
  initialized: state.app.initialized
})


export default compose(withRouter,
  connect(mapStateToProps, { initialazedApp }))(App);

//   <div className='container'>
  //     <NavbarContainer />
  //     <Sidebar />
  //     <Route path='/profile/:userId?' render={() => <ProfileConteiner />} />
  //     <Route path='/dialog' render={() => <DialogesConteiner />} />
  //     <Route path='/page' render={() => <Page />} />
  //     <Route path='/users' render={() => <UsersConteiner />} />
  //     <Route path='/login' render={() => <Login />} />
  //   </div>