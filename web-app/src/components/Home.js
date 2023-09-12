import React from 'react';
// import DataTable from 'react-data-table-component';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { useAuth0 } from '@auth0/auth0-react';
import { CubeSpinner } from 'react-spinners-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RealTimeData } from './dataTable/index';
// import { ref, update } from 'firebase/database';

const Home = () => {
    const { logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className='loadingScreen'>
                <h2>Loading...</h2>
                <CubeSpinner />;
            </div>
        );
    }

    return (
        isAuthenticated && (
            <div className='home'>
                <div className='navigationBar'>
                    <h1>HOME</h1>
                    <NavLink>
                        <button
                            onClick={() =>
                                logout({
                                    logoutParams: {
                                        returnTo: window.location.origin,
                                    },
                                })
                            }
                        >
                            Logout
                        </button>
                    </NavLink>
                </div>
                <RealTimeData />
            </div>
        )
    );
};

export default Home;
