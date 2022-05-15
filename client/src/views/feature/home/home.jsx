import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withParamsAndNavigation } from "../../../utility/routerHelper";
import { Menu, Button } from 'antd';
import { Outlet } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { RouteUrl } from '../../../constants/routeUrls';
import './home.css';

/*
    // Nice to have things
    * Move menu component to a new file as a seperate component
*/


class Home extends Component {
    state = {
        collapsed: false
    }

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed })    
    };

    getItem = (label, key, icon, children, type) => {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
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
        const { collapsed } = this.state;

        return (
            <section className="vh-100">
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                    <Button className="" type="primary" onClick={this.toggleCollapsed}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <h5 className="pt-2 font-weight-normal ms-1">Sawtooth PassforChain</h5>
                </div>
                <div className="container-fluid">
                <div className="row body-div">
                    <div className="col-md-1">
                        <Menu
                            onClick={this.onClick}
                            style={{ width: (collapsed ? 80 : 256) }}
                            className="menu-max"
                            mode="inline"
                            inlineCollapsed={collapsed}
                            items={this.items}
                        />
                    </div>
                    <div className="col-md-11">
                        <Outlet/>
                    </div>
                </div>
                </div>
                <div className="footer d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2022. All rights reserved.
                    </div>

                    <div>
                        <a href="#!" className="text-white me-4">
                            <FontAwesomeIcon icon={['fab', 'facebook']} />
                        </a>
                        <a href="#!" className="text-white me-4">
                            <FontAwesomeIcon icon={['fab', 'twitter']} />
                        </a>
                        <a href="#!" className="text-white me-4">
                            <FontAwesomeIcon icon={['fab', 'google']} />
                        </a>
                        <a href="#!" className="text-white">
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                        </a>
                    </div>
                </div>
            </section>
        )
    }
}

export default withParamsAndNavigation(Home);