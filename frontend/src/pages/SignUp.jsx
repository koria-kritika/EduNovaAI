import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from '../../utils/firebase';

function SignUp() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSignup = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", { name, password, email, role }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate("/")
            toast.success("Signup Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName
            let email = user.email
            let role = "student";
            const result = await axios.post(serverUrl + "/api/auth/googleauth", { name, email, role }, { withCredentials: true })
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("Signup Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-[#ff23670d] relative overflow-hidden'>

            
            <div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#C4B5FD] opacity-30 rounded-full blur-[130px] pointer-events-none' />
            <div className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[130px] pointer-events-none' />

            <form
                className='w-[90%] md:w-[780px] h-auto md:h-[600px] rounded-2xl flex overflow-hidden shadow-2xl'
                style={{ border: '1px solid rgba(167, 243, 208, 0.5)', background: 'rgba(255, 255, 255, 0.9)' }}
                onSubmit={(e) => e.preventDefault()}
            >
              
                <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-4 py-8 px-2'>

                    <div className='text-center mb-1'>
                        <h1 className='font-bold text-[#1F2937] text-2xl'>Let's get started</h1>
                        <h2 className='text-[#6B7280] text-[15px] mt-1'>Create your account</h2>
                    </div>

                  
                    <div className='flex flex-col gap-1 w-[82%] items-start'>
                        <label htmlFor="name" className='font-semibold text-[#374151] text-sm'>Name</label>
                        <input
                            id='name'
                            type="text"
                            className='w-[100%] h-[40px] rounded-lg px-[14px] text-[14px] text-[#1F2937] outline-none transition-all duration-300'
                            style={{ background: '#F9FAFB', border: '1px solid #D1D5DB' }}
                            onFocus={e => e.currentTarget.style.border = '1px solid #7C3AED'}
                            onBlur={e => e.currentTarget.style.border = '1px solid #D1D5DB'}
                            placeholder='Your name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    
                    <div className='flex flex-col gap-1 w-[82%] items-start'>
                        <label htmlFor="email" className='font-semibold text-[#374151] text-sm'>Email</label>
                        <input
                            id='email'
                            type="text"
                            className='w-[100%] h-[40px] rounded-lg px-[14px] text-[14px] text-[#1F2937] outline-none transition-all duration-300'
                            style={{ background: '#F9FAFB', border: '1px solid #D1D5DB' }}
                            onFocus={e => e.currentTarget.style.border = '1px solid #7C3AED'}
                            onBlur={e => e.currentTarget.style.border = '1px solid #D1D5DB'}
                            placeholder='Your email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    
                    <div className='flex flex-col gap-1 w-[82%] items-start relative'>
                        <label htmlFor="password" className='font-semibold text-[#374151] text-sm'>Password</label>
                        <input
                            id='password'
                            type={show ? "text" : "password"}
                            className='w-[100%] h-[40px] rounded-lg px-[14px] text-[14px] text-[#1F2937] outline-none transition-all duration-300'
                            style={{ background: '#F9FAFB', border: '1px solid #D1D5DB' }}
                            onFocus={e => e.currentTarget.style.border = '1px solid #7C3AED'}
                            onBlur={e => e.currentTarget.style.border = '1px solid #D1D5DB'}
                            placeholder='Your password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {!show
                            ? <IoEyeOutline className='absolute w-[18px] h-[18px] cursor-pointer right-[4%] bottom-[18%] text-[#9CA3AF] hover:text-[#10B981]' onClick={() => setShow(prev => !prev)} />
                            : <IoEye className='absolute w-[18px] h-[18px] cursor-pointer right-[4%] bottom-[18%] text-[#10B981]' onClick={() => setShow(prev => !prev)} />
                        }
                    </div>

                    
                    <div className='flex w-[82%] items-center gap-3'>
                        <button type="button" onClick={() => setRole("student")}
                            className='flex-1 py-[8px] rounded-lg text-sm font-semibold transition-all duration-300'
                            style={{ border: role === "student" ? '2px solid #7C3AED' : '2px solid #E5E7EB', background: role === "student" ? '#EDE9FE' : 'transparent', color: role === "student" ? '#7C3AED' : '#6B7280' }}>
                            Student
                        </button>
                        <button type="button" onClick={() => setRole("educator")}
                            className='flex-1 py-[8px] rounded-lg text-sm font-semibold transition-all duration-300'
                            style={{ border: role === "educator" ? '2px solid #10B981' : '2px solid #E5E7EB', background: role === "educator" ? '#ECFDF5' : 'transparent', color: role === "educator" ? '#10B981' : '#6B7280' }}>
                            Educator
                        </button>
                    </div>

                  
                    <button
                        className='w-[82%] h-[42px] rounded-lg font-semibold text-white flex items-center justify-center transition-all duration-300'
                        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)' }}
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading ? <ClipLoader size={22} color='white' /> : "Sign Up"}
                    </button>

                    <div className='w-[82%] flex items-center gap-2'>
                        <div className='flex-1 h-[1px] bg-gray-300' />
                        <span className='text-[13px] text-[#6B7280]'>Or continue with</span>
                        <div className='flex-1 h-[1px] bg-gray-300' />
                    </div>

                    
                    <button type="button" className='w-[82%] h-[42px] rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 border border-gray-300' style={{ background: '#FFFFFF', color: '#374151' }} onClick={googleSignUp}>
                        <img src={google} className='w-[22px] h-[22px] rounded-full' alt="google" />
                        <span className='text-[14px] font-medium'>Continue with Google</span>
                    </button>

                    <div className='text-[#6B7280] text-[13px]'>
                        Already have an account?{' '}
                        <span className='text-[#7C3AED] hover:text-[#10B981] cursor-pointer font-medium underline' onClick={() => navigate("/login")}>
                            Login
                        </span>
                    </div>
                </div>

                
                <div className='w-[50%] h-[100%] rounded-r-2xl md:flex items-center justify-center flex-col hidden relative overflow-hidden'
                    style={{ background: 'linear-gradient(135deg, #EDE9FE 0%, #ECFDF5 100%)' }}>
                    <div className='relative z-10 flex flex-col items-center gap-4 px-8'>
                        <img src={logo} alt="logo" className='w-24 h-24 rounded-2xl border-2 border-[#7C3AED]' />
                        <span className='text-3xl font-bold text-[#7C3AED]'>EduNovaAI</span>
                        <p className='text-[#4B5563] text-sm text-center leading-relaxed'>Your AI-powered learning platform to grow skills and advance your career.</p>
                        <div className='flex flex-col gap-2 mt-2 w-full'>
                            {['Safe and friendly community', 'Earn Certificate by quiz', '14 Languages AI resolution', 'Share resources'].map((f, i) => (
                                <div key={i} className='px-4 py-1.5 rounded-full text-xs font-medium text-[#1F2937] text-center border border-[#A7F3D0] bg-[#F0FDF4]'>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp
