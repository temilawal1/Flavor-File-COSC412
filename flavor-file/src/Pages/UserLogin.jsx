import { useState} from 'react';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react'
import '../styles/UserLogin.css';

const API_BASE_URL = 'http://localhost:8080/api/v1/users';

function UserLogin({ onLogin }){
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        passWord: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    passWord: formData.passWord
                }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                onLogin(user);
            } else {
                const errorData = await response.text();
                setError(errorData || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.passWord !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch (`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    passWord: formData.passWord
                }),
            });

            if (response.ok) {
                alert('Account created successfully! Please log in.');
                setIsLoginMode(true);
                setFormData({ userName: '', email: '', passWord: '', confirmPassword: '' });
            } else {
                const errorData = await response.text();
                setError(errorData || 'Failed to create account');
            }
        } catch (error) {
            console.error('Register error:', error);
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>{isLoginMode ? 'Welcome Back' : 'Create Account'}</h2>
                    <p>{isLoginMode ? 'Sign in to access your recipes' : 'Join FlavorFile today'}</p>
                </div>

                <form onSubmit={isLoginMode ? handleLogin : handleRegister} className="login-form">
                    <div className="form-group">
                        <label>
                            <User className="input-icon" />
                            Username
                        </label>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Enter your username"
                            value={formData.userName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    

                    {!isLoginMode && (
                        <div className="form-group">
                            <label>
                                <Mail className="input-icon" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>
                            <Lock className="input-icon" />
                            Password
                        </label>
                        <input
                            type="password"
                            name="passWord"
                            placeholder="Enter your password"
                            value={formData.passWord}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="form-group">
                            <label>
                                <Lock className="input-icon" />
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required={!isLoginMode}
                            />
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Please wait...' : (
                            <>
                                {isLoginMode ? <LogIn className="button-icon" /> : <UserPlus className="button-icon" />}
                                {isLoginMode ? 'Sign In' : 'Create Account'}
                            </>
                        )}
                    </button>
                     <div className = "skip-login">
                    <button className = "submit-button"
                     onClick = {() => onLogin({ userName: "guest", userKey: "guest-user"})}>
                        Continue As Guest
                     </button>
                </div>
                </form>

                <div className="toggle-mode">
                    <p>
                        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError('');
                            setFormData({ userName: '', email: '', passWord: '', confirmPassword: '' });
                        }}>
                            {isLoginMode ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
               
            </div>
        </div>
    );
}

export default UserLogin;