import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reduser';
const { Header } = Layout;


const Navbar: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)
    const dispatch = useDispatch()
    const logoutCallback = () => {
        dispatch(logout())
    }
    return (

        <Header className="header">
            <div className='logo' />
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">React Developer</Menu.Item>
                    </Menu>
                </Col>

                {isAuth
                    ? <> <Col span={1}>
                        <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Col>
                        <Col span={5}>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>}
            </Row>

        </Header>



    )
}

export default Navbar;

{/* <div className={s.Navbar}>
<img src='data:image/png;base64,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' />
<div className={s.loginUser}>{props.isAuth
    ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div>
    : <NavLink to='/login'>Login</NavLink>}
</div>
</div> */}