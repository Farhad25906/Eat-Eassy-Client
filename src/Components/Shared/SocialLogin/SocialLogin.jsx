// import React from 'react';
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const SocialLogin = () => {
    const {
        signInWithGoogle,
        loading,
    } = useAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    // handle google signin
    const handleGoogleSignIn = async () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                        toast.success('Google sigin in successfull')
                    })
            })
    }
    return (
        <div>
            <button
                disabled={loading}
                onClick={handleGoogleSignIn}
                className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
            >
                <FcGoogle size={32} />

                <p>Continue with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;