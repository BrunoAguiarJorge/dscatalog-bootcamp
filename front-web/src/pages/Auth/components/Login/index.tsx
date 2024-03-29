import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ButtonIcon from 'core/components/ButtonIcon';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormState = {
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}
const Login = () => {
    const { register, handleSubmit, errors  } = useForm<FormState>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    let location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: '/admin' } };

    const onSubmit = (data: FormState) => {
        makeLogin(data)
            .then(response => {
                setHasError(false);
                saveSessionData(response.data);
                history.push(from);
            })
            .catch(() => {
                setHasError(true);
            })
    }
    return (
        <AuthCard title="login">
            {hasError && (
            <div className="alert alert-danger mt-5">
                Username or password invalid!
            </div>)}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="margin-botton-30">
                    <input
                        type="email"
                        className={`form-control input-base ${errors.username ? 'is-invalid' : ''}`}
                        placeholder="Email"
                        name="username"
                        ref={register({
                            required: "Field required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email"
                            }
                        })}
                    />
                    {errors.username && (
                        <div className="invalid-feedback d-block">
                            {errors.username.message}
                        </div>
                    )}
                </div>
                <div className="margin-botton-30">
                    <input
                        type="password"
                        className={`form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Password"
                        name="password"
                        ref={register({required: "Field required" })}
                    />
                    {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <Link to="/auth/recover" className="login-link-recover">
                    Forgot password?
               </Link>
                <div className="login-submit">
                    <ButtonIcon text="Login" />
                </div>
                <div className="text-center">
                    <span className="not-registered">
                        Not registered?
                   </span>
                    <Link to="/auth/register" className="login-link-register">
                        Register
                    </Link>
                </div>
            </form>
        </AuthCard>
    )
};

export default Login;