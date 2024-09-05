import Header from '../components/Header'
import Button from '../components/Button'
import Footer from '../components/Footer'
import "../stylesheet/pages/userprofile.css"
import constants from "../constants"
import AccountCard from '../components/AccountCard'

const UserProfile = () => {
    const {account} = constants;
    return (
        <>
            <Header/>
            <main className='main bg-dark'>
                <div className='header'>
                    <h1>Welcome back<br />Tony Jarvis!</h1>
                    <Button type="submit" className="edit-button">
                            Edit Name
                    </Button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                {account.map((acc, index) => (
                <AccountCard
                    key={index}
                    title={acc.title}
                    amount={acc.amount}
                    description={acc.description}
                    onButtonClick=""
                />
            ))}
            </main>
            <Footer/>
        </>
    )
}

export default UserProfile