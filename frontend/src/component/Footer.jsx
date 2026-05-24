// import React from 'react'
// import logo from "../assets/logo.jpg"
// import { useNavigate } from 'react-router-dom'
// function Footer() {
//     const navigate = useNavigate()
//   return (
//     <div className='bg-black text-gray-300 py-10 px-6'>
//       <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>

//         <div className='lg:w-[40%] md:w-[50%] w-[100%]'>
//             <img src={logo} alt="" className='h-10 mb-3 border-1 rounded-[5px]' />
//             <h2 className='text-xl font-bold text-white mb-3'>EduNovaAI Courses</h2>
//             <p className='text-sm'>AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.</p>
//         </div>

//         <div className='lg:w-[30%] md:w-[100%]'>
//             <div className='text-white font-semibold mb-2'>Quick Links</div>
//             <ul className='text-sm space-y-1'>
//                 <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/")}>Home</li>
//                 <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/allcourses")}>AllCourses</li>
//                 <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/login")}>Login</li>
//                 <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/profile")}>My Profile</li>
//             </ul>
//         </div>

//         <div className='lg:w-[30%] md:w-[100%]'>
//             <div className='text-white font-semibold mb-2'>Categories</div>
//             <ul className='text-sm space-y-1'>
//                 <li className='hover:text-white ' >Web Development</li>
//                 <li className='hover:text-white' >App Development</li>
//                 <li className='hover:text-white ' >AI/ML</li>
//                 <li className='hover:text-white ' >UI/UX Designing</li>
//             </ul>
//         </div>

//       </div>

//       <div className='border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500'>© {new Date().getFullYear()} LearnAI. All rights reserved.</div>
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
        background: 'linear-gradient(180deg, #444444 0%, #0F172A 100%)',
        borderTop: '1px solid #3B82F622',
        boxShadow: '0 -4px 40px #3B82F611',
      }}
      className='text-gray-300 py-10 px-6'
    >
      <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>

        {/* Brand */}
        <div className='lg:w-[40%] md:w-[50%] w-[100%]'>
          <img
            src={logo}
            alt=""
            className='h-10 mb-3 rounded-[50px]'
            style={{
              border: '1px solid #3B82F644',
              boxShadow: '0 0 12px #3B82F633',
            }}
          />
          <h2
            className='text-xl font-bold mb-3'
            style={{
              background: 'linear-gradient(90deg, #E2E8F0, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            EduNovaAI Courses
          </h2>
          <p className='text-lg leading-relaxed' style={{ color: '#94A3B8' }}>
            AI-powered learning platform to help you grow smarter. Learn anything, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className='lg:w-[30%] md:w-[100%]'>
          <div
            className='font-semibold mb-3 text-[15px]'
            style={{
              background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Quick Links
          </div>
          <ul className='text-sm space-y-2'>
            {[
              { label: 'Home',       path: '/' },
              { label: 'All Courses', path: '/allcourses' },
              { label: 'Login',      path: '/login' },
              { label: 'My Profile', path: '/profile' },
            ].map(({ label, path }) => (
              <li
                key={label}
                onClick={() => navigate(path)}
                className='cursor-pointer transition-all duration-200 flex items-center gap-2 group'
                style={{ color: '#94A3B8' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#06B6D4';
                  e.currentTarget.style.paddingLeft = '6px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                <span
                  className='inline-block w-[5px] h-[5px] rounded-full flex-shrink-0'
                  style={{ background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }}
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className='lg:w-[30%] md:w-[100%]'>
          <div
            className='font-semibold mb-3 text-[15px]'
            style={{
              background: 'linear-gradient(90deg, #06B6D4, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Categories
          </div>
          <ul className='text-sm space-y-2'>
            {['Web Development', 'App Development', 'AI/ML', 'UI/UX Designing'].map((cat) => (
              <li
                key={cat}
                className='transition-all duration-200 flex items-center gap-2'
                style={{ color: '#94A3B8' }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#8B5CF6';
                  e.currentTarget.style.paddingLeft = '6px';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.paddingLeft = '0px';
                }}
              >
                <span
                  className='inline-block w-[5px] h-[5px] rounded-full flex-shrink-0'
                  style={{ background: '#8B5CF6', boxShadow: '0 0 6px #8B5CF6' }}
                />
                {cat}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div
        className='mt-10 pt-5 text-sm text-center'
        style={{
          borderTop: '1px solid #1E293B',
          color: '#94A3B8',
        }}
      >
        <span>© {new Date().getFullYear()} </span>
        <span
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: '600',
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