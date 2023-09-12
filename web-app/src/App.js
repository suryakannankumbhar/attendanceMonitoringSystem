import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { Auth0Provider } from '@auth0/auth0-react';
function App() {
    return (
        <Auth0Provider
            domain='dev-pp7z7v5zvwl7ttoq.us.auth0.com'
            clientId='LEv9u0hmAQ7kldEOuyzSWNgmb6Bzn9hk'
            authorizationParams={{
                redirect_uri: 'http://localhost:3000/home',
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />}></Route>
                    <Route path='/home' element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </Auth0Provider>
    );
}

export default App;
