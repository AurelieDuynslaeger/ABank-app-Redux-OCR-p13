import Header from '../components/Header'
import Button from '../components/Button'
import Footer from '../components/Footer'
import constants from "../constants"
import AccountCard from '../components/AccountCard'
import Input from '../components/Input'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../api/serviceApi';
import { updateUser } from '../redux/slices/authSlice';
import "../stylesheet/pages/userprofile.css"

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [firstname, setFirstname] = useState(user?.firstName || '');
    const [lastname, setLastname] = useState(user?.lastName || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { account } = constants;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFirstname(user?.firstName || '');
        setLastname(user?.lastName || '');
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        try {
            const token = localStorage.getItem('authToken');
            console.log('Retrieved Token:', token);
    
            if (!token) {
                throw new Error('Token manquant pour la mise à jour du profil');
            }
    
            const updatedData = { firstName: firstname, lastName: lastname };
            console.log('Updated Data:', updatedData);
            const updatedUser = await updateUserProfile(token, updatedData);
    
            dispatch(updateUser(updatedUser));
            setSuccess('Profil mis à jour avec succès');
            setIsEditing(false);
        } catch (err) {
            console.error('Update Profile Error:', err);
            setError('Erreur lors de la mise à jour du profil');
        }
    };

    return (
        <>
            <Header/>
            <main className='main bg-dark'>
                <div className='header'>
                    <h1>Welcome back</h1>
                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="profile-form">
                            <div className='form-inputs'>
                                <Input
                                    id="first-name"
                                    label=""
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    placeholder={user?.firstName || 'Prénom'}
                                    autoComplete="given-name"
                                />
                                <Input
                                    id="last-name"
                                    label=""
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    placeholder={user?.lastName || 'Nom'}
                                    autoComplete="family-name"
                                />
                            </div>
                            <div className='form-buttons'>
                                <button type="submit" className='save-button'>Save</button>
                                <button className="cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            {success && <p className="success-message">{success}</p>}
                        </form>
                    ) : (
                        <>
                            <h1>{user?.firstName} {user?.lastName}</h1>
                            <Button className="edit-button" onClick={handleEditClick}>
                                Edit Name
                            </Button>
                        </>
                    )}
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
