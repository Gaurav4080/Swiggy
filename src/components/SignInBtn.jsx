import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utils/authSlice'
import { useNavigate } from 'react-router-dom'
import { toggleLogIn } from '../utils/toggleSlice'

function SignInBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.authSlice.UserData)

    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
        const userdata = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }
        dispatch(addUserData(userdata))
        dispatch(toggleLogIn())
        navigate("/")
    }

    async function handleLogout() {
        await signOut(auth)
        dispatch(removeUserData())
        dispatch(toggleLogIn())
    }

    return (
        <>
            {!userData ? <button onClick={handleAuth} className='w-full bg-orange-600 hover:cursor-pointer hover:text-orange-600 hover:border-orange-400 hover:border-2 hover:bg-white text-2xl font-semibold text-white py-2 mt-5'>Log In</button> : userData && <button onClick={handleLogout} className='w-full bg-orange-600 hover:cursor-pointer hover:text-orange-600 hover:border-orange-400 hover:border-2 hover:bg-white text-2xl font-semibold text-white py-2 mt-5'>Logout</button>}
        </>
    )
}

export default SignInBtn