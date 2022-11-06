import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from "react-hook-form";
import authService from '../../../../services/feature/auth/auth.service';
import Footer from "../../../../components/footer";
import toast from 'react-hot-toast';
import * as yup from "yup";
import './login.css';

const schema = yup.object({
    email: yup.string().required('Email is required').email("Not a valid email"),
    password: yup.string().required('Password is required').min(5, 'Password must me more than 5 charcaters'),
    rememberMe: yup.boolean().default(true)
}).required();

export default function Login() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const { dirtyFields } = useFormState({
        control
    });

    const login = async (data) => {
        const { email, password } = data;

        try {
            await authService.signIn(email, password);
        } catch(e) {
            toast.error(e.data.message);
        }
    }

    return (
        <section>
            <div className="container-fluid vh-100">
                <div className="ninenty row justify-content-center align-items-center">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/draw2.webp" className="img-fluid" alt="Login here"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form className="mx-1 mx-md-4" noValidate>
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
                                <p className="text-center fw-bold mb-0">OR</p>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address</label>
                                <input
                                    autoFocus
                                    type="email"
                                    id="email"
                                    className={classNames("form-control", {'is-invalid': errors?.email, 'is-valid': dirtyFields.email && !errors['email']})}
                                    placeholder="Enter a valid email address"
                                    {...register("email")}
                                />
                                <div className={classNames("text-danger", "hidden", {'show': errors?.email})} >
                                    {errors?.email?.message}
                                </div>
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={classNames("form-control", {'is-invalid': errors?.password, 'is-valid': dirtyFields.password && !errors['password']})}
                                    placeholder="Enter password"
                                    {...register("password")}
                                />
                                <div className={classNames("text-danger", "hidden", {'show': errors?.password})} >
                                    {errors?.password?.message}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input 
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        checked={true}
                                        id="rememberMe"
                                        {...register("agreeTerms")}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button onClick={handleSubmit(login)} type="button" className="btn btn-primary btn-lg"
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
            <Footer />
        </section>
    )
}
