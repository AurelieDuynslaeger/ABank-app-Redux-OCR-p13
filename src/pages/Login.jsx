import Button from "../components/Button";
import Header from "../components/Header"
import Input from "../components/Input";
import Footer from '../components/Footer'
import "../stylesheet/pages/login.css"
import { FaUserCircle } from "react-icons/fa";


const Login = () => {
    return (
       <>
        <Header/>
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FaUserCircle className="sign-in-icon"/>
                <h1>Sign In</h1>
                <form action="">
                    <Input 
                        id="username" 
                        label="Username" 
                        type="text"
                        autocomplete="username" 
                    />
                    <Input 
                        id="password" 
                        label="Password" 
                        type="password"
                        autocomplete="current-password" 
                    />
                    <Input 
                        id="remember-me" 
                        label="Remember me" 
                        type="checkbox"
                        autocomplete="off" 
                    />
                    <Button type="submit" className="sign-in-button">
                        Sign In
                    </Button>

                </form>
            </section>
        </main>
        <Footer/>
       </>
    )
}

export default Login