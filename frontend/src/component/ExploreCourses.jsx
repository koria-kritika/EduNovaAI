// import React from 'react'
// import { SiViaplay } from "react-icons/si";
// import { TbDeviceDesktopAnalytics } from "react-icons/tb";
// import { LiaUikit } from "react-icons/lia";
// import { MdAppShortcut } from "react-icons/md";
// import { FaHackerrank } from "react-icons/fa";
// import { AiFillOpenAI } from "react-icons/ai";
// import { SiGoogledataproc } from "react-icons/si";
// import { BsClipboardData } from "react-icons/bs";
// import { SiOpenaigym } from "react-icons/si";
// import { useNavigate } from 'react-router-dom';
// function ExploreCourses() {
//   const navigate = useNavigate()
//   return (
//     <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
//       {/* left/top div */}
//       <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px]  flex flex-col items-start justify-center gap-1 md:px-[40px]  px-[20px]'>

//         <span className='text-[35px] font-semibold'>Explore</span>
//         <span className='text-[35px] font-semibold'>Our Courses</span>
//         <p className='text-[17px]'>Explore industry-ready courses designed to boost your skills and career growth.
// Learn smarter with interactive, AI-powered education tailored for the future.</p>
//         <button className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer' onClick={()=>navigate("/allcourses")}>Explore Courses <SiViaplay className='w-[30px] h-[30px] fill-white ' /></button>
//       </div>

//       {/* right/bottom div */}
//       <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
//        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '>
//          <TbDeviceDesktopAnalytics  className='w-[60px] h-[60px] text-[#6d6c6c]'/>
//         </div>
//         Web Dev
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center justify-center '>
//          <LiaUikit  className='w-[60px] h-[60px] text-[#6d6c6c]'/>
//         </div>
//         UI/UX Designing
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center '>
//          <MdAppShortcut  className='w-[50px] h-[50px] text-[#6d6c6c]'/>
//         </div>
//         App dev
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '>
//          <FaHackerrank  className='w-[55px] h-[55px] text-[#6d6c6c]'/>
//         </div>
//         Ethical Hacking
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#d9fbe0]  rounded-lg flex items-center justify-center '>
//          <AiFillOpenAI  className='w-[60px] h-[60px] text-[#6d6c6c]'/>
//         </div>
//         AI/ML
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center '>
//          <SiGoogledataproc  className='w-[50px] h-[50px] text-[#6d6c6c]'/>
//         </div>
//         Data Science
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '>
//          <BsClipboardData  className='w-[50px] h-[50px] text-[#6d6c6c]'/>
//         </div>
//         Data Analytics
//         </div>

//         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
//         <div className='w-[100px] h-[90px] bg-[#d9fbe0]   rounded-lg flex items-center justify-center '>
//          <SiOpenaigym  className='w-[50px] h-[50px] text-[#6d6c6c]'/>
//         </div>
//         AI Tools
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ExploreCourses

import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const courseItems = [
  { icon: TbDeviceDesktopAnalytics, label: 'Web Dev',        gradient: 'linear-gradient(135deg, #3B82F620, #06B6D430)', glow: '#3B82F6', iconColor: '#06B6D4' },
  { icon: LiaUikit,                 label: 'UI/UX Designing', gradient: 'linear-gradient(135deg, #8B5CF620, #3B82F630)', glow: '#8B5CF6', iconColor: '#8B5CF6' },
  { icon: MdAppShortcut,            label: 'App Dev',         gradient: 'linear-gradient(135deg, #06B6D420, #8B5CF630)', glow: '#06B6D4', iconColor: '#3B82F6' },
  { icon: FaHackerrank,             label: 'Ethical Hacking', gradient: 'linear-gradient(135deg, #3B82F620, #06B6D430)', glow: '#3B82F6', iconColor: '#06B6D4' },
  { icon: AiFillOpenAI,             label: 'AI/ML',           gradient: 'linear-gradient(135deg, #8B5CF620, #3B82F630)', glow: '#8B5CF6', iconColor: '#8B5CF6' },
  { icon: SiGoogledataproc,         label: 'Data Science',    gradient: 'linear-gradient(135deg, #06B6D420, #8B5CF630)', glow: '#06B6D4', iconColor: '#3B82F6' },
  { icon: BsClipboardData,          label: 'Data Analytics',  gradient: 'linear-gradient(135deg, #3B82F620, #06B6D430)', glow: '#3B82F6', iconColor: '#06B6D4' },
  { icon: SiOpenaigym,              label: 'AI Tools',        gradient: 'linear-gradient(135deg, #8B5CF620, #3B82F630)', glow: '#8B5CF6', iconColor: '#8B5CF6' },
];

function ExploreCourses() {
  const navigate = useNavigate()

  return (
    <div
      className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'
      style={{ background: 'linear-gradient(180deg, #E9D8FD, 0%, #111827 100%)' }}
    >
      {/* Left / Top */}
      <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>

        <span
          className='text-[35px] font-semibold leading-tight'
          style={{
            background: 'linear-gradient(90deg, #E2E8F0, #06B6D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Explore
        </span>
        <span
          className='text-[35px] font-semibold leading-tight'
          style={{
            background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 12px #8B5CF666)',
          }}
        >
          Our Courses
        </span>

        <p className='text-[17px] mt-1' style={{ color: '#E2E8F0', lineHeight: '1.6' }}>
          Explore industry-ready courses designed to boost your skills and career growth.
          Learn smarter with interactive, AI-powered education tailored for the future.
        </p>

        <button
          onClick={() => navigate("/allcourses")}
          className='px-[20px] py-[10px] rounded-[10px] text-[18px] font-semibold flex gap-2 mt-[40px] cursor-pointer items-center transition-all duration-300'
          style={{
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 0 18px #3B82F655, 0 4px 20px #8B5CF644',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 30px #3B82F688, 0 4px 28px #8B5CF666';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 18px #3B82F655, 0 4px 20px #8B5CF644';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Explore Courses <SiViaplay className='w-[24px] h-[24px]' style={{ fill: '#fff' }} />
        </button>
      </div>

      {/* Right / Bottom — course icons */}
      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]'>
        {courseItems.map(({ icon: Icon, label, gradient, glow, iconColor }) => (
          <div
            key={label}
            className='w-[100px] h-[130px] flex flex-col gap-3 text-center items-center cursor-pointer group'
          >
            <div
              className='w-[100px] h-[90px] rounded-xl flex items-center justify-center transition-all duration-300'
              style={{
                background: gradient,
                border: `1px solid ${glow}44`,
                boxShadow: `0 0 12px ${glow}22`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 0 24px ${glow}88, inset 0 0 12px ${glow}22`;
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 0 12px ${glow}22`;
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <Icon className='w-[55px] h-[55px] transition-all duration-300' style={{ color: iconColor }} />
            </div>
            <span
              className='text-[13px] font-medium leading-tight'
              style={{ color: '#94A3B8' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreCourses