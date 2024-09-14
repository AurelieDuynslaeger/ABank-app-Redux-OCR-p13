import Button from "../components/Button";
import Header from "../components/Header"
import Input from "../components/Input";
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux';
import {login} from '../redux/slices/authSlice'
import {loginUser} from '../api/serviceApi'
import "../stylesheet/pages/login.css"
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); 
    try {
        const user = await loginUser(email, password);
        dispatch(login(user));
        navigate('/profile');
    } catch (error) {
        setError(error.message || 'Echec de connexion, verifiez vos identifiants.');
    } finally {
        setLoading(false);
    }
};
    return (
       <>
        <Header/>
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FaUserCircle className="sign-in-icon"/>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <Input 
                        id="username" 
                        label="Username" 
                        type="text"
                        autocomplete="username" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        id="password" 
                        label="Password" 
                        type="password"
                        autocomplete="current-password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input 
                        id="remember-me" 
                        label="Remember me" 
                        type="checkbox"
                        autocomplete="off" 
                    />
                    {error && <p className="error-message">{error}</p>}
                    <Button type="submit" className="sign-in-button">
                        {loading ? 'Connexion en cours...' : 'Sign In'}
                    </Button>

                </form>
            </section>
        </main>
        <Footer/>
       </>
    )
}

export default Login