import InputError from '@/Components/Errors/InputError';
import { setLoading, setSignUpDetail, signupProcess } from '@/features/auth/signupSlice';
import * as styles from '@/styles/SignUp.module.scss'
import Toaster from '@/Utils/Tools/Toast';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {

    const dispatch = useDispatch()
    const { signup, errors, isFetching, isSuccess, isError, successMessage, errorMessage } = useSelector(state => state.signUp)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(setLoading())
        await dispatch(signupProcess(signup))
    }

    return (
        <>
            <div className={styles.bodyMain}>
                <Toaster type='s' showing={isSuccess} title="Done!" body={successMessage} />
                <Toaster type='e' showing={isError} title="Error!" body={errorMessage} />
                <div className={styles.signupForm}>
                    <form className={styles.signupFormForm} method="post">
                        <h2 className={styles.form_title}>
                            Sign Up
                        </h2>
                        <small className="pt-5 text-">Signup with <b>Laravel with NextJs Authentication</b> App</small>
                        <hr className={styles.signup_form__hr + " fa-border"} />

                        <div className="form-group">
                            <label className={styles.signup_form__label}>Name</label>
                            <input
                                defaultValue={signup.name}
                                onChange={e => dispatch(setSignUpDetail({ name: e.target.value }))}
                                type="text" className={styles.form_control + " form-control"} name="name" placeholder="Enter Name" />
                            <InputError errors={errors.name} />
                        </div>

                        <div className="form-group mt-2">
                            <label className={styles.signup_form__label}>Email Address</label>
                            <input
                                defaultValue={signup.email}
                                onChange={e => dispatch(setSignUpDetail({ email: e.target.value }))}
                                type="email" className={styles.form_control + " form-control"} name="email" placeholder="Enter Email" />
                            <InputError errors={errors.email} />
                        </div>

                        <div className="form-group mt-2">
                            <label className={styles.signup_form__label}>Password</label>
                            <input
                                defaultValue={signup.password}
                                onChange={e => dispatch(setSignUpDetail({ password: e.target.value }))}
                                type="password" className={styles.form_control + " form-control"} name="password" placeholder="Enter password" />
                            <InputError errors={errors.password} />
                        </div>
                        <div className="form-group mt-2">
                            <label className={styles.signup_form__label}>Confirm Password</label>
                            <input
                                defaultValue={signup.password_confirmation}
                                onChange={e => dispatch(setSignUpDetail({ password_confirmation: e.target.value }))}
                                type="password" className={styles.form_control + " form-control"} name="password_confirmation" placeholder="Enter confirm password" />
                            <InputError errors={errors.password_confirmation} />
                        </div>

                        <div className="form-group text-center">
                            <button
                                onClick={e => handleSubmit(e)}
                                type="button" className={styles.signup_form__btn + " mt-3 mb-3 btn btn-primary btn-block btn-lg"}>
                                {isFetching ? (
                                    <span>
                                        Loading...
                                        <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </span>
                                ) : 'Sign Up'
                                }
                            </button>
                        </div>

                        <div className="text-center ">Already have an account?{" "}
                            <Link href="/auth/login">
                                <a className="text-dark">Login here</a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;