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
      toast.success("Logout Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const navBtnBase = {
    padding: '10px 22px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  return (
    <div className='relative'>
      {/* ── Premium Light Glass Navbar ── */}
      <div
        className='w-[100%] h-[76px] fixed top-0 left-0 px-[30px] py-[10px] flex items-center justify-between z-[999]'
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(14, 27, 77, 0.02)',
        }}
      >
        {/* Logo Section */}
        <div className='lg:w-[20%] w-[40%] lg:pl-[20px] flex items-center'>
          <img
            src={logo}
            alt="Logo"
            className='w-[48px] h-[48px] object-cover rounded-full cursor-pointer transition-transform duration-300 hover:scale-105'
            style={{
              border: '2px solid rgba(78, 91, 242, 0.15)',
              boxShadow: '0 4px 12px rgba(78, 91, 242, 0.1)',
            }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Controls */}
        <div className='w-[40%] lg:flex items-center justify-end gap-5 hidden relative pr-[20px]'>
          
          {userData?.role === "educator" &&
            <div
              style={{
                ...navBtnBase,
                background: 'rgba(108, 92, 231, 0.06)',
                border: '1px solid rgba(108, 92, 231, 0.15)',
                color: '#6C5CE7',
              }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </div>
          }

          {/* User Profile Avatar Hook */}
          <div className='relative flex items-center'>
            {!userData ? (
              <IoPersonCircle
                className='w-[42px] h-[42px] cursor-pointer text-[#4E5BF2] hover:scale-105 transition-transform'
                onClick={() => setShow(prev => !prev)}
              />
            ) : (
              <div
                className='w-[40px] h-[40px] rounded-full flex items-center justify-center text-[14px] font-bold cursor-pointer text-white shadow-sm'
                style={{ background: 'linear-gradient(135deg, #4E5BF2, #6C5CE7)' }}
                onClick={() => setShow(prev => !prev)}
              >
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          {/* Login / Logout Action Button */}
          {!userData ? (
            <button
              style={{
                ...navBtnBase,
                background: 'linear-gradient(135deg, #4E5BF2 0%, #6C5CE7 100%)',
                color: '#fff',
                border: 'none',
                boxShadow: '0 4px 14px rgba(78, 91, 242, 0.25)',
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <button
              style={{
                ...navBtnBase,
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
              }}
              onClick={handleLogOut}
            >
              Log Out
            </button>
          )}

          {/* Dropdown Menu Overlay */}
          {show && (
            <div
              className='absolute top-[125%] right-[20px] flex flex-col gap-1 rounded-2xl p-2 bg-white'
              style={{
                border: '1px solid rgba(14, 27, 77, 0.08)',
                boxShadow: '0 12px 30px rgba(14, 27, 77, 0.1)',
                minWidth: '190px',
              }}
            >
              {[
                { label: 'My Profile', path: '/profile' },
                { label: 'My Enrolled Courses', path: '/mycourses' },
              ].map(({ label, path }) => (
                <span
                  key={label}
                  className='w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-semibold cursor-pointer transition-colors text-[#0E1B4D] hover:bg-[#4E5BF2]/5 hover:text-[#4E5BF2]'
                  onClick={() => { navigate(path); setShow(false); }}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Hamburger icon */}
        <div className='lg:hidden flex items-center pr-1'>
          <RxHamburgerMenu
            className='w-[28px] h-[28px] cursor-pointer text-[#0E1B4D]'
            onClick={() => setShowHam(prev => !prev)}
          />
        </div>

        {/* ── Custom Lower Line Shaded Gradient Margin ── */}
        <div 
          className='absolute bottom-0 left-0 w-full h-[2px]' 
          style={{
            background: 'linear-gradient(90deg, rgba(167, 139, 250, 0.8) 0%, rgba(254, 215, 170, 0.9) 50%, rgba(110, 231, 183, 0.8) 100%)',
            boxShadow: '0 1px 6px rgba(167, 139, 250, 0.2)'
          }}
        />
      </div>

      {/* ── Mobile Responsive Overlay Menu ── */}
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-6 z-[1000] lg:hidden transition-all duration-500 ease-in-out ${
          showHam ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
        }`}
        style={{
          background: '#ff23670d',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
        }}
      >
        <GiSplitCross className='w-[26px] h-[26px] absolute top-6 right-[6%] cursor-pointer text-black-400' onClick={() => setShowHam(false)} />
        
        {[
          { label: 'My Profile', path: '/profile' },
          { label: 'My Enrolled Courses', path: '/mycourses' },
          ...(userData?.role === "educator" ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
        ].map(({ label, path }) => (
          <div
            key={label}
            className='border border-[#0E1B4D]/20 w-[260px] py-3.5 flex items-center justify-center rounded-xl text-[16px] font-bold cursor-pointer bg-[#0E1B4E]/5 text-[#0c30c0] transition-colors duration-300 hover:bg-[#0E1B4E]/10 hover:text-[#0E1B4D]'
            onClick={() => { navigate(path); setShowHam(false); }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nav