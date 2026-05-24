// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6";
// function MyEnrolledCourses() {
//     const {userData} = useSelector(state=>state.user)
//     const navigate = useNavigate()
//   return (
//     <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
//        <FaArrowLeftLong className='absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>
//         <h1 className='text-3xl text-center font-bold text-gray-800 mb-6 '>My Enrolled Courses</h1>

//         {
//             userData?.enrolledCourses?.length === 0 ? (
//                 <p className='text-gray-500 text-center w-full'>
//                     You haven’t enrolled in any course yet.
//                 </p>
//             ) : (
//                 <div className='flex items-center justify-center flex-wrap gap-[30px]'>
//                     {userData?.enrolledCourses?.map((course,index)=>(
//                         <div key={index} className='bg-white rounded-2xl shadow-md overflow-hidden border'>
//                             <img src={course?.thumbnail} alt="" className='w-full h-40 object-cover' />
//                             <div className='p-4'>
//                                 <h2 className='text-lg font-semibold text-gray-800'>{course?.title}</h2>
//                                 <p className='text-sm text-gray-600 mb-2'>{course?.category}</p>
//                                 <p className='text-sm text-gray-600 mb-2'>{course?.level}</p>
//                                 <h1 className='px-[10px] text-center  py-[10px] border-2  bg-black border-black text-white  rounded-[10px] text-[15px] font-light cursor-pointer mt-[10px] hover:bg-gray-600' onClick={()=>navigate(`/viewlecture/${course._id}`)}>Watch Now</h1>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )
//         }
      
//     </div>
//   )
// }

// export default MyEnrolledCourses
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaPlayCircle, FaLayerGroup } from "react-icons/fa"
import { FaSignal } from "react-icons/fa6"

function MyEnrolledCourses() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
      padding: '36px 16px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: 'absolute', top: 24, left: 24, zIndex: 10,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
          borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
          color: '#3B82F6', fontSize: 13, fontWeight: 600,
          fontFamily: 'inherit', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.3)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <FaArrowLeftLong style={{ width: 15, height: 15 }} /> Back
      </button>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 36, marginTop: 16, position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #E2E8F0, #94A3B8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: 0,
        }}>
          My Enrolled Courses
        </h1>
        <div style={{ height: 3, width: 60, borderRadius: 99, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', margin: '10px auto 0' }} />
      </div>

      {/* Empty state */}
      {userData?.enrolledCourses?.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          marginTop: 80, gap: 12, position: 'relative', zIndex: 1,
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FaLayerGroup style={{ fontSize: 28, color: '#3B82F6' }} />
          </div>
          <p style={{ color: '#94A3B8', fontSize: 19, fontWeight: 500, margin: 0 }}>
            You haven't enrolled in any course yet.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 24,
          justifyContent: 'center', alignItems: 'flex-start',
          position: 'relative', zIndex: 1,
        }}>
          {userData?.enrolledCourses?.map((course, index) => (
            <div key={index} style={{
              width: 280,
              background: 'rgba(30,41,59,0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(59,130,246,0.15)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(59,130,246,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative', overflow: 'hidden', height: 160 }}>
                <img src={course?.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15,23,42,0.7) 0%, transparent 60%)',
                }} />
              </div>

              {/* Card body */}
              <div style={{ padding: '16px' }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0', margin: '0 0 10px', lineHeight: 1.4 }}>
                  {course?.title}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <FaLayerGroup style={{ color: '#8B5CF6', fontSize: 12, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{course?.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <FaSignal style={{ color: '#06B6D4', fontSize: 12, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{course?.level}</span>
                  </div>
                </div>

                {/* Watch Now button */}
                <button
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  style={{
                    width: '100%', padding: '10px 0',
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    border: 'none', borderRadius: 10, cursor: 'pointer',
                    color: 'white', fontSize: 13, fontWeight: 700,
                    fontFamily: 'inherit', letterSpacing: '0.2px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 22px rgba(59,130,246,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(59,130,246,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <FaPlayCircle style={{ fontSize: 15 }} /> Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEnrolledCourses