

// import React, { useState } from 'react'
// import logo from "../assets/logo.jpg"
// import google from "../assets/google.jpg"
// import { IoEyeOutline } from "react-icons/io5";
// import { IoEye } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { ClipLoader } from 'react-spinners';
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// import { signInWithPopup } from '@firebase/auth';
// import { auth, provider } from '../../utils/firebase';
// import { FaArrowLeftLong } from "react-icons/fa6";

// function Login() {
//   const [show, setShow] = useState(false)
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleLogin = async () => {
//     setLoading(true)
//     try {
//       const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
//       dispatch(setUserData(result.data))
//       setLoading(false)
//       toast.success("Login Successfully")
//       navigate("/")
//     } catch (error) {
//       console.log(error)
//       setLoading(false)
//       toast.error(error.response.data.message)
//     }
//   }

//   const googleLogin = async () => {
//     try {
//       const response = await signInWithPopup(auth, provider)
//       let user = response.user
//       let name = user.displayName
//       let email = user.email
//       let role = ""
//       const result = await axios.post(serverUrl + "/api/auth/googleauth", { name, email, role }, { withCredentials: true })
//       dispatch(setUserData(result.data))
//       navigate("/")
//       toast.success("Login Successfully")
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response.data.message)
//     }
//   }

//   return (
//     <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-[#0F172A] relative overflow-hidden'>

//       {/* background glow orbs */}
//       <div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#3B82F6] opacity-15 rounded-full blur-[130px] pointer-events-none' />
//       <div className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#a890e0] opacity-15 rounded-full blur-[130px] pointer-events-none' />
//       <div className='absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-[#06B6D4] opacity-5 rounded-full blur-[100px] pointer-events-none' />

//       <form
//         className='w-[90%] md:w-[780px] h-auto md:h-[560px] rounded-2xl flex overflow-hidden shadow-2xl relative'
//         style={{ border: '1px solid rgba(59,130,246,0.2)', background: 'rgba(30,41,59,0.95)' }}
//         onSubmit={(e) => e.preventDefault()}
//       >
//         {/* back arrow */}
//         <button
//           type="button"
//           className='absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all duration-300'
//           style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}
//           onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
//           onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
//           onClick={() => navigate("/")}
//         >
//           <FaArrowLeftLong className='w-[14px] h-[14px] text-[#3B82F6]' />
//         </button>

//         {/* ── Left side ── */}
//         <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-4 py-10 px-2'>

//           {/* heading */}
//           <div className='text-center mb-1'>
//             <h1 className='font-bold text-[#E2E8F0] text-2xl'>Welcome back</h1>
//             <h2 className='text-[#94A3B8] text-[15px] mt-1'>Login to your account</h2>
//           </div>

//           {/* Email */}
//           <div className='flex flex-col gap-1 w-[82%] items-start'>
//             <label htmlFor="email" className='font-semibold text-[#E2E8F0] text-sm'>Email</label>
//             <input
//               id='email'
//               type="text"
//               className='w-[100%] h-[42px] rounded-lg px-[14px] text-[14px] text-[#E2E8F0] outline-none transition-all duration-300'
//               style={{
//                 background: '#0F172A',
//                 border: '1px solid rgba(59,130,246,0.3)',
//               }}
//               onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
//               onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.3)'}
//               placeholder='Your email'
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//           </div>

//           {/* Password */}
//           <div className='flex flex-col gap-1 w-[82%] items-start relative'>
//             <label htmlFor="password" className='font-semibold text-[#E2E8F0] text-sm'>Password</label>
//             <input
//               id='password'
//               type={show ? "text" : "password"}
//               className='w-[100%] h-[42px] rounded-lg px-[14px] text-[14px] text-[#E2E8F0] outline-none transition-all duration-300'
//               style={{
//                 background: '#0F172A',
//                 border: '1px solid rgba(59,130,246,0.3)',
//               }}
//               onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
//               onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.3)'}
//               placeholder='Your password'
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//             />
//             {!show
//               ? <IoEyeOutline
//                   className='absolute w-[18px] h-[18px] cursor-pointer right-[4%] bottom-[18%] text-[#94A3B8] hover:text-[#06B6D4] transition-colors'
//                   onClick={() => setShow(prev => !prev)}
//                 />
//               : <IoEye
//                   className='absolute w-[18px] h-[18px] cursor-pointer right-[4%] bottom-[18%] text-[#06B6D4]'
//                   onClick={() => setShow(prev => !prev)}
//                 />
//             }
//           </div>

//           {/* Forgot password */}
//           <div className='w-[82%] flex justify-end'>
//             <span
//               className='text-[12px] text-[#94A3B8] hover:text-[#06B6D4] cursor-pointer transition-colors'
//               onClick={() => navigate("/forget-password")}
//             >
//               Forgot your password?
//             </span>
//           </div>

//           {/* Login button */}
//           <button
//             type="button"
//             className='w-[82%] h-[42px] rounded-lg font-semibold text-white flex items-center justify-center transition-all duration-300'
//             style={{
//               background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
//               boxShadow: '0 0 20px #3B82F655',
//             }}
//             onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px #8B5CF688'}
//             onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px #3B82F655'}
//             disabled={loading}
//             onClick={handleLogin}
//           >
//             {loading ? <ClipLoader size={22} color='white' /> : "Login"}
//           </button>

//           {/* divider */}
//           <div className='w-[82%] flex items-center gap-2'>
//             <div className='flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#94A3B8]/30' />
//             <span className='text-[13px] text-[#94A3B8] whitespace-nowrap'>Or continue with</span>
//             <div className='flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#94A3B8]/30' />
//           </div>

//           {/* Google button */}
//           <button
//             type="button"
//             className='w-[82%] h-[42px] rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300'
//             style={{
//               border: '1px solid rgba(59,130,246,0.3)',
//               background: '#0F172A',
//               color: '#E2E8F0',
//             }}
//             onMouseEnter={e => {
//               e.currentTarget.style.border = '1px solid #3B82F6';
//               e.currentTarget.style.background = 'rgba(59,130,246,0.08)';
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.border = '1px solid rgba(59,130,246,0.3)';
//               e.currentTarget.style.background = '#0F172A';
//             }}
//             onClick={googleLogin}
//           >
//             <img src={google} className='w-[22px] h-[22px] rounded-full' alt="google" />
//             <span className='text-[14px] font-medium'>Continue with Google</span>
//           </button>

//           {/* signup link */}
//           <div className='text-[#94A3B8] text-[13px]'>
//             Don't have an account?{' '}
//             <span
//               className='text-[#3B82F6] hover:text-[#06B6D4] cursor-pointer font-medium transition-colors underline underline-offset-2'
//               onClick={() => navigate("/signup")}
//             >
//               Sign Up
//             </span>
//           </div>
//         </div>

//         {/* ── Right side ── */}
//         <div
//           className='w-[50%] h-[100%] rounded-r-2xl md:flex items-center justify-center flex-col hidden relative overflow-hidden'
//           style={{ background: 'linear-gradient(135deg, #111827 0%, #0F172A 100%)' }}
//         >
//           {/* glow orbs */}
//           <div className='absolute top-[-60px] right-[-60px] w-[250px] h-[250px] bg-[#3B82F6] opacity-20 rounded-full blur-[80px]' />
//           <div className='absolute bottom-[-60px] left-[-60px] w-[250px] h-[250px] bg-[#8B5CF6] opacity-20 rounded-full blur-[80px]' />

//           {/* grid pattern */}
//           <div
//             className='absolute inset-0 opacity-5'
//             style={{
//               backgroundImage: 'linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)',
//               backgroundSize: '40px 40px'
//             }}
//           />

//           {/* content */}
//           <div className='relative z-10 flex flex-col items-center gap-4 px-8'>

//             {/* logo */}
//             <div className='relative'>
//               <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[16px] opacity-60 scale-110' />
//               <img
//                 src={logo}
//                 alt="logo"
//                 className='w-24 h-24 rounded-2xl relative z-10 object-cover'
//                 style={{ border: '2px solid rgba(59,130,246,0.5)' }}
//               />
//             </div>

//             {/* brand */}
//             <span
//               className='text-3xl font-bold'
//               style={{
//                 background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #06B6D4)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               EduNovaAI
//             </span>

//             <p className='text-[#94A3B8] text-sm text-center leading-relaxed'>
//               Your AI-powered learning platform to grow skills and advance your career.
//             </p>

//             {/* feature pills */}
//             <div className='flex flex-col gap-2 mt-2 w-full'>
//               {['Safe and friendly community for discussion', ' Earn Certificate directly by passing quiz', '14 Languages AI doubt resolution','Share resources among community'].map((f, i) => (
//                 <div
//                   key={i}
//                   className='px-4 py-1.5 rounded-full text-xs font-medium text-[#E2E8F0] text-center'
//                   style={{
//                     background: 'rgba(59,130,246,0.1)',
//                     border: '1px solid rgba(59,130,246,0.25)',
//                   }}
//                 >
//                   {f}
//                 </div>
//               ))}
//             </div>

//             {/* bottom quote */}
//             <p
//               className='text-[11px] text-center mt-2 italic'
//               style={{ color: '#94A3B8' }}
//             >
//               "Learning is the most powerful tool you can use to change the world."
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default Login



import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import google from "../assets/google.jpg"
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from '@firebase/auth';
import { auth, provider } from '../../utils/firebase';
import { FaArrowLeftLong } from "react-icons/fa6";

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
      dispatch(setUserData(result.data))
      setLoading(false)
      toast.success("Login Successfully")
      navigate("/")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName
      let email = user.email
      let role = ""
      const result = await axios.post(serverUrl + "/api/auth/googleauth", { name, email, role }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Login Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-[#ff23670d] relative overflow-hidden'>

      {/* background glow orbs - Light Purple & Green */}
      <div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#C4B5FD] opacity-30 rounded-full blur-[130px] pointer-events-none' />
      <div className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[130px] pointer-events-none' />

      <form
        className='w-[90%] md:w-[780px] h-auto md:h-[560px] rounded-2xl flex overflow-hidden shadow-2xl relative'
        style={{ border: '1px solid rgba(167, 243, 208, 0.5)', background: 'rgba(255, 255, 255, 0.9)' }}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* back arrow */}
        <button
          type="button"
          className='absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all duration-300'
          style={{ background: 'rgba(196, 181, 253, 0.2)', border: '1px solid rgba(196, 181, 253, 0.5)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(196, 181, 253, 0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(196, 181, 253, 0.2)'}
          onClick={() => navigate("/")}
        >
          <FaArrowLeftLong className='w-[14px] h-[14px] text-[#7C3AED]' />
        </button>

        {/* ── Left side ── */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-4 py-10 px-2'>

          <div className='text-center mb-1'>
            <h1 className='font-bold text-[#1F2937] text-2xl'>Welcome back</h1>
            <h2 className='text-[#6B7280] text-[15px] mt-1'>Login to your account</h2>
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1 w-[82%] items-start'>
            <label htmlFor="email" className='font-semibold text-[#374151] text-sm'>Email</label>
            <input
              id='email'
              type="text"
              className='w-[100%] h-[42px] rounded-lg px-[14px] text-[14px] text-[#1F2937] outline-none transition-all duration-300'
              style={{ background: '#F9FAFB', border: '1px solid #D1D5DB' }}
              onFocus={e => e.currentTarget.style.border = '1px solid #7C3AED'}
              onBlur={e => e.currentTarget.style.border = '1px solid #D1D5DB'}
              placeholder='Your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-1 w-[82%] items-start relative'>
            <label htmlFor="password" className='font-semibold text-[#374151] text-sm'>Password</label>
            <input
              id='password'
              type={show ? "text" : "password"}
              className='w-[100%] h-[42px] rounded-lg px-[14px] text-[14px] text-[#1F2937] outline-none transition-all duration-300'
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

          <div className='w-[82%] flex justify-end'>
            <span className='text-[12px] text-[#6B7280] hover:text-[#7C3AED] cursor-pointer transition-colors' onClick={() => navigate("/forget-password")}>
              Forgot your password?
            </span>
          </div>

          {/* Login button */}
          <button
            type="button"
            className='w-[82%] h-[42px] rounded-lg font-semibold text-white flex items-center justify-center transition-all duration-300'
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)' }}
            onClick={handleLogin}
          >
            {loading ? <ClipLoader size={22} color='white' /> : "Login"}
          </button>

          <div className='w-[82%] flex items-center gap-2'>
            <div className='flex-1 h-[1px] bg-gray-300' />
            <span className='text-[13px] text-[#6B7280]'>Or continue with</span>
            <div className='flex-1 h-[1px] bg-gray-300' />
          </div>

          {/* Google button */}
          <button
            type="button"
            className='w-[82%] h-[42px] rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 border border-gray-300'
            style={{ background: '#FFFFFF', color: '#374151' }}
            onClick={googleLogin}
          >
            <img src={google} className='w-[22px] h-[22px] rounded-full' alt="google" />
            <span className='text-[14px] font-medium'>Continue with Google</span>
          </button>

          <div className='text-[#6B7280] text-[13px]'>
            Don't have an account?{' '}
            <span className='text-[#7C3AED] hover:text-[#10B981] cursor-pointer font-medium underline' onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </div>
        </div>

        {/* ── Right side ── */}
        <div className='w-[50%] h-[100%] rounded-r-2xl md:flex items-center justify-center flex-col hidden relative overflow-hidden'
          style={{ background: 'linear-gradient(135deg, #EDE9FE 0%, #ECFDF5 100%)' }}>
          
          <div className='relative z-10 flex flex-col items-center gap-4 px-8'>
            <img src={logo} alt="logo" className='w-24 h-24 rounded-2xl border-2 border-[#7C3AED]' />
            <span className='text-3xl font-bold text-[#7C3AED]'>EduNovaAI</span>
            <p className='text-[#4B5563] text-sm text-center leading-relaxed'>Your AI-powered learning platform to grow skills and advance your career.</p>
            
            <div className='flex flex-col gap-2 mt-2 w-full'>
              {['Safe and friendly community', 'Earn Certificate by quiz', '14 Languages AI resolution','Share resources'].map((f, i) => (
                <div key={i} className='px-4 py-1.5 rounded-full text-xs font-medium text-[#1F2937] text-center border border-[#A7F3D0] bg-[#F0FDF4]'>
                  {f}
                </div>
              ))}
            </div>
            <p className='text-[11px] text-center mt-2 italic text-[#6B7280]'>"Learning is the most powerful tool."</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login