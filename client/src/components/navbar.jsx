import React, { Component } from "react";
import { withParamsAndNavigation } from "../utility/routerHelper";
import { Menu } from 'antd';
import { RouteUrl } from '../constants/routeUrls';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.collapsed !== state.collapsed) {
            return { collapsed: props.collapsed };
        }

        return null;
    }

    getItem = (label, key, icon, children, type) => {
        return { key, icon, children, label, type };
    }

    items = [
        this.getItem('Trip', RouteUrl.trip, <MailOutlined />),
        this.getItem('Haul', RouteUrl.haul, <AppstoreOutlined />),
        this.getItem('Pallet', RouteUrl.pallet, <SettingOutlined />),
        this.getItem('Shipment', RouteUrl.shipment, <SettingOutlined />),
        this.getItem('Cold Storage', RouteUrl.coldStorage, <SettingOutlined />)
    ];
    
    onClick = (e) => {
        this.props.navigate(e.key);
    };

    render() {
        const { collapsed } = this.state;

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