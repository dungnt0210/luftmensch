import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from 'antd';
import './header.scss';

import {
    ShoppingOutlined,
    SearchOutlined,
    UserOutlined,
    HeartOutlined
  } from '@ant-design/icons';

const Header = ({list , isAuthenticated, history, toggleCart, toggleSearch, toggleWishlist, logoutCustomer}) => {
    const [current, setCurrent] = useState('');
    const handleClick = (e) => {
        setCurrent(e.key);
      };
    const handleCustomerClick = (e) => {
        switch (e.key) {
            case 'login':
                history.push("/customer/login");
                break;
            case 'signup':
                history.push("/customer/signup");
                break;
            case 'account':
                history.push("/customer/account");
                break;
            case 'logout':
                logoutCustomer();
                break;
            default:
                console.log("key fail");
          }
    };
    const handleRightClick = (e) => {
        if (e.key === "search") toggleSearch();
        if (e.key === "cart") toggleCart();
        if (e.key === "wishlist") toggleWishlist();
    }
    const linkMainCate = ({key, domEvent}) => {
        history.push(`/main-cate/${key}`);
    }

    return (
        <div className="container">
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="menu">
            <Menu.Item key="home" className="header-logo">
            <Link to={`/`}><img alt="logo" src={`/luftmensch.svg`} /></Link>
            </Menu.Item>
            {list.map(item => 
                (<Menu.SubMenu key={item._id} title={item.name} className="cate-item" 
                onTitleClick={linkMainCate}
                popupClassName="cate-sub-menu">
                    {item.childCate.map(childItem =>
                        (<Menu.Item key={childItem._id}>
                        <Link to={`/category/${childItem._id}`}>{childItem.name}</Link>
                        </Menu.Item>)
                    )}
                </Menu.SubMenu>)
            )}
            <Menu.Item key="journal" className="cate-item">
                <Link to="/journal">Journal</Link>
            </Menu.Item>
        </Menu>
        <Menu onClick={handleRightClick} mode="horizontal" className="menu right-menu">
            <Menu.Item key="search" icon={<SearchOutlined />}/>
            <Menu.Item key="wishlist" icon={<HeartOutlined />}/>
            {isAuthenticated ? 
                (<Menu.SubMenu key="customer-popup-after" onClick={handleCustomerClick} icon={<UserOutlined />} >
                    <Menu.Item key="account">My Account</Menu.Item>
                    <Menu.Item key="logout" >Sign out</Menu.Item>
                </Menu.SubMenu>) :
                (<Menu.SubMenu key="customer-popup-before" onClick={handleCustomerClick} icon={<UserOutlined />} >
                    <Menu.Item key="login">Login</Menu.Item>
                    <Menu.Item key="signup" >Signup</Menu.Item>
                </Menu.SubMenu>)
            }
            <Menu.Item key="cart" icon={<ShoppingOutlined />}/>
        </Menu>
        </div>
    );
 };
 
export default withRouter(Header);
  