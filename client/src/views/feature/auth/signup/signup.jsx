import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authService from "../../../../services/core/auth/auth.service";
import { withParamsAndNavigation } from "../../../../utility/routerHelper";
import { RouteUrl } from "../../../../constants/routeUrls";
import './signup.css';

class Signup extends Component {
    state = {
        signUpForm: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false
        }
    }

    handleFormChange = ({ currentTarget: input }) => {
        this.setState({
            signUpForm: {
                ...this.state.signUpForm,
                [input.name]: input.value
            }
        });
    }

    signUp = async () => {
        // Implement form validation if necessary
        const { fullName, email, password, confirmPassword, agreeTerms } = this.state.signUpForm;

        if (password != confirmPassword || !agreeTerms) {
            alert('Invalid input');
            return;
        }
        
        await authService.signUp(fullName, email, password);
        this.props.navigate(RouteUrl.login);
    }

    render() {
        const { signUpForm } = this.state;

        return (
            <section className="vh-100" style={{ backgroundColor: '#ffffff'}}>
                <div style={{ height: '94.4%' }} className="container">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="row justify-content-center">
                                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                    <form className="mx-1 mx-md-4">

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <FontAwesomeIcon icon={["fas", "user"]} className="fa-lg me-3 fa-fw mb-8" />
                                            <div className="form-outline flex-fill mb-0">
                                                <input
                                                    autoFocus
                                                    value={signUpForm.fullName}
                                                    onChange={this.handleFormChange}
                                                    type="text"
                                                    id="fullName"
                                                    name="fullName"
                                                    className="form-control"
                                                />
                                                <label className="form-label" htmlFor="form3Example1c">Your
                                                    Name</label>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <FontAwesomeIcon icon={["fas", "envelope"]} className="fa-lg me-3 fa-fw mb-8" />
                                            <div className="form-outline flex-fill mb-0">
                                                <input
                                                    value={signUpForm.email}
                                                    onChange={this.handleFormChange}
                                                    type="email" 
                                                    id="email"
                                                    name="email"
                                                    className="form-control"
                                                />
                                                <label className="form-label" htmlFor="form3Example3c">Your
                                                    Email</label>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <FontAwesomeIcon icon={["fas", "lock"]} className="fa-lg me-3 fa-fw mb-8" />
                                            <div className="form-outline flex-fill mb-0">
                                                <input
                                                    value={signUpForm.password}
                                                    onChange={this.handleFormChange}
                                                    type="password" 
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                />
                                                <label className="form-label"
                                                       htmlFor="form3Example4c">Password</label>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <FontAwesomeIcon icon={["fas", "key"]} className="fa-lg me-3 fa-fw mb-8" />
                                            <div className="form-outline flex-fill mb-0">
                                                <input
                                                    value={signUpForm.confirmPassword}
                                                    onChange={this.handleFormChange}
                                                    type="password" 
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    className="form-control"
                                                />
                                                <label className="form-label" htmlFor="form3Example4cd">Repeat
                                                    your password</label>
                                            </div>
                                        </div>

                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input
                                                className="form-check-input me-2"
                                                type="checkbox"
                                                value={signUpForm.agreeTerms}
                                                onChange={this.handleFormChange}
                                                id="agreeTerms"
                                                name="agreeTerms"
                                            />
                                            <label className="form-check-label" htmlFor="form2Example3">
                                                I agree all statements in <a href="#!">Terms of service</a>
                                            </label>
                                        </div>

                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button onClick={this.signUp} type="button" className="btn btn-primary btn-lg">Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div
                                    className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img
                                        src="/draw1.webp"
                                        className="img-fluid" alt="SignUp here"/>
                                </div>
                            </div>
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

export default withParamsAndNavigation(Signup);