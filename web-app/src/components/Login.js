import React from 'react';
import { NavLink } from 'react-router-dom';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import { CubeSpinner } from 'react-spinners-kit';
const Login = () => {
    const { loginWithRedirect, isLoading } = useAuth0();
    if (isLoading) {
        return (
            <div className='loadingScreen'>
                <h2>Loading...</h2>
                <CubeSpinner />;
            </div>
        );
    }
    return (
        <div className='loginPage'>
            <div className='container'>
                <h1>Attendance Monitoring System</h1>
                <NavLink>
                    <button onClick={() => loginWithRedirect()}>Login</button>
                </NavLink>
            </div>
        </div>
    );
};

export default Login;
