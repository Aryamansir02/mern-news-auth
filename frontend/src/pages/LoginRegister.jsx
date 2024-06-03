import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [action, setAction] = useState('login'); // State for tracking login/register action
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (action === 'login') {
                await axios.post('/api/users/auth', { email, password }, { withCredentials: true });
                navigate('/news');
            } else if (action === 'register') {
                await axios.post('/api/users', { email, password }, { withCredentials: true });
                navigate('/news');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div className="row justify-content-md-center">
            <div className="col-md-6">
                <h2>{action === 'login' ? 'Login' : 'Register'}</h2>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="login"
                            name="action"
                            value="login"
                            className="form-check-input"
                            checked={action === 'login'}
                            onChange={() => setAction('login')}
                        />
                        <label className="form-check-label" htmlFor="login">
                            Login
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="register"
                            name="action"
                            value="register"
                            className="form-check-input"
                            checked={action === 'register'}
                            onChange={() => setAction('register')}
                        />
                        <label className="form-check-label" htmlFor="register">
                            Register
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        {action === 'login' ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
