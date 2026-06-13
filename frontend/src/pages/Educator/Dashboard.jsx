// // 
// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

// function Dashboard() {
//   const { userData } = useSelector(state => state.user)
//   const navigate = useNavigate()
//   const { creatorCourseData } = useSelector(state => state.course)

//   const CourseProgressData = creatorCourseData?.map((course) => ({
//     name: course.title?.slice(0, 10) + "...",
//     lectures: course.lectures?.length || 0
//   })) || [];

//   const EnrollData = creatorCourseData?.map((course) => ({
//     name: course.title?.slice(0, 10) + "...",
//     enrolled: course.enrolledStudents?.length || 0
//   })) || [];

//   const totalEarning = creatorCourseData?.reduce((sum, course) => {
//     const studentCount = course.enrolledStudents?.length || 0;
//     const courseRevenue = course.price ? course.price * studentCount : 0
//     return sum + courseRevenue;
//   }, 0) || 0

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{
//           background: '#1E293B',
//           border: '1px solid rgba(59,130,246,0.3)',
//           borderRadius: 10,
//           padding: '10px 16px',
//           color: '#E2E8F0',
//           fontSize: 13,
//           boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
//         }}>
//           <p style={{ color: '#94A3B8', marginBottom: 4 }}>{label}</p>
//           <p style={{ color: '#3B82F6', fontWeight: 700 }}>{payload[0].value}</p>
//         </div>
//       )
//     }
//     return null;
//   }

//   return (
//     <div className='flex min-h-screen relative' style={{ background: '#0F172A' }}>

//       {/* background glow orbs */}
//       <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />
//       <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />

//       {/* back button */}
//       <button
//         className='absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300'
//         style={{
//           background: 'rgba(59,130,246,0.1)',
//           border: '1px solid rgba(59,130,246,0.3)',
//         }}
//         onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
//         onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
//         onClick={() => navigate("/")}
//       >
//         <FaArrowLeftLong className='text-[#3B82F6] w-4 h-4' />
//       </button>

//       <div className='w-full px-6 py-10 space-y-8 relative z-[1]'>

//         {/* ── Profile + Earning card ── */}
//         <div
//           className='max-w-5xl mx-auto rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mt-8'
//           style={{
//             background: '#111827',
//             border: '1px solid rgba(59,130,246,0.15)',
//             boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
//           }}
//         >
//           {/* avatar */}
//           <div className='relative flex-shrink-0'>
//             <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[10px] opacity-50' />
//             {userData?.photoUrl ? (
//               <img
//                 src={userData.photoUrl}
//                 className='w-28 h-28 rounded-full object-cover relative z-10'
//                 style={{ border: '3px solid rgba(59,130,246,0.5)' }}
//                 alt="Educator"
//               />
//             ) : (
//               <div
//                 className='w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black relative z-10'
//                 style={{
//                   background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
//                   color: '#fff',
//                   border: '3px solid rgba(59,130,246,0.5)',
//                 }}
//               >
//                 {userData?.name?.slice(0, 1).toUpperCase()}
//               </div>
//             )}
//           </div>

//           {/* info */}
//           <div className='text-center md:text-left space-y-3 flex-1'>
//             <h1
//               className='text-3xl font-bold'
//               style={{
//                 background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}
//             >
//               Welcome, {userData?.name || "Educator"} 👋
//             </h1>

//             {/* earning pill */}
//             <div
//               className='inline-flex items-center gap-2 px-4 py-2 rounded-xl'
//               style={{
//                 background: 'rgba(6,182,212,0.08)',
//                 border: '1px solid rgba(6,182,212,0.25)',
//               }}
//             >
//               <span className='text-2xl font-bold' style={{
//                 background: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 backgroundClip: 'text',
//               }}>
//                 ₹{totalEarning.toLocaleString()}
//               </span>
//               <span className='text-base text-[#94A3B8] font-medium'>Total Earnings</span>
//             </div>

//             <p className='text-large text-[#94A3B8] leading-relaxed'>
//               {userData?.description || "Start Creating Courses for Your Students"}
//             </p>

//             <button
//               className='px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-300'
//               style={{
//                 background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
//                 color: '#fff',
//                 boxShadow: '0 0 16px rgba(59,130,246,0.4)',
//               }}
//               onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px rgba(139,92,246,0.6)'}
//               onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.4)'}
//               onClick={() => navigate("/courses")}
//             >
//               My Courses
//             </button>
//           </div>

//           {/* stat pills */}
//           <div className='flex md:flex-col gap-3 flex-shrink-0'>
//             <div
//               className='px-5 py-3 rounded-xl text-center'
//               style={{
//                 background: 'rgba(59,130,246,0.08)',
//                 border: '1px solid rgba(59,130,246,0.2)',
//               }}
//             >
//               <p className='text-2xl font-bold text-[#3B82F6]'>
//                 {creatorCourseData?.length || 0}
//               </p>
//               <p className='text-base text-[#94A3B8]'>Courses</p>
//             </div>
//             <div
//               className='px-5 py-3 rounded-xl text-center'
//               style={{
//                 background: 'rgba(139,92,246,0.08)',
//                 border: '1px solid rgba(139,92,246,0.2)',
//               }}
//             >
//               <p className='text-2xl font-bold text-[#8B5CF6]'>
//                 {creatorCourseData?.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0) || 0}
//               </p>
//               <p className='text-base text-[#94A3B8]'>Students</p>
//             </div>
//           </div>
//         </div>

//         {/* ── Charts ── */}
//         <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>

//           {/* Course Progress chart */}
//           <div
//             className='rounded-2xl p-6'
//             style={{
//               background: '#111827',
//               border: '1px solid rgba(59,130,246,0.15)',
//               boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
//             }}
//           >
//             <div className='flex items-center gap-2 mb-6'>
//               <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
//               <h2 className='text-xl font-bold text-[#E2E8F0]'>Course Progress</h2>
//               <span
//                 className='ml-auto text-base px-2 py-0.5 rounded-full font-medium'
//                 style={{
//                   background: 'rgba(59,130,246,0.1)',
//                   border: '1px solid rgba(59,130,246,0.2)',
//                   color: '#3B82F6',
//                 }}
//               >
//                 Lectures
//               </span>
//             </div>

//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={CourseProgressData} barSize={28}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="rgba(59,130,246,0.08)"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="name"
//                   tick={{ fill: '#94A3B8', fontSize: 13 }}
//                   axisLine={{ stroke: 'rgba(59,130,246,0.1)' }}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fill: '#94A3B8', fontSize: 13 }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
//                 <Bar
//                   dataKey="lectures"
//                   radius={[6, 6, 0, 0]}
//                   fill="url(#blueGrad)"
//                 />
//                 <defs>
//                   <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#3B82F6" />
//                     <stop offset="100%" stopColor="#8B5CF6" />
//                   </linearGradient>
//                 </defs>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Enrollment chart */}
//           <div
//             className='rounded-2xl p-6'
//             style={{
//               background: '#111827',
//               border: '1px solid rgba(139,92,246,0.15)',
//               boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
//             }}
//           >
//             <div className='flex items-center gap-2 mb-6'>
//               <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#06B6D4]' />
//               <h2 className='text-xl font-bold text-[#E2E8F0]'>Student Enrollment</h2>
//               <span
//                 className='ml-auto text-base px-2 py-0.5 rounded-full font-medium'
//                 style={{
//                   background: 'rgba(139,92,246,0.1)',
//                   border: '1px solid rgba(139,92,246,0.2)',
//                   color: '#8B5CF6',
//                 }}
//               >
//                 Students
//               </span>
//             </div>

//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={EnrollData} barSize={28}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="rgba(139,92,246,0.08)"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="name"
//                   tick={{ fill: '#94A3B8', fontSize: 13 }}
//                   axisLine={{ stroke: 'rgba(139,92,246,0.1)' }}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fill: '#94A3B8', fontSize: 13 }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.05)' }} />
//                 <Bar
//                   dataKey="enrolled"
//                   radius={[6, 6, 0, 0]}
//                   fill="url(#purpleGrad)"
//                 />
//                 <defs>
//                   <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#8B5CF6" />
//                     <stop offset="100%" stopColor="#06B6D4" />
//                   </linearGradient>
//                 </defs>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

// function Dashboard() {
//   const { userData } = useSelector(state => state.user)
//   const navigate = useNavigate()
//   const { creatorCourseData } = useSelector(state => state.course)

//   const CourseProgressData = creatorCourseData?.map((course) => ({
//     name: course.title?.slice(0, 10) + "...",
//     lectures: course.lectures?.length || 0
//   })) || [];

//   const EnrollData = creatorCourseData?.map((course) => ({
//     name: course.title?.slice(0, 10) + "...",
//     enrolled: course.enrolledStudents?.length || 0
//   })) || [];

//   const totalEarning = creatorCourseData?.reduce((sum, course) => {
//     const studentCount = course.enrolledStudents?.length || 0;
//     const courseRevenue = course.price ? course.price * studentCount : 0
//     return sum + courseRevenue;
//   }, 0) || 0

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{
//           background: '#FFFFFF',
//           border: '1px solid rgba(78, 91, 242, 0.2)',
//           borderRadius: 10,
//           padding: '10px 16px',
//           color: '#0E1B4D',
//           fontSize: 13,
//           boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
//         }}>
//           <p style={{ color: '#6B7280', marginBottom: 4 }}>{label}</p>
//           <p style={{ color: '#4E5BF2', fontWeight: 700 }}>{payload[0].value}</p>
//         </div>
//       )
//     }
//     return null;
//   }

//   return (
//     // Background updated to a stunning premium responsive multi-stop pastel layout mesh gradient
//     <div className='flex min-h-screen relative forced-font-container w-full overflow-x-hidden' 
//          style={{ background: 'linear-gradient(135deg, #FFF0E5 0%, #F5F3FF 40%, #E8F5E9 100%)' }}>
      
//       {/* Absolute fallback injection for system fonts */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         .forced-font-container, 
//         .forced-font-container *, 
//         .forced-font-container h1, 
//         .forced-font-container h2, 
//         .forced-font-container p, 
//         .forced-font-container span, 
//         .forced-font-container button {
//           font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
//         }
//       `}</style>

//       {/* background glow orbs aligned with the soft aesthetic */}
//       <div className='fixed top-[-80px] right-[10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#4E5BF2] opacity-[0.05] rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0' />
//       <div className='fixed bottom-[-80px] left-[5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#FF8A8A] opacity-[0.05] rounded-full blur-[100px] md:blur-[140px] pointer-events-none z-0' />

//       {/* back button */}
//       <button
//         className='absolute top-4 left-4 md:top-6 md:left-6 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300'
//         style={{
//           background: 'rgba(78, 91, 242, 0.06)',
//           border: '1px solid rgba(78, 91, 242, 0.15)',
//         }}
//         onMouseEnter={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.12)'}
//         onMouseLeave={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.06)'}
//         onClick={() => navigate("/")}
//       >
//         <FaArrowLeftLong className='text-[#4E5BF2] w-3.5 h-3.5 md:w-4 md:h-4' />
//       </button>

//       <div className='w-full px-4 md:px-6 py-16 md:py-10 space-y-6 md:space-y-8 relative z-[1]'>

//         {/* ── Profile + Earning card ── */}
//         <div
//           className='max-w-5xl mx-auto rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-8 text-center md:text-left'
//           style={{
//             background: '#FFFFFF',
//             border: '1px solid rgba(78, 91, 242, 0.06)',
//             boxShadow: '0 10px 35px rgba(14, 27, 77, 0.04)',
//           }}
//         >
//           {/* avatar */}
//           <div className='relative flex-shrink-0 mx-auto md:mx-0'>
//             <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#4E5BF2] to-[#6C5CE7] blur-[8px] opacity-20' />
//             {userData?.photoUrl ? (
//               <img
//                 src={userData.photoUrl}
//                 className='w-24 h-24 md:w-28 md:h-28 rounded-full object-cover relative z-10'
//                 style={{ border: '3px solid rgba(78, 91, 242, 0.4)' }}
//                 alt="Educator"
//               />
//             ) : (
//               <div
//                 className='w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-3xl md:text-4xl font-black relative z-10'
//                 style={{
//                   background: 'linear-gradient(135deg, #4E5BF2, #6C5CE7)',
//                   color: '#fff',
//                   border: '3px solid rgba(78, 91, 242, 0.4)',
//                 }}
//               >
//                 {userData?.name?.slice(0, 1).toUpperCase()}
//               </div>
//             )}
//           </div>

//           {/* info */}
//           <div className='space-y-3 flex-1 w-full'>
//             <h1 className='text-2xl md:text-3xl font-bold text-[#0E1B4D]'>
//               WELCOME, {userData?.name || "Educator"} 
//             </h1>

//             {/* earning pill */}
//             <div
//               className='inline-flex items-center gap-2 px-4 py-1.5 md:py-2 rounded-xl mx-auto md:mx-0'
//               style={{
//                 background: 'rgba(78, 91, 242, 0.05)',
//                 border: '1px solid rgba(78, 91, 242, 0.12)',
//               }}
//             >
//               <span className='text-xl md:text-2xl font-bold text-[#4E5BF2]'>
//                 ₹{totalEarning.toLocaleString()}
//               </span>
//               <span className='text-sm md:text-base text-[#6B7280] font-medium'>Total Earnings</span>
//             </div>

//             <p className='text-sm md:text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto md:mx-0'>
//               {userData?.description || "Start Creating Courses for Your Students"}
//             </p>

//             <button
//               className='w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 block sm:inline-block'
//               style={{
//                 background: '#4E5BF2',
//                 color: '#fff',
//                 boxShadow: '0 6px 20px rgba(78, 91, 242, 0.25)',
//               }}
//               onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 25px rgba(78, 91, 242, 0.4)'}
//               onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 91, 242, 0.25)'}
//               onClick={() => navigate("/courses")}
//             >
//               My Courses
//             </button>
//           </div>

//           {/* stat pills - grid structure added on tiny screens */}
//           <div className='grid grid-cols-2 md:flex md:flex-col gap-3 w-full md:w-auto flex-shrink-0 mt-2 md:mt-0'>
//             <div
//               className='px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-center'
//               style={{
//                 background: 'rgba(78, 91, 242, 0.04)',
//                 border: '1px solid rgba(78, 91, 242, 0.08)',
//               }}
//             >
//               <p className='text-xl md:text-2xl font-bold text-[#4E5BF2]'>
//                 {creatorCourseData?.length || 0}
//               </p>
//               <p className='text-xs md:text-base text-[#6B7280]'>Courses</p>
//             </div>
//             <div
//               className='px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-center'
//               style={{
//                 background: 'rgba(108, 92, 231, 0.04)',
//                 border: '1px solid rgba(108, 92, 231, 0.08)',
//               }}
//             >
//               <p className='text-xl md:text-2xl font-bold text-[#6C5CE7]'>
//                 {creatorCourseData?.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0) || 0}
//               </p>
//               <p className='text-xs md:text-base text-[#6B7280]'>Students</p>
//             </div>
//           </div>
//         </div>

//         {/* ── Charts ── */}
//         <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>

//           {/* Course Progress chart */}
//           <div
//             className='rounded-2xl p-4 md:p-6'
//             style={{
//               background: '#FFFFFF',
//               border: '1px solid rgba(78, 91, 242, 0.06)',
//               boxShadow: '0 10px 35px rgba(14, 27, 77, 0.04)',
//             }}
//           >
//             <div className='flex items-center gap-2 mb-6'>
//               <div className='w-1 h-5 md:h-6 rounded-full bg-[#4E5BF2]' />
//               <h2 className='text-lg md:text-xl font-bold text-[#0E1B4D]'>Course Progress</h2>
//               <span
//                 className='ml-auto text-xs md:text-base px-2 py-0.5 rounded-full font-medium'
//                 style={{
//                   background: 'rgba(78, 91, 242, 0.08)',
//                   border: '1px solid rgba(78, 91, 242, 0.15)',
//                   color: '#4E5BF2',
//                 }}
//               >
//                 Lectures
//               </span>
//             </div>

//             <div className='w-full overflow-x-auto overflow-y-hidden'>
//               <ResponsiveContainer width="100%" height={260} minWidth={300}>
//                 <BarChart data={CourseProgressData} barSize={24}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="rgba(14, 27, 77, 0.04)"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: '#6B7280', fontSize: 11 }}
//                     axisLine={{ stroke: 'rgba(14, 27, 77, 0.06)' }}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     tick={{ fill: '#6B7280', fontSize: 11 }}
//                     axisLine={false}
//                     tickLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(78, 91, 242, 0.02)' }} />
//                   <Bar
//                     dataKey="lectures"
//                     radius={[5, 5, 0, 0]}
//                     fill="url(#blueGrad)"
//                   />
//                   <defs>
//                     <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#4E5BF2" />
//                       <stop offset="100%" stopColor="#6C5CE7" />
//                     </linearGradient>
//                   </defs>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Enrollment chart */}
//           <div
//             className='rounded-2xl p-4 md:p-6'
//             style={{
//               background: '#FFFFFF',
//               border: '1px solid rgba(78, 91, 242, 0.06)',
//               boxShadow: '0 10px 35px rgba(14, 27, 77, 0.04)',
//             }}
//           >
//             <div className='flex items-center gap-2 mb-6'>
//               <div className='w-1 h-5 md:h-6 rounded-full bg-[#6C5CE7]' />
//               <h2 className='text-lg md:text-xl font-bold text-[#0E1B4D]'>Student Enrollment</h2>
//               <span
//                 className='ml-auto text-xs md:text-base px-2 py-0.5 rounded-full font-medium'
//                 style={{
//                   background: 'rgba(108, 92, 231, 0.08)',
//                   border: '1px solid rgba(108, 92, 231, 0.15)',
//                   color: '#6C5CE7',
//                 }}
//               >
//                 Students
//               </span>
//             </div>

//             <div className='w-full overflow-x-auto overflow-y-hidden'>
//               <ResponsiveContainer width="100%" height={260} minWidth={300}>
//                 <BarChart data={EnrollData} barSize={24}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     stroke="rgba(14, 27, 77, 0.04)"
//                     vertical={false}
//                   />
//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: '#6B7280', fontSize: 11 }}
//                     axisLine={{ stroke: 'rgba(14, 27, 77, 0.06)' }}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     tick={{ fill: '#6B7280', fontSize: 11 }}
//                     axisLine={false}
//                     tickLine={false}
//                   />
//                   <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108, 92, 231, 0.02)' }} />
//                   <Bar
//                     dataKey="enrolled"
//                     radius={[5, 5, 0, 0]}
//                     fill="url(#purpleGrad)"
//                   />
//                   <defs>
//                     <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#6C5CE7" />
//                       <stop offset="100%" stopColor="#4AD8B4" />
//                     </linearGradient>
//                   </defs>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

function Dashboard() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const { creatorCourseData } = useSelector(state => state.course)

  const CourseProgressData = creatorCourseData?.map((course) => ({
    name: course.title?.slice(0, 10) + "...",
    lectures: course.lectures?.length || 0
  })) || [];

  const EnrollData = creatorCourseData?.map((course) => ({
    name: course.title?.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarning = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0
    return sum + courseRevenue;
  }, 0) || 0

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(78, 91, 242, 0.2)',
          borderRadius: 10,
          padding: '10px 16px',
          color: '#0E1B4D',
          fontSize: 13,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        }}>
          <p style={{ color: '#6B7280', marginBottom: 4 }}>{label}</p>
          <p style={{ color: '#4E5BF2', fontWeight: 700 }}>{payload[0].value}</p>
        </div>
      )
    }
    return null;
  }

  return (
    // Restricted changes only to fontFamily and base background color
    <div className='flex min-h-screen relative forced-font-container w-full overflow-x-hidden transition-all duration-500' 
         style={{ background: 'linear-gradient(135deg, #FFF0E5 0%, #F5F3FF 40%, #E8F5E9 100%)' }}>
      
      {/* Absolute fallback injection for system fonts and bar-reveal animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .forced-font-container, 
        .forced-font-container *, 
        .forced-font-container h1, 
        .forced-font-container h2, 
        .forced-font-container p, 
        .forced-font-container span, 
        .forced-font-container button {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }

        @keyframes barReveal {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        .recharts-bar-rectangle {
          animation: barReveal 0.6s ease-out forwards;
          transform-origin: bottom;
        }
      `}</style>

      {/* Original layout of background orbs is strictly maintained */}
      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#4E5BF2] opacity-[0.05] rounded-full blur-[140px] pointer-events-none z-0' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#FF8A8A] opacity-[0.05] rounded-full blur-[140px] pointer-events-none z-0' />

      {/* Back button, added hover/active animation */}
      <button
        className='absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 active:scale-95'
        style={{
          background: 'rgba(78, 91, 242, 0.06)',
          border: '1px solid rgba(78, 91, 242, 0.15)',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.12)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.06)'}
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className='text-[#4E5BF2] w-4 h-4' />
      </button>

      <div className='w-full px-6 py-10 space-y-8 relative z-[1]'>

        {/* ── Profile + Earning card ── */}
        <div
          className='max-w-5xl mx-auto rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mt-8'
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(78, 91, 242, 0.06)',
            boxShadow: '0 10px 35px rgba(14, 27, 77, 0.04)',
          }}
        >
          {/* avatar */}
          <div className='relative flex-shrink-0'>
            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#4E5BF2] to-[#6C5CE7] blur-[10px] opacity-20' />
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                className='w-28 h-28 rounded-full object-cover relative z-10'
                style={{ border: '3px solid rgba(78, 91, 242, 0.4)' }}
                alt="Educator"
              />
            ) : (
              <div
                className='w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black relative z-10'
                style={{
                  background: 'linear-gradient(135deg, #4E5BF2, #6C5CE7)',
                  color: '#fff',
                  border: '3px solid rgba(78, 91, 242, 0.4)',
                }}
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          {/* info */}
          <div className='text-center md:text-left space-y-3 flex-1'>
            <h1
              className='text-3xl font-bold text-[#0E1B4D]'
            >
              WELCOME, {userData?.name || "Educator"} 
            </h1>

            {/* earning pill */}
            <div
              className='inline-flex items-center gap-2 px-4 py-2 rounded-xl'
              style={{
                background: 'rgba(78, 91, 242, 0.05)',
                border: '1px solid rgba(78, 91, 242, 0.12)',
              }}
            >
              <span className='text-2xl font-bold text-[#4E5BF2]'>
                ₹{totalEarning.toLocaleString()}
              </span>
              <span className='text-base text-[#6B7280] font-medium'>Total Earnings</span>
            </div>

            <p className='text-large text-[#6B7280] leading-relaxed'>
              {userData?.description || "Start Creating Courses for Your Students"}
            </p>

            <button
              className='px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]'
              style={{
                background: '#4E5BF2',
                color: '#fff',
                boxShadow: '0 6px 20px rgba(78, 91, 242, 0.25)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 25px rgba(78, 91, 242, 0.4)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 91, 242, 0.25)'}
              onClick={() => navigate("/courses")}
            >
              My Courses
            </button>
          </div>

          {/* stat pills */}
          <div className='flex md:flex-col gap-3 flex-shrink-0'>
            <div
              className='px-5 py-3 rounded-xl text-center'
              style={{
                background: 'rgba(78, 91, 242, 0.04)',
                border: '1px solid rgba(78, 91, 242, 0.08)',
              }}
            >
              <p className='text-2xl font-bold text-[#4E5BF2]'>
                {creatorCourseData?.length || 0}
              </p>
              <p className='text-base text-[#6B7280]'>Courses</p>
            </div>
            <div
              className='px-5 py-3 rounded-xl text-center'
              style={{
                background: 'rgba(108, 92, 231, 0.04)',
                border: '1px solid rgba(108, 92, 231, 0.08)',
              }}
            >
              <p className='text-2xl font-bold text-[#6C5CE7]'>
                {creatorCourseData?.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0) || 0}
              </p>
              <p className='text-base text-[#6B7280]'>Students</p>
            </div>
          </div>
        </div>

        {/* ── Charts ── */}
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* Course Progress chart */}
          <div
            className='rounded-2xl p-6'
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(78, 91, 242, 0.06)',
              boxShadow: '0 10px 35px rgba(14, 27, 77, 0.04)',
            }}
          >
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-1 h-6 rounded-full bg-[#4E5BF2]' />
              <h2 className='text-xl font-bold text-[#0E1B4D]'>Course Progress</h2>
              <span
                className='ml-auto text-base px-2 py-0.5 rounded-full font-medium'
                style={{
                  background: 'rgba(78, 91, 242, 0.08)',
                  border: '1px solid rgba(78, 91, 242, 0.15)',
                  color: '#4E5BF2',
                }}
              >
                Lectures
              </span>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={CourseProgressData} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(14, 27, 77, 0.04)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6B7280', fontSize: 13 }}
                  axisLine={{ stroke: 'rgba(14, 27, 77, 0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B7280', fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(78, 91, 242, 0.02)' }} />
                <Bar
                  dataKey="lectures"
                  radius={[6, 6, 0, 0]}
                  fill="url(#blueGrad)"
                />
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4E5BF2" />
                    <stop offset="100%" stopColor="#6C5CE7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment chart */}
          <div
            className='rounded-2xl p-6'
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(78, 91, 242, 0.06)',
              boxShadow: '0 10px 35px rgba(14, 27, 77, 0.04)',
            }}
          >
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-1 h-6 rounded-full bg-[#6C5CE7]' />
              <h2 className='text-xl font-bold text-[#0E1B4D]'>Student Enrollment</h2>
              <span
                className='ml-auto text-base px-2 py-0.5 rounded-full font-medium'
                style={{
                  background: 'rgba(108, 92, 231, 0.08)',
                  border: '1px solid rgba(108, 92, 231, 0.15)',
                  color: '#6C5CE7',
                }}
              >
                Students
              </span>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={EnrollData} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(14, 27, 77, 0.04)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#6B7280', fontSize: 13 }}
                  axisLine={{ stroke: 'rgba(14, 27, 77, 0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6B7280', fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108, 92, 231, 0.02)' }} />
                <Bar
                  dataKey="enrolled"
                  radius={[6, 6, 0, 0]}
                  fill="url(#purpleGrad)"
                />
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6C5CE7" />
                    <stop offset="100%" stopColor="#4AD8B4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard