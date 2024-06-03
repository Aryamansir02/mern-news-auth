import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await axios.post('/api/users/logout', {}, { withCredentials: true });
        navigate('/');
    };

    const location = useLocation()

    if (location.pathname === "/") {
        return null
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/news">NewsApp</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    {location.pathname !== '/news' && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">Home</Link>
                        </li>
                    )}
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-outline-danger" onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
