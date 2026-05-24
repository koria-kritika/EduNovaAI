
// import React from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import img from "../../assets/empty.jpg"
// import { FaEdit } from "react-icons/fa";
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { serverUrl } from '../../App';
// import axios from 'axios';
// import { setCreatorCourseData } from '../../redux/courseSlice';

// function Courses() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { userData } = useSelector(state => state.user)
//   const { creatorCourseData } = useSelector(state => state.course)

//   useEffect(() => {
//     const creatorCourses = async () => {
//       try {
//         const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true })
//         dispatch(setCreatorCourseData(result.data))
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     creatorCourses()
//   }, [userData])

//   return (
//     <div className='flex min-h-screen relative overflow-hidden' style={{ background: '#0F172A' }}>

//       {/* glow orbs */}
//       <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />
//       <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />

//       <div className='w-full min-h-screen p-4 sm:p-8 relative z-[1]'>

//         {/* ── Header ── */}
//         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
//           <div className='flex items-center gap-4'>
//             <button
//               className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300'
//               style={{
//                 background: 'rgba(59,130,246,0.1)',
//                 border: '1px solid rgba(59,130,246,0.3)',
//               }}
//               onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
//               onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
//               onClick={() => navigate("/dashboard")}
//             >
//               <FaArrowLeftLong className='text-[#3B82F6] w-3.5 h-3.5' />
//             </button>

//             <div>
//               <div className='flex items-center gap-2'>
//                 <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
//                 <h1 className='text-2xl font-bold' style={{
//                   background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   backgroundClip: 'text',
//                 }}>
//                   All Created Courses
//                 </h1>
//               </div>
//               <p className='text-sm text-[#94A3B8] pl-3 mt-0.5'>
//                 {creatorCourseData?.length || 0} course{creatorCourseData?.length !== 1 ? 's' : ''} total
//               </p>
//             </div>
//           </div>

//           <button
//             className='px-5 py-2.5 rounded-xl text-base font-semibold transition-all duration-300'
//             style={{
//               background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
//               color: '#fff',
//               boxShadow: '0 0 16px rgba(59,130,246,0.4)',
//             }}
//             onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px rgba(139,92,246,0.6)'}
//             onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.4)'}
//             onClick={() => navigate("/createcourse")}
//           >
//             + Create Course
//           </button>
//         </div>

//         {/* ── Desktop Table ── */}
//         <div
//           className='hidden md:block rounded-2xl overflow-hidden'
//           style={{
//             background: '#111827',
//             border: '1px solid rgba(59,130,246,0.15)',
//             boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
//           }}
//         >
//           <table className='min-w-full'>
//             <thead>
//               <tr style={{ borderBottom: '1px solid rgba(59,130,246,0.1)', background: 'rgba(59,130,246,0.05)' }}>
//                 {['Course', 'Price', 'Status', 'Action'].map(h => (
//                   <th
//                     key={h}
//                     className='text-left py-4 px-5 text-sm font-bold uppercase tracking-widest'
//                     style={{ color: '#94A3B8' }}
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {creatorCourseData?.map((course, index) => (
//                 <tr
//                   key={index}
//                   className='transition-all duration-200 group'
//                   style={{ borderBottom: '1px solid rgba(59,130,246,0.06)' }}
//                   onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.04)'}
//                   onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
//                 >
//                   {/* course thumbnail + title */}
//                   <td className='py-4 px-5'>
//                     <div className='flex items-center gap-4'>
//                       <div className='relative flex-shrink-0'>
//                         <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[6px] opacity-30' />
//                         <img
//                           src={course?.thumbnail || img}
//                           className='w-20 h-12 object-cover rounded-lg relative z-10'
//                           style={{ border: '1px solid rgba(59,130,246,0.2)' }}
//                           alt=""
//                         />
//                       </div>
//                       <span className='text-base font-medium' style={{ color: '#E2E8F0' }}>
//                         {course?.title}
//                       </span>
//                     </div>
//                   </td>

//                   {/* price */}
//                   <td className='px-5 py-4'>
//                     <span className='text-base font-semibold' style={{ color: '#06B6D4' }}>
//                       {course?.price ? `₹${course.price}` : '—'}
//                     </span>
//                   </td>

//                   {/* status */}
//                   <td className='px-5 py-4'>
//                     <span
//                       className='px-3 py-1 rounded-full text-sm font-semibold'
//                       style={{
//                         background: course?.isPublished
//                           ? 'rgba(34,197,94,0.1)'
//                           : 'rgba(239,68,68,0.1)',
//                         border: course?.isPublished
//                           ? '1px solid rgba(34,197,94,0.3)'
//                           : '1px solid rgba(239,68,68,0.3)',
//                         color: course?.isPublished ? '#4ADE80' : '#F87171',
//                       }}
//                     >
//                       {course?.isPublished ? '● Published' : '● Draft'}
//                     </span>
//                   </td>

//                   {/* action */}
//                   <td className='px-5 py-4'>
//                     <button
//                       className='flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200'
//                       style={{
//                         background: 'rgba(59,130,246,0.08)',
//                         border: '1px solid rgba(59,130,246,0.2)',
//                         color: '#3B82F6',
//                       }}
//                       onMouseEnter={e => {
//                         e.currentTarget.style.background = 'rgba(59,130,246,0.18)'
//                         e.currentTarget.style.boxShadow = '0 0 10px rgba(59,130,246,0.3)'
//                       }}
//                       onMouseLeave={e => {
//                         e.currentTarget.style.background = 'rgba(59,130,246,0.08)'
//                         e.currentTarget.style.boxShadow = 'none'
//                       }}
//                       onClick={() => navigate(`/editcourse/${course?._id}`)}
//                     >
//                       <FaEdit className='w-3.5 h-3.5' />
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* empty state */}
//           {(!creatorCourseData || creatorCourseData.length === 0) && (
//             <div className='flex flex-col items-center justify-center py-16 gap-3'>
//               <div className='text-5xl'></div>
//               <p className='text-lg font-semibold text-[#E2E8F0]'>No courses yet</p>
//               <p className='text-base text-[#94A3B8]'>Create your first course to get started</p>
//             </div>
//           )}

//           <div
//             className='px-5 py-3 text-sm text-center'
//             style={{
//               color: '#94A3B8',
//               borderTop: '1px solid rgba(59,130,246,0.06)',
//             }}
//           >
//             A list of your recent courses
//           </div>
//         </div>

//         {/* ── Mobile Cards ── */}
//         <div className='md:hidden space-y-4'>
//           {creatorCourseData?.map((course, index) => (
//             <div
//               key={index}
//               className='rounded-2xl p-4 flex flex-col gap-3'
//               style={{
//                 background: '#111827',
//                 border: '1px solid rgba(59,130,246,0.15)',
//                 boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
//               }}
//             >
//               <div className='flex gap-4 items-center'>
//                 <div className='relative flex-shrink-0'>
//                   <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[5px] opacity-25' />
//                   <img
//                     src={course?.thumbnail || img}
//                     alt=""
//                     className='w-16 h-16 rounded-lg object-cover relative z-10'
//                     style={{ border: '1px solid rgba(59,130,246,0.2)' }}
//                   />
//                 </div>
//                 <div className='flex-1 min-w-0'>
//                   <h2 className='text-base font-semibold truncate' style={{ color: '#E2E8F0' }}>
//                     {course.title}
//                   </h2>
//                   <p className='text-base font-semibold mt-1' style={{ color: '#06B6D4' }}>
//                     {course?.price ? `₹${course.price}` : '—'}
//                   </p>
//                 </div>
//                 <button
//                   className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex-shrink-0'
//                   style={{
//                     background: 'rgba(59,130,246,0.08)',
//                     border: '1px solid rgba(59,130,246,0.2)',
//                     color: '#3B82F6',
//                   }}
//                   onClick={() => navigate(`/editcourse/${course?._id}`)}
//                 >
//                   <FaEdit className='w-3 h-3' />
//                   Edit
//                 </button>
//               </div>

//               <span
//                 className='w-fit px-3 py-1 text-sm font-semibold rounded-full'
//                 style={{
//                   background: course?.isPublished ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
//                   border: course?.isPublished ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)',
//                   color: course?.isPublished ? '#4ADE80' : '#F87171',
//                 }}
//               >
//                 {course?.isPublished ? '● Published' : '● Draft'}
//               </span>
//             </div>
//           ))}

//           {(!creatorCourseData || creatorCourseData.length === 0) && (
//             <div className='flex flex-col items-center justify-center py-16 gap-3'>
//               <p className='text-lg font-semibold text-[#E2E8F0]'>No courses yet</p>
//               <p className='text-base text-[#94A3B8]'>Create your first course to get started</p>
//             </div>
//           )}

//           <p className='text-center text-sm text-[#94A3B8] mt-2'>
//             A list of your recent courses
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Courses
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { serverUrl } from '../../App';
import axios from 'axios';
import { setCreatorCourseData } from '../../redux/courseSlice';

function Courses() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreator", { withCredentials: true })
        dispatch(setCreatorCourseData(Array.isArray(result.data) ? result.data : []))
      } catch (error) {
        console.log(error)
      }
    }
    creatorCourses()
  }, [userData])

  const safeData = Array.isArray(creatorCourseData) ? creatorCourseData : []

  return (
    <div className='flex min-h-screen relative overflow-hidden' style={{ background: '#0F172A' }}>

      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />

      <div className='w-full min-h-screen p-4 sm:p-8 relative z-[1]'>

        {/* Header */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
          <div className='flex items-center gap-4'>
            <button
              className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300'
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
              onClick={() => navigate("/dashboard")}
            >
              <FaArrowLeftLong className='text-[#3B82F6] w-3.5 h-3.5' />
            </button>

            <div>
              <div className='flex items-center gap-2'>
                <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
                <h1 className='text-2xl font-bold' style={{
                  background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  All Created Courses
                </h1>
              </div>
              <p className='text-sm text-[#94A3B8] pl-3 mt-0.5'>
                {safeData.length} course{safeData.length !== 1 ? 's' : ''} total
              </p>
            </div>
          </div>

          <button
            className='px-5 py-2.5 rounded-xl text-base font-semibold transition-all duration-300'
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              color: '#fff', boxShadow: '0 0 16px rgba(59,130,246,0.4)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px rgba(139,92,246,0.6)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.4)'}
            onClick={() => navigate("/createcourse")}
          >
            + Create Course
          </button>
        </div>

        {/* Desktop Table */}
        <div className='hidden md:block rounded-2xl overflow-hidden'
          style={{ background: '#111827', border: '1px solid rgba(59,130,246,0.15)', boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>
          <table className='min-w-full'>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(59,130,246,0.1)', background: 'rgba(59,130,246,0.05)' }}>
                {['Course', 'Price', 'Status', 'Action'].map(h => (
                  <th key={h} className='text-left py-4 px-5 text-sm font-bold uppercase tracking-widest'
                    style={{ color: '#94A3B8' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {safeData.map((course) => (   // ✅ use course._id as key
                <tr key={course._id}
                  className='transition-all duration-200'
                  style={{ borderBottom: '1px solid rgba(59,130,246,0.06)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td className='py-4 px-5'>
                    <div className='flex items-center gap-4'>
                      <div className='relative flex-shrink-0'>
                        <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[6px] opacity-30' />
                        <img
                          src={course?.thumbnail || img}
                          className='w-20 h-12 object-cover rounded-lg relative z-10'
                          style={{ border: '1px solid rgba(59,130,246,0.2)' }}
                          alt=""
                        />
                      </div>
                      <span className='text-base font-medium' style={{ color: '#E2E8F0' }}>
                        {course?.title}
                      </span>
                    </div>
                  </td>

                  <td className='px-5 py-4'>
                    <span className='text-base font-semibold' style={{ color: '#06B6D4' }}>
                      {course?.price ? `₹${course.price}` : '—'}
                    </span>
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-3 py-1 rounded-full text-sm font-semibold'
                      style={{
                        background: course?.isPublished ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        border: course?.isPublished ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)',
                        color: course?.isPublished ? '#4ADE80' : '#F87171',
                      }}>
                      {course?.isPublished ? '● Published' : '● Draft'}
                    </span>
                  </td>

                  <td className='px-5 py-4'>
                    <button
                      className='flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200'
                      style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.18)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(59,130,246,0.3)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                      onClick={() => navigate(`/editcourse/${course?._id}`)}
                    >
                      <FaEdit className='w-3.5 h-3.5' /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {safeData.length === 0 && (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <p className='text-lg font-semibold text-[#E2E8F0]'>No courses yet</p>
              <p className='text-base text-[#94A3B8]'>Create your first course to get started</p>
            </div>
          )}

          <div className='px-5 py-3 text-sm text-center'
            style={{ color: '#94A3B8', borderTop: '1px solid rgba(59,130,246,0.06)' }}>
            A list of your recent courses
          </div>
        </div>

        {/* Mobile Cards */}
        <div className='md:hidden space-y-4'>
          {safeData.map((course) => (   // ✅ use course._id as key
            <div key={course._id} className='rounded-2xl p-4 flex flex-col gap-3'
              style={{ background: '#111827', border: '1px solid rgba(59,130,246,0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <div className='flex gap-4 items-center'>
                <div className='relative flex-shrink-0'>
                  <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[5px] opacity-25' />
                  <img src={course?.thumbnail || img} alt=""
                    className='w-16 h-16 rounded-lg object-cover relative z-10'
                    style={{ border: '1px solid rgba(59,130,246,0.2)' }} />
                </div>
                <div className='flex-1 min-w-0'>
                  <h2 className='text-base font-semibold truncate' style={{ color: '#E2E8F0' }}>{course.title}</h2>
                  <p className='text-base font-semibold mt-1' style={{ color: '#06B6D4' }}>
                    {course?.price ? `₹${course.price}` : '—'}
                  </p>
                </div>
                <button
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex-shrink-0'
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#3B82F6' }}
                  onClick={() => navigate(`/editcourse/${course?._id}`)}
                >
                  <FaEdit className='w-3 h-3' /> Edit
                </button>
              </div>
              <span className='w-fit px-3 py-1 text-sm font-semibold rounded-full'
                style={{
                  background: course?.isPublished ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  border: course?.isPublished ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)',
                  color: course?.isPublished ? '#4ADE80' : '#F87171',
                }}>
                {course?.isPublished ? '● Published' : '● Draft'}
              </span>
            </div>
          ))}

          {safeData.length === 0 && (
            <div className='flex flex-col items-center justify-center py-16 gap-3'>
              <p className='text-lg font-semibold text-[#E2E8F0]'>No courses yet</p>
              <p className='text-base text-[#94A3B8]'>Create your first course to get started</p>
            </div>
          )}

          <p className='text-center text-sm text-[#94A3B8] mt-2'>A list of your recent courses</p>
        </div>
      </div>
    </div>
  )
}

export default Courses