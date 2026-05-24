// import React, { Children, useState } from 'react'
// import logo from "../assets/logo.jpg"
// import { IoPersonCircle } from "react-icons/io5";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { setUserData } from '../redux/userSlice';
// import { toast } from 'react-toastify';
// import { RxHamburgerMenu } from "react-icons/rx";
// import { GiSplitCross } from "react-icons/gi";
// function Nav() {
//     const {userData} = useSelector(state=>state.user)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [show,setShow] = useState(false)
//     const [showHam,setShowHam] = useState(false)

//     const handleLogOut = async () => {
//         try {
//             const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
//             dispatch(setUserData(null))
//             console.log(result.data)
//             toast.success("Logout Successfully")

//         } catch (error) {
//             console.log(error)
//             toast.error(error.response.data.message)

//         }
//     }
//   return (

//     <div>
//       <div className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047]  z-10'>
//         <div className='lg:w-[20%] w-[40%] lg:pl-[50px] '>
//             <img src={logo} alt="" className='w-[60px]  rounded-[5px] border-2 border-white '  />
//         </div>
//         <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>

//            {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer   ' onClick={()=>setShow(prev=>!prev)}/>}
//           {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)}/> 
//           :<div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' onClick={()=>setShow(prev=>!prev)}>
//             {userData?.name.slice(0,1).toUpperCase()}
//            </div>}

//            {userData?.role === "educator" && <div className='px-[20px] py-[10px] border-2 border-white  text-white bg-[black]  rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/dashboard")}>Dashboard</div>}
//            {!userData ?<span className='px-[20px] py-[10px] border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]' onClick={()=>navigate("/login")}>Login</span>:
//            <span className='px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer' onClick={handleLogOut}>LogOut</span>}
//            {show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px]  border-black hover:border-white hover:text-white cursor-pointer hover:bg-black'>
//             <span className='bg-[black] text-white  px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={()=>navigate("/profile")}>My Profile</span>
//             <span className='bg-[black] text-white  px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={()=>navigate("/mycourses")}>My Courses</span>
//            </div>}
           
//         </div>
//         <RxHamburgerMenu  className='w-[35px] h-[35px] lg:hidden text-white cursor-pointer' onClick={()=>setShowHam(prev=>!prev)}/>

//         <div className={`fixed  top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}>
//          <GiSplitCross  className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%]' onClick={()=>setShowHam(prev=>!prev)} />
//              {!userData && <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer   ' />}
//           {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer'/> 
//           : <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black  border-white cursor-pointer' >
//             {userData?.name.slice(0,1).toUpperCase()}
//            </div>}
//            <div className='w-[200px] h-[65px]  border-2 border-white  text-white bg-[black] flex items-center justify-center  rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/profile")}>My Profile</div>
//            <div className='w-[200px] h-[65px]  border-2 border-white  text-white bg-[black] flex items-center justify-center  rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/mycourses")}>My Courses</div>
//            {userData?.role === "educator" && <div className='w-[200px] h-[65px] border-2 border-white flex items-center justify-center  text-white bg-[black]  rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/dashboard")}>Dashboard</div>}
//            {!userData ?<span className='w-[200px] h-[65px] border-2 border-white flex items-center justify-center  text-white bg-[black]  rounded-[10px] text-[18px] font-light cursor-pointer' onClick={()=>navigate("/login")}>Login</span>:
//            <span className='w-[200px] h-[65px] border-2 border-white flex items-center justify-center  text-white bg-[black]  rounded-[10px] text-[18px] font-light cursor-pointer' onClick={handleLogOut}>LogOut</span>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Nav

import React, { useState } from 'react'
import logo from "../assets/logo.jpg"
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";

function Nav() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [showHam, setShowHam] = useState(false)

  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      console.log(result.data)
      toast.success("Logout Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const navBtnBase = {
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  }

  return (
    <div>
      {/* ── Desktop Navbar ── */}
      <div
        className='w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between z-10'
        style={{
          background: 'linear-gradient(135deg, transparent 0%, #8B5CB7 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(59,130,246,0.18)',
          boxShadow: '0 4px 32px rgba(59,130,246,0.08)',
        }}
      >
        {/* Logo */}
        <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
          <img
            src={logo}
            alt=""
            className='w-[60px] rounded-[51px]'
            style={{
              border: '2px solid #3B82F666',
              boxShadow: '0 0 12px #3B82F644',
            }}
          />
        </div>

        {/* Desktop right section */}
        <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden relative'>

          {/* Avatar / Person icon */}
          {!userData &&
            <IoPersonCircle
              className='w-[46px] h-[46px] cursor-pointer transition-all duration-200'
              style={{ color: '#06B6D4', filter: 'drop-shadow(0 0 6px #06B6D466)' }}
              onClick={() => setShow(prev => !prev)}
            />
          }
          {userData?.photoUrl
            ? <img
                src={userData?.photoUrl}
                className='w-[46px] h-[46px] rounded-full cursor-pointer'
                style={{ border: '2px solid #3B82F6', boxShadow: '0 0 12px #3B82F655' }}
                onClick={() => setShow(prev => !prev)}
              />
            : userData && (
              <div
                className='w-[46px] h-[46px] rounded-full flex items-center justify-center text-[18px] font-bold cursor-pointer'
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  color: '#fff',
                  boxShadow: '0 0 14px #8B5CF655',
                  border: '2px solid #8B5CF644',
                }}
                onClick={() => setShow(prev => !prev)}
              >
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )
          }

          {/* Dashboard (educator) */}
          {userData?.role === "educator" &&
            <div
              style={{
                ...navBtnBase,
                background: 'rgba(139,92,246,0.12)',
                border: '1.5px solid #8B5CF666',
                color: '#E2E8F0',
                boxShadow: '0 0 10px #8B5CF622',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.25)';
                e.currentTarget.style.boxShadow = '0 0 18px #8B5CF655';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
                e.currentTarget.style.boxShadow = '0 0 10px #8B5CF622';
              }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          }

          {/* Login / Logout */}
          {!userData
            ? <span
                style={{
                  ...navBtnBase,
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 0 16px #3B82F655',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 26px #8B5CF677';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 16px #3B82F655';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            : <span
                style={{
                  ...navBtnBase,
                  background: 'rgba(239,68,68,0.12)',
                  border: '1.5px solid #EF444466',
                  color: '#FCA5A5',
                  boxShadow: '0 0 10px #EF444422',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.25)';
                  e.currentTarget.style.boxShadow = '0 0 18px #EF444455';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(239,68,68,0.12)';
                  e.currentTarget.style.boxShadow = '0 0 10px #EF444422';
                }}
                onClick={handleLogOut}
              >
                LogOut
              </span>
          }

          {/* Dropdown */}
          {show &&
            <div
              className='absolute top-[110%] right-[0%] flex flex-col items-center justify-center gap-2 rounded-xl px-[15px] py-[12px]'
              style={{
                background: '#1E293B',
                border: '1px solid #3B82F633',
                boxShadow: '0 8px 32px #0F172Acc, 0 0 20px #3B82F622',
                minWidth: '160px',
              }}
            >
              {[
                { label: 'My Profile', path: '/profile' },
                { label: 'My Enrolled Courses', path: '/mycourses' },
              ].map(({ label, path }) => (
                <span
                  key={label}
                  className='w-full text-center px-[20px] py-[10px] rounded-xl text-[15px] font-medium cursor-pointer transition-all duration-200'
                  style={{ color: '#E2E8F0', background: 'rgba(59,130,246,0.08)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #3B82F622, #8B5CF622)';
                    e.currentTarget.style.color = '#06B6D4';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(59,130,246,0.08)';
                    e.currentTarget.style.color = '#E2E8F0';
                  }}
                  onClick={() => { navigate(path); setShow(false); }}
                >
                  {label}
                </span>
              ))}
            </div>
          }
        </div>

        {/* Hamburger icon */}
        <RxHamburgerMenu
          className='w-[32px] h-[32px] lg:hidden cursor-pointer'
          style={{ color: '#111111', filter: 'drop-shadow(0 0 6px #06B6D466)' }}
          onClick={() => setShowHam(prev => !prev)}
        />
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-[0] transition duration-600" : "translate-x-[-100%] transition duration-600"}`}
        style={{
          background: 'rgba(15,23,42,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Close */}
        <GiSplitCross
          className='w-[32px] h-[32px] absolute top-5 right-[4%] cursor-pointer'
          style={{ color: '#EF4444', filter: 'drop-shadow(0 0 6px #EF444488)' }}
          onClick={() => setShowHam(prev => !prev)}
        />

        {/* Avatar */}
        {!userData &&
          <IoPersonCircle
            className='w-[56px] h-[56px]'
            style={{ color: '#06B6D4', filter: 'drop-shadow(0 0 10px #06B6D466)' }}
          />
        }
        {userData?.photoUrl
          ? <img
              src={userData?.photoUrl}
              className='w-[56px] h-[56px] rounded-full'
              style={{ border: '2px solid #3B82F6', boxShadow: '0 0 16px #3B82F655' }}
            />
          : userData && (
            <div
              className='w-[56px] h-[56px] rounded-full flex items-center justify-center text-[20px] font-bold'
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: '#fff',
                boxShadow: '0 0 18px #8B5CF666',
              }}
            >
              {userData?.name.slice(0, 1).toUpperCase()}
            </div>
          )
        }

        {/* Mobile nav buttons */}
        {[
          { label: 'My Profile',  path: '/profile',   always: true },
          { label: 'My Enrolled Courses',  path: '/mycourses',  always: true },
          ...(userData?.role === "educator" ? [{ label: 'Dashboard', path: '/dashboard', always: true }] : []),
        ].map(({ label, path }) => (
          <div
            key={label}
            className='w-[220px] h-[56px] flex items-center justify-center rounded-[12px] text-[17px] font-medium cursor-pointer transition-all duration-200'
            style={{
              background: 'rgba(59,130,246,0.10)',
              border: '1.5px solid #3B82F644',
              color: '#E2E8F0',
              boxShadow: '0 0 10px #3B82F622',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(59,130,246,0.22)';
              e.currentTarget.style.boxShadow = '0 0 20px #3B82F655';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(59,130,246,0.10)';
              e.currentTarget.style.boxShadow = '0 0 10px #3B82F622';
            }}
            onClick={() => { navigate(path); setShowHam(false); }}
          >
            {label}
          </div>
        ))}

        {/* Login / Logout mobile */}
        {!userData
          ? <span
              className='w-[220px] h-[56px] flex items-center justify-center rounded-[12px] text-[17px] font-semibold cursor-pointer'
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                color: '#fff',
                boxShadow: '0 0 20px #3B82F666',
              }}
              onClick={() => { navigate("/login"); setShowHam(false); }}
            >
              Login
            </span>
          : <span
              className='w-[220px] h-[56px] flex items-center justify-center rounded-[12px] text-[17px] font-medium cursor-pointer'
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1.5px solid #EF444466',
                color: '#FCA5A5',
                boxShadow: '0 0 14px #EF444433',
              }}
              onClick={handleLogOut}
            >
              LogOut
            </span>
        }
      </div>
    </div>
  )
}

export default Nav