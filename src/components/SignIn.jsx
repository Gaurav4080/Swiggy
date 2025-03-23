import { signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utils/authSlice'
import { useNavigate } from 'react-router-dom'

function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.authSlice.UserData)

    async function handleAuth(){
        let data = await signInWithPopup(auth, provider)
        const userdata = {
            name : data.user.displayName,
            photo : data.user.photoURL
        }
        dispatch(addUserData(userdata))
        navigate("/cart")
    }

    async function handleLogout() {
        await signOut(auth)
        dispatch(removeUserData())
    }

  return (
    <div>
        Login
        <button onClick={handleAuth} className='bg-slate-300 p-5 m-6'>Login</button>
        {userData && <button onClick={handleLogout} className='bg-slate-300 p-5 m-6'>Logout</button>}
    </div>
  )
}

export default SignIn