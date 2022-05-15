import React, { Component } from "react";
import { withParamsAndNavigation } from "../utility/routerHelper";
import { Menu } from 'antd';
import { RouteUrl } from '../constants/routeUrls';
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

class NavBar extends Component {
    state = {
        collapsed: false
    }

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })    
    };

    getItem = (label, key, icon, children, type) => {
        return { key, icon, children, label, type };
    }

    items = [
        this.getItem('Trip', 'sub1', <MailOutlined />),
        this.getItem('Haul', 'sub2', <AppstoreOutlined />),
        this.getItem('Pallet', 'sub3', <SettingOutlined />),
        this.getItem('Product', 'sub4', <SettingOutlined />)
    ];
    
    onClick = (e) => {
        console.log('click ', e);
        this.props.navigate(RouteUrl.trip);
    };

    render() {
        return (
            <Menu
                onClick={this.onClick}
                style={{ width: (collapsed ? 80 : 256) }}
                className="menu-max"
                mode="inline"
                inlineCollapsed={collapsed}
                items={this.items}
            />
        )
    }
}

export default withParamsAndNavigation(NavBar);