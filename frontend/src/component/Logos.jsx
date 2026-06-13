// import React from 'react'
// import { MdCastForEducation } from "react-icons/md";
// import { SiOpenaccess } from "react-icons/si";
// import { FaSackDollar } from "react-icons/fa6";
// import { BiSupport } from "react-icons/bi";
// import { FaUsers } from "react-icons/fa";
// function Logos() {
//   return (
//     <div className='w-[100vw] min-h-[120px]  flex items-center justify-center flex-wrap gap-4 md:mb-[50px] '>
//       <div className='flex items-center justify-center gap-2  px-5 py-2   rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
//         <MdCastForEducation className='w-[35px] h-[35px] fill-[#03394b]' />
//         20k+ online Courses</div>

//         <div className='flex items-center justify-center gap-2  px-5 py-2   rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
//         <SiOpenaccess className='w-[35px] h-[35px] fill-[#03394b]' />
//         Lifetime Access</div>

//         <div className='flex items-center justify-center gap-2  px-5 py-2   rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
//         <FaSackDollar className='w-[35px] h-[35px] fill-[#03394b]' />
//         Value for money</div>

//         <div className='flex items-center justify-center gap-2  px-5 py-2   rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
//         <BiSupport className='w-[35px] h-[35px] fill-[#03394b]' />
//         Lifetime Support</div>

//         <div className='flex items-center justify-center gap-2  px-5 py-2   rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
//         <FaUsers className='w-[35px] h-[35px] fill-[#03394b]' />
//         Community Support</div>
//     </div>
     
    
//   )

// }

// export default Logos

import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logos() {
  return (
    // Replaced standard gray with a clean, responsive container supporting our design system
    <div className='w-[100vw] min-h-[120px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px] px-4 z-10 relative'>
      
      {/* 20k+ online Courses */}
      <div 
        className='flex items-center justify-center gap-2 px-5 py-2 rounded-3xl cursor-pointer font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95'
        style={{
          background: 'rgba(78, 91, 242, 0.05)',
          border: '1px solid rgba(78, 91, 242, 0.12)',
          color: '#0E1B4D'
        }}
      >
        <MdCastForEducation className='w-[35px] h-[35px]' style={{ fill: '#4E5BF2' }} />
        20k+ online Courses
      </div>

      {/* Lifetime Access */}
      <div 
        className='flex items-center justify-center gap-2 px-5 py-2 rounded-3xl cursor-pointer font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95'
        style={{
          background: 'rgba(78, 91, 242, 0.05)',
          border: '1px solid rgba(78, 91, 242, 0.12)',
          color: '#0E1B4D'
        }}
      >
        <SiOpenaccess className='w-[35px] h-[35px]' style={{ fill: '#4E5BF2' }} />
        Lifetime Access
      </div>

      {/* Value for money */}
      <div 
        className='flex items-center justify-center gap-2 px-5 py-2 rounded-3xl cursor-pointer font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95'
        style={{
          background: 'rgba(78, 91, 242, 0.05)',
          border: '1px solid rgba(78, 91, 242, 0.12)',
          color: '#0E1B4D'
        }}
      >
        <FaSackDollar className='w-[35px] h-[35px]' style={{ fill: '#4E5BF2' }} />
        Value for money
      </div>

      {/* Lifetime Support */}
      <div 
        className='flex items-center justify-center gap-2 px-5 py-2 rounded-3xl cursor-pointer font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95'
        style={{
          background: 'rgba(78, 91, 242, 0.05)',
          border: '1px solid rgba(78, 91, 242, 0.12)',
          color: '#0E1B4D'
        }}
      >
        <BiSupport className='w-[35px] h-[35px]' style={{ fill: '#4E5BF2' }} />
        Lifetime Support
      </div>

      {/* Community Support */}
      <div 
        className='flex items-center justify-center gap-2 px-5 py-2 rounded-3xl cursor-pointer font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95'
        style={{
          background: 'rgba(78, 91, 242, 0.05)',
          border: '1px solid rgba(78, 91, 242, 0.12)',
          color: '#0E1B4D'
        }}
      >
        <FaUsers className='w-[35px] h-[35px]' style={{ fill: '#4E5BF2' }} />
        Community Support
      </div>
    </div>
  )
}

export default Logos