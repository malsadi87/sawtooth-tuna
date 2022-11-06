import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from "react-hook-form";
import authService from "../../../../services/feature/auth/auth.service";
import { withParamsAndNavigation } from "../../../../utility/routerHelper";
import { RouteUrl } from "../../../../constants/routeUrls";
import Footer from "../../../../components/footer";
import * as yup from "yup";
import './signup.css';

const schema = yup.object({
    fullName: yup.string().required('Full name is required').min(5, "Name must be more than 5 characters long").max(2000, "Full name could be maximum 2000 characters").min(5, "Full Name has to be minimum 5 characters"),
    email: yup.string().required('Email is required').email("Not a valid email"),
    password: yup.string().required('Password is required').min(5, 'Password must me more than 5 charcaters').max(16, 'Password must me less than 16 charcaters'),
    confirmPassword: yup.string().required('Confirm password is required').min(5, 'Confirm password must me more than 5 charcaters').max(16, 'Cofirm Password must me less than 16 charcaters').oneOf([yup.ref('password'), null], 'Password doesn\'t match'),
    agreeTerms: yup.boolean().default(true)
}).required();

function Signup() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const { dirtyFields } = useFormState({
        control
    });

    const signUp = async (data) => {
        console.log(data);
        const { fullName, email, password } = data;
        
        await authService.signUp(fullName, email, password);
        this.props.navigate(RouteUrl.login);
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#ffffff'}}>
            <div className="container vh-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <form className="mx-1 mx-md-4" noValidate>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FontAwesomeIcon icon={["fas", "user"]} className="fa-lg me-3 fa-fw pt-4" />
                                        <div className="form-outline flex-fill">
                                            <label className="form-label" htmlFor="fullName">Full Name</label>
                                            <input
                                                required
                                                autoFocus
                                                type="text"
                                                id="fullName"
                                                placeholder="Enter your full name"
                                                className={classNames("form-control", {'is-invalid': errors?.fullName, 'is-valid': dirtyFields.fullName && !errors['fullName']})}
                                                {...register("fullName")}
                                            />
                                            <div className={classNames("text-danger", "hidden", {'show': errors?.fullName})} >
                                                {errors?.fullName?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FontAwesomeIcon icon={["fas", "envelope"]} className="fa-lg me-3 fa-fw pt-4" />
                                        <div className="form-outline flex-fill">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Enter a valid email address"
                                                className={classNames("form-control", {'is-invalid': errors?.email, 'is-valid': dirtyFields.email && !errors['email']})}
                                                {...register("email")}
                                            />
                                            <div className={classNames("text-danger", "hidden", {show: errors?.email})} >
                                                {errors?.email?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FontAwesomeIcon icon={["fas", "lock"]} className="fa-lg me-3 fa-fw pt-4" />
                                        <div className="form-outline flex-fill">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                placeholder="Enter a suitable password"
                                                className={classNames("form-control", {'is-invalid': errors?.password, 'is-valid': dirtyFields.password && !errors['password']})}
                                                {...register("password")}
                                            />
                                            <div className={classNames("text-danger", "hidden", {show: errors?.password})} >
                                                {errors?.password?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FontAwesomeIcon icon={["fas", "key"]} className="fa-lg me-3 fa-fw pt-4" />
                                        <div className="form-outline flex-fill">
                                            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                            <input
                                                type="password" 
                                                id="confirmPassword"
                                                placeholder="Enter your password again"
                                                className={classNames("form-control", {'is-invalid': errors?.confirmPassword, 'is-valid': dirtyFields.confirmPassword && !errors['confirmPassword']})}
                                                {...register("confirmPassword")}
                                            />
                                            <div className={classNames("text-danger", "hidden", {show: errors?.confirmPassword})} >
                                                {errors?.confirmPassword?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-check d-flex justify-content-center mb-5">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            id="agreeTerms"
                                            checked={true}
                                            {...register("agreeTerms")}
                                        />
                                        <label className="form-check-label" htmlFor="agreeTerms">
                                            I agree all statements in <a href="#!">Terms of service</a>
                                        </label>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button onClick={handleSubmit(signUp)} type="button" className="btn btn-primary btn-lg">Register
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
            <Footer />
        </section>
    )
}

export default withParamsAndNavigation(Signup);