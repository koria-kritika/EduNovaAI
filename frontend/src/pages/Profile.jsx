// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6";

// function Profile() {
//   const {userData} = useSelector(state=>state.user)
//   const navigate = useNavigate()
//   return (
//     <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
//       <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
//         <FaArrowLeftLong  className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
//         <div className='flex flex-col items-center text-center'>
//         {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt="" />: 
//         <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black  border-white'>
//          {userData?.name.slice(0,1).toUpperCase()}
//           </div>}

//           <h2 className='text-2xl font-bold mt-4 text-gray-800'>{userData.name}</h2>
//           <p className='text-sm text-gray-500'>{userData.role}</p>
//          </div>

//          <div className='mt-6 space-y-4'>
//            <div className='text-sm flex items-center justify-start gap-1'>
//             <span className='font-semibold text-gray-700'>Email:</span>
//             <span>{userData.email}</span>
//            </div>
//            <div className='text-sm flex items-center justify-start gap-1'>
//             <span className='font-semibold text-gray-700'>Bio:</span>
//             <span>{userData.description}</span>
//            </div>
//            <div className='text-sm flex items-center justify-start gap-1'>
//             <span className='font-semibold text-gray-700'>Enrolled Courses:</span>
//             <span>{userData.enrolledCourses.length}</span>
//            </div>
//          </div>
//          <div className='mt-6 flex justify-center gap-4'>
//           <button className='px-5 py-2 rounded bg-[black] text-white active:bg-[#4b4b4b] cursor-pointer transition' onClick={()=>navigate("/editprofile")}>
//             Edit Profile
//           </button>
//           </div>
//       </div>
      
//     </div>
//   )
// }

// export default Profile

import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaEnvelope, FaBookOpen, FaPenToSquare } from "react-icons/fa6"
import { FaAlignLeft } from "react-icons/fa"

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
      padding: '40px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        background: 'rgba(30,41,59,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: '20px',
        padding: '40px 32px',
        maxWidth: 480, width: '100%',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: 'absolute', top: 20, left: 20,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
            color: '#3B82F6', fontSize: 13, fontWeight: 600,
            fontFamily: 'inherit', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <FaArrowLeftLong style={{ width: 16, height: 16 }} /> Back
        </button>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 16 }}>
          {userData?.photoUrl
            ? <img src={userData?.photoUrl} alt=""
                style={{
                  width: 96, height: 96, borderRadius: '50%', objectFit: 'cover',
                  border: '3px solid rgba(139,92,246,0.5)',
                  boxShadow: '0 0 28px rgba(139,92,246,0.3)',
                }} />
            : <div style={{
                width: 96, height: 96, borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 34, fontWeight: 800, color: 'white',
                boxShadow: '0 0 28px rgba(139,92,246,0.35)',
                border: '3px solid rgba(139,92,246,0.4)',
              }}>
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
          }

          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#E2E8F0', margin: '16px 0 4px', letterSpacing: '-0.3px' }}>
            {userData.name}
          </h2>

          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600,
            padding: '3px 12px', borderRadius: 99,
            background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)',
            color: '#06B6D4', letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            {userData.role}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)', margin: '24px 0' }} />

        {/* Info rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {[
            { icon: <FaEnvelope style={{ color: '#3B82F6', flexShrink: 0 }} />, label: 'Email', value: userData.email },
            { icon: <FaAlignLeft style={{ color: '#8B5CF6', flexShrink: 0 }} />, label: 'Bio', value: userData.description },
            { icon: <FaBookOpen style={{ color: '#06B6D4', flexShrink: 0 }} />, label: 'Enrolled Courses', value: userData.enrolledCourses.length },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(59,130,246,0.1)',
              borderRadius: 12, padding: '12px 16px',
            }}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8', minWidth: 60 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)', margin: '24px 0' }} />

        {/* Edit button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => navigate("/editprofile")}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              color: 'white', fontSize: 14, fontWeight: 700,
              fontFamily: 'inherit', letterSpacing: '0.2px',
              boxShadow: '0 4px 18px rgba(59,130,246,0.4)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(59,130,246,0.4)' }}
          >
            <FaPenToSquare /> Edit Profile
          </button>
        </div>

      </div>
    </div>
  )
}

export default Profile



