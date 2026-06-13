// import React from 'react'
// import logo from "../assets/logo.jpg"
// import { useNavigate } from 'react-router-dom'

// function Footer() {
//   const navigate = useNavigate()

//   return (
//     <div
//       style={{
//         background: 'linear-gradient(180deg, #444444 0%, #0F172A 100%)',
//         borderTop: '1px solid #3B82F622',
//         boxShadow: '0 -4px 40px #3B82F611',
//       }}
//       className='text-gray-300 py-10 px-6'
//     >
//       <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>

//         {/* Brand */}
//         <div className='lg:w-[40%] md:w-[50%] w-[100%]'>
//           <img
//             src={logo}
//             alt=""
//             className='h-10 mb-3 rounded-[50px]'
//             style={{
//               border: '1px solid #3B82F644',
//               boxShadow: '0 0 12px #3B82F633',
//             }}
//           />
//           <h2
//             className='text-xl font-bold mb-3'
//             style={{
//               background: 'linear-gradient(90deg, #E2E8F0, #06B6D4)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             EduNovaAI Courses
//           </h2>
//           <p className='text-lg leading-relaxed' style={{ color: '#94A3B8' }}>
//             AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div className='lg:w-[30%] md:w-[100%]'>
//           <div
//             className='font-semibold mb-3 text-[15px]'
//             style={{
//               background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Quick Links
//           </div>
//           <ul className='text-sm space-y-2'>
//             {[
//               { label: 'Home',       path: '/' },
//               { label: 'All Courses', path: '/allcourses' },
//               { label: 'Login',      path: '/login' },
//               { label: 'My Profile', path: '/profile' },
//             ].map(({ label, path }) => (
//               <li
//                 key={label}
//                 onClick={() => navigate(path)}
//                 className='cursor-pointer transition-all duration-200 flex items-center gap-2 group'
//                 style={{ color: '#94A3B8' }}
//                 onMouseEnter={e => {
//                   e.currentTarget.style.color = '#06B6D4';
//                   e.currentTarget.style.paddingLeft = '6px';
//                 }}
//                 onMouseLeave={e => {
//                   e.currentTarget.style.color = '#94A3B8';
//                   e.currentTarget.style.paddingLeft = '0px';
//                 }}
//               >
//                 <span
//                   className='inline-block w-[5px] h-[5px] rounded-full flex-shrink-0'
//                   style={{ background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }}
//                 />
//                 {label}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Categories */}
//         <div className='lg:w-[30%] md:w-[100%]'>
//           <div
//             className='font-semibold mb-3 text-[15px]'
//             style={{
//               background: 'linear-gradient(90deg, #06B6D4, #8B5CF6)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text',
//             }}
//           >
//             Categories
//           </div>
//           <ul className='text-sm space-y-2'>
//             {['Web Development', 'App Development', 'AI/ML', 'UI/UX Designing'].map((cat) => (
//               <li
//                 key={cat}
//                 className='transition-all duration-200 flex items-center gap-2'
//                 style={{ color: '#94A3B8' }}
//                 onMouseEnter={e => {
//                   e.currentTarget.style.color = '#8B5CF6';
//                   e.currentTarget.style.paddingLeft = '6px';
//                 }}
//                 onMouseLeave={e => {
//                   e.currentTarget.style.color = '#94A3B8';
//                   e.currentTarget.style.paddingLeft = '0px';
//                 }}
//               >
//                 <span
//                   className='inline-block w-[5px] h-[5px] rounded-full flex-shrink-0'
//                   style={{ background: '#8B5CF6', boxShadow: '0 0 6px #8B5CF6' }}
//                 />
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </div>

//       </div>

//       {/* Bottom bar */}
//       <div
//         className='mt-10 pt-5 text-sm text-center'
//         style={{
//           borderTop: '1px solid #1E293B',
//           color: '#94A3B8',
//         }}
//       >
//         <span>© {new Date().getFullYear()} </span>
//         <span
//           style={{
//             background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             fontWeight: '600',
//           }}
//         >
//           EduNovaAI
//         </span>
//         <span>. All rights reserved.</span>
//       </div>
//     </div>
//   )
// }

// export default Footer

import React from 'react'
import logo from "../assets/logo.jpg"
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        /* Premium Bright Glass base layout blending softly into your landing page identity */
        background: 'linear-gradient(180deg, rgba(243, 232, 255, 0.4) 0%, rgba(255, 255, 255, 0.9) 100%)',
        borderTop: '1px solid rgba(78, 91, 242, 0.08)',
        boxShadow: '0 -10px 40px rgba(14, 27, 77, 0.02)',
      }}
      className='py-16 px-6 md:px-12 w-full flex flex-col items-center justify-center'
    >
      {/* Expanded Max-Width Flex Container */}
      <div className='w-full max-w-[1400px] flex lg:flex-row flex-col justify-between items-start gap-12 lg:gap-8 pb-12'>

        {/* Brand Column */}
        <div className='lg:w-[38%] md:w-[60%] w-full space-y-4'>
          <img
            src={logo}
            alt="EduNovaAI Logo"
            className='h-12 w-12 object-cover rounded-full transition-transform duration-300 hover:scale-105'
            style={{
              border: '2px solid rgba(78, 91, 242, 0.15)',
              boxShadow: '0 4px 14px rgba(78, 91, 242, 0.08)',
            }}
          />
          <h2
            className='text-2xl font-black tracking-tight'
            style={{
              background: 'linear-gradient(90deg, #4E5BF2, #6C5CE7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EduNovaAI Courses
          </h2>
          <p className='text-[16px] font-semibold leading-relaxed text-[#5F6C85]'>
            AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className='lg:w-[22%] w-full space-y-4'>
          <div
            className='font-black text-[16px] tracking-wider uppercase'
            style={{
              background: 'linear-gradient(90deg, #4E5BF2, #6C5CE7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Quick Links
          </div>
          <ul className='space-y-3 text-[15px] font-bold'>
            {[
              { label: 'Home',         path: '/' },
              { label: 'All Courses',   path: '/allcourses' },
              { label: 'Login',         path: '/login' },
              { label: 'My Profile',    path: '/profile' },
            ].map(({ label, path }) => (
              <li
                key={label}
                onClick={() => navigate(path)}
                className='cursor-pointer transition-all duration-300 flex items-center gap-2.5'
                style={{ color: '#5F6C85' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#4E5BF2';
                  e.currentTarget.style.paddingLeft = '8px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#5F6C85';
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                <span
                  className='inline-block w-[6px] h-[6px] rounded-full'
                  style={{ background: '#4E5BF2', boxShadow: '0 0 8px rgba(78, 91, 242, 0.4)' }}
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Column */}
        <div className='lg:w-[22%] w-full space-y-4'>
          <div
            className='font-black text-[16px] tracking-wider uppercase'
            style={{
              background: 'linear-gradient(90deg, #6C5CE7, #4AD8B4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Categories
          </div>
          <ul className='space-y-3 text-[15px] font-bold'>
            {['Web Development', 'App Development', 'AI/ML', 'UI/UX Designing'].map((cat) => (
              <li
                key={cat}
                className='transition-all duration-300 flex items-center gap-2.5 cursor-default'
                style={{ color: '#5F6C85' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#6C5CE7';
                  e.currentTarget.style.paddingLeft = '8px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#5F6C85';
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                <span
                  className='inline-block w-[6px] h-[6px] rounded-full'
                  style={{ background: '#6C5CE7', boxShadow: '0 0 8px rgba(108, 92, 231, 0.4)' }}
                />
                {cat}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div
        className='w-full max-w-[1400px] pt-6 text-[15px] font-bold text-center'
        style={{
          borderTop: '1px solid rgba(14, 27, 77, 0.06)',
          color: '#5F6C85',
        }}
      >
        <span>© {new Date().getFullYear()} </span>
        <span
          style={{
            background: 'linear-gradient(90deg, #4E5BF2, #6C5CE7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          EduNovaAI
        </span>
        <span>. All rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer