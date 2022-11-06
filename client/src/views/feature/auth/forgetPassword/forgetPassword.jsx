import React from "react";
import { withParamsAndNavigation } from "../../../../utility/routerHelper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFormState } from "react-hook-form";
import Footer from "../../../../components/footer";
import classNames from "classnames";
import * as yup from "yup";
import './forgetPassword.css';

const schema = yup.object({
    email: yup.string().required('Email is required').email("Not a valid email"),
}).required();

function ForgetPassword() {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const { dirtyFields } = useFormState({
        control
    });

    const resetPassword = async (data) => {
        console.log(data);
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#ffffff'}}>
            <div className="container vh-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Reset Password</p>

                                <form className="mx-1 mx-md-4" noValidate>


                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FontAwesomeIcon icon={["fas", "envelope"]} className="fa-lg me-3 fa-fw pt-4" />
                                        <div className="form-outline flex-fill">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                placeholder="Enter a registered email address"
                                                className={classNames("form-control", {'is-invalid': errors?.email, 'is-valid': dirtyFields.email && !errors['email']})}
                                                {...register("email")}
                                            />
                                            <div className={classNames("text-danger", "hidden", {show: errors?.email})} >
                                                {errors?.email?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button onClick={handleSubmit(resetPassword)} type="button" className="btn btn-primary btn-lg btn-block">Reset Password</button>
                                    </div>
                                </form>
                            </div>
                            <div
                                className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                <img src="/draw1.webp" className="img-fluid" alt="Reset Password Here"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default withParamsAndNavigation(ForgetPassword);