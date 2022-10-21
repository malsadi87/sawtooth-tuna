import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withParamsAndNavigation } from "../../../utility/routerHelper";
import NavBar from "../../../components/navbar";
import { Button } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { RouteUrl } from "../../../constants/routeUrls";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './home.css';

class Home extends Component {
    state = {
        collapsed: false
    }

    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    render() {
        const { collapsed } = this.state;

        return (
            <section className="vh-100">
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom shadow-sm">
                    <Button className="" type="primary" onClick={this.toggleCollapsed}>
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                    <h5 className="pt-2 font-weight-normal ms-2">
                        <Link className="text-dark text-decoration-none" to={RouteUrl.home}>Sawtooth PassforChain</Link>
                    </h5>
                </div>
                <div className="container-fluid body-div">
                    <div className="row body-div">
                        <div className="col-md-2">
                            <NavBar collapsed={collapsed} />
                        </div>
                        <div className="col-md-10">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <div className="footer d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary" style={{visibility: 'hidden'}}>
                    <div className="text-white mb-3 mb-md-0">
                        TODO: This element is hidden untill we fix the footer being badly alligned.
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