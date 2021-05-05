import InputError from '@/Components/Errors/InputError';
import { setLogin, loginFetch, setLoading } from '@/features/auth/loginSlice';
import * as styles from '@/styles/Login.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";
import Toaster from '@/Utils/Tools/Toast';
import { useRouter } from 'next/router'
import { useEffect } from 'react';


const Login = () => {
    const router = useRouter()

    useEffect(() => {
        /** setup middleware here */
        console.log('local', localStorage.getItem('token'));
        if (localStorage.getItem('token')) {
            router.push('/users/profile');
        }
    }, [])



    const { login, errors, isFetching, isSuccess, isError, successMessage, errorMessage } = useSelector(state => state.login)
    const dispatch = useDispatch()
    const handleLoginProcess = async () => {
        dispatch(setLoading())
        console.log('passing data', login);
        await dispatch(loginFetch(login))
        if (localStorage.getItem('token')) {
            console.log('redirecting');
            router.push('/users/profile');
        }
        console.log('not red', localStorage.getItem('token'));

    }

    return (
        <section className=" hero is-fullheight ">
            <Toaster type='s' showing={isSuccess} title="Success!" body={successMessage} />
            <Toaster type='e' showing={isError} title="ERROR!" body={errorMessage} />
            <div className={styles.heroBody + " hero-body has-text-centered"}>
                <div className="login">
                    <p className="is-large has-text-centered has-bold">Login With US</p>
                    <br />
                    <div className="field">
                        <div className="control">
                            <input
                                name="email"
                                defaultValue={login.email}
                                onChange={(e) => dispatch(setLogin({ email: e.target.value }))}
                                className="input is-medium is-rounded" type="email" placeholder="hello@example.com" required />
                            {errors && errors.email && (<InputError errors={errors.email} />)}
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <input
                                name="password"
                                onChange={(e) => dispatch(setLogin({ password: e.target.value }))}
                                className="input is-medium is-rounded" type="password" placeholder="Enter Password" required />
                            {errors && errors.password && (<InputError errors={errors.password} />)}
                        </div>
                    </div>
                    <button
                        onClick={() => handleLoginProcess()} className={"button is-block is-fullwidth is-primary is-medium is-rounded " + ((isFetching) ? ' is-loading ' : '')} type="submit"
                    >
                        Login
                        </button>
                    <br />
                    <nav className="level">
                        <div className="level-item has-text-centered mr-5">
                            <Link href="/auth/forgot-password">
                                <a href="#">Forgot Password?</a>
                            </Link>
                            {/* <a href="#">Forgot Password?</a> */}
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <Link href="/auth/sign-up">
                                    <a href="#">Create an Account?</a>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </section >
    );
}
export default Login
