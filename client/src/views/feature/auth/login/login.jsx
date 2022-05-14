import React, {Component} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import authService from '../../../../services/core/auth/auth.service';

export default class Login extends Component {
    state = {
        loginForm: {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        // Component life cycle hooks
    }

    login = async () => {
        // Validate the login form

        const { email, password } = this.state.loginForm;
        await authService.signIn(email, password);
    }

    handleFormChange = ({ currentTarget: input }) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [input.name]: input.value
            }
        });
    }

    render() {
        const { loginForm } = this.state;

        return (
            <section className="vh-100">
                <div className="container-fluid h-custom" style={{ height: '94.4%' }}>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="/draw2.webp"
                                 className="img-fluid" alt="Login here"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <FontAwesomeIcon icon={['fab', 'facebook']} />
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                                    </button>

                                    <button type="button" className="btn btn-primary btn-floating mx-1">
                                        <FontAwesomeIcon icon={['fab', 'linkedin']} />
                                    </button>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        autoFocus
                                        value={loginForm.email}
                                        onChange={this.handleFormChange}
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"/>
                                    <label className="form-label" htmlFor="email">Email address</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        value={loginForm.password}
                                        onChange={this.handleFormChange}
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"/>
                                    <label className="form-label" htmlFor="password">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value=""
                                               id="form2Example3"/>
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button onClick={this.login} type="button" className="btn btn-primary btn-lg"
                                            style={{ paddingLeft: '2.5rem',paddingRight: '2.5rem' }}>Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?
                                        <Link to="/auth/signup" className="link-danger">Register</Link>
                                    </p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
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
