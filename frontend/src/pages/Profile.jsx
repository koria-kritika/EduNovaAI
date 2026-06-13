

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6"
// import { FaEnvelope, FaBookOpen, FaPenToSquare } from "react-icons/fa6"
// import { FaAlignLeft } from "react-icons/fa"

// function Profile() {
//   const { userData } = useSelector(state => state.user)
//   const navigate = useNavigate()

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
//       padding: '40px 16px',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       fontFamily: "'Plus Jakarta Sans', sans-serif",
//     }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

//       {/* Ambient blobs */}
//       <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
//         <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
//       </div>

//       <div style={{
//         position: 'relative', zIndex: 1,
//         background: 'rgba(30,41,59,0.75)',
//         backdropFilter: 'blur(20px)',
//         WebkitBackdropFilter: 'blur(20px)',
//         border: '1px solid rgba(59,130,246,0.15)',
//         borderRadius: '20px',
//         padding: '40px 32px',
//         maxWidth: 480, width: '100%',
//         boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
//       }}>

//         {/* Back button */}
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             position: 'absolute', top: 20, left: 20,
//             display: 'inline-flex', alignItems: 'center', gap: 6,
//             background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
//             borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
//             color: '#3B82F6', fontSize: 13, fontWeight: 600,
//             fontFamily: 'inherit', transition: 'all 0.2s',
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.3)' }}
//           onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
//         >
//           <FaArrowLeftLong style={{ width: 16, height: 16 }} /> Back
//         </button>

//         {/* Avatar */}
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 16 }}>
//           {userData?.photoUrl
//             ? <img src={userData?.photoUrl} alt=""
//                 style={{
//                   width: 96, height: 96, borderRadius: '50%', objectFit: 'cover',
//                   border: '3px solid rgba(139,92,246,0.5)',
//                   boxShadow: '0 0 28px rgba(139,92,246,0.3)',
//                 }} />
//             : <div style={{
//                 width: 96, height: 96, borderRadius: '50%',
//                 background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 34, fontWeight: 800, color: 'white',
//                 boxShadow: '0 0 28px rgba(139,92,246,0.35)',
//                 border: '3px solid rgba(139,92,246,0.4)',
//               }}>
//                 {userData?.name.slice(0, 1).toUpperCase()}
//               </div>
//           }

//           <h2 style={{ fontSize: 22, fontWeight: 800, color: '#E2E8F0', margin: '16px 0 4px', letterSpacing: '-0.3px' }}>
//             {userData.name}
//           </h2>

//           <span style={{
//             display: 'inline-block', fontSize: 11, fontWeight: 600,
//             padding: '3px 12px', borderRadius: 99,
//             background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.3)',
//             color: '#06B6D4', letterSpacing: '0.5px', textTransform: 'uppercase',
//           }}>
//             {userData.role}
//           </span>
//         </div>

//         {/* Divider */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)', margin: '24px 0' }} />

//         {/* Info rows */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

//           {[
//             { icon: <FaEnvelope style={{ color: '#3B82F6', flexShrink: 0 }} />, label: 'Email', value: userData.email },
//             { icon: <FaAlignLeft style={{ color: '#8B5CF6', flexShrink: 0 }} />, label: 'Bio', value: userData.description },
//             { icon: <FaBookOpen style={{ color: '#06B6D4', flexShrink: 0 }} />, label: 'Enrolled Courses', value: userData.enrolledCourses.length },
//           ].map(({ icon, label, value }) => (
//             <div key={label} style={{
//               display: 'flex', alignItems: 'center', gap: 12,
//               background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(59,130,246,0.1)',
//               borderRadius: 12, padding: '12px 16px',
//             }}>
//               <span style={{ fontSize: 15 }}>{icon}</span>
//               <span style={{ fontSize: 13, fontWeight: 600, color: '#94A3B8', minWidth: 60 }}>{label}</span>
//               <span style={{ fontSize: 13, color: '#E2E8F0', fontWeight: 500 }}>{value}</span>
//             </div>
//           ))}
//         </div>

//         {/* Divider */}
//         <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.25), transparent)', margin: '24px 0' }} />

//         {/* Edit button */}
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <button
//             onClick={() => navigate("/editprofile")}
//             style={{
//               display: 'inline-flex', alignItems: 'center', gap: 8,
//               padding: '12px 28px', borderRadius: 12, border: 'none', cursor: 'pointer',
//               background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
//               color: 'white', fontSize: 14, fontWeight: 700,
//               fontFamily: 'inherit', letterSpacing: '0.2px',
//               boxShadow: '0 4px 18px rgba(59,130,246,0.4)',
//               transition: 'all 0.2s',
//             }}
//             onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.55)' }}
//             onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(59,130,246,0.4)' }}
//           >
//             <FaPenToSquare /> Edit Profile
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Profile


import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong, FaEnvelope, FaBookOpen, FaPenToSquare, FaAlignLeft } from "react-icons/fa6"

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F3E8FF 0%, #E8F5E9 100%)',
      padding: '40px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');`}</style>
      
      {/* Profile Card */}
      <div style={{
        background: '#ff23670d',
        border: '5px solid rgba(255,35,103,0.15)',
        borderRadius: '40px',
        padding: '50px 40px',
        maxWidth: 550, width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: 'absolute', top: 30, left: 30,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#F3F4F6', border: 'none',
            borderRadius: 50, padding: '12px 20px', cursor: 'pointer',
            color: '#6C5CE7', fontSize: 14, fontWeight: 700,
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
          onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
        >
          <FaArrowLeftLong /> Back
        </button>

        {/* Avatar Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: 20 }}>
          {userData?.photoUrl
            ? <img src={userData?.photoUrl} alt=""
                style={{
                  width: 130, height: 130, borderRadius: '35px', objectFit: 'cover',
                  boxShadow: '0 15px 30px rgba(108,92,231,0.25)',
                }} />
            : <div style={{
                width: 130, height: 130, borderRadius: '35px',
                background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 50, fontWeight: 800, color: 'white',
                boxShadow: '0 15px 30px rgba(108,92,231,0.25)',
              }}>
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
          }

          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1E293B', margin: '25px 0 8px' }}>
            {userData?.name}
          </h2>

          <span style={{
            fontSize: 14, fontWeight: 700, color: '#6C5CE7',
            background: '#F0EFFF', padding: '6px 20px', borderRadius: 12,
            textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            {userData?.role}
          </span>
        </div>

        {/* Info rows */}
        <div style={{ marginTop: 45, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: <FaEnvelope />, label: 'Email Address', value: userData?.email },
            { icon: <FaAlignLeft />, label: 'About', value: userData?.description || "No bio added" },
            { icon: <FaBookOpen />, label: 'Courses Enrolled', value: `${userData?.enrolledCourses?.length || 0} Total Courses` },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: 20,
              background: '#F9FAFB', borderRadius: 20, padding: '20px 24px',
            }}>
              <div style={{ color: '#6C5CE7', fontSize: 22 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                <div style={{ fontSize: 17, color: '#334155', fontWeight: 600, marginTop: 4 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => navigate("/editprofile")}
          style={{
            marginTop: 45, width: '100%', padding: '20px',
            borderRadius: 20, border: 'none', cursor: 'pointer',
            background: '#6C1CE7', color: 'white',
            fontSize: 19, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            transition: 'all 0.3s',
            boxShadow: '0 10px 20px -5px rgba(108,92,231,0.5)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <FaPenToSquare /> Edit Profile Details
        </button>

      </div>
    </div>
  )
}

export default Profile
