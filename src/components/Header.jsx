import AbLogo from "/img/argentBankLogo.png"
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import "../stylesheet/components/header.css"

const Header = () => {
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img src={AbLogo} alt="argent Bank Logo" className='main-nav-logo-image' />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-items">
                <Link to="/login" className='main-nav-item'>
                    <FaUserCircle />
                    Sign In
                </Link>
            </div>
        </nav>
    )
}

export default Header