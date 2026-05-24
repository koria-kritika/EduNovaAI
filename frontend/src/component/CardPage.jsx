// // import React from 'react'
// // import { useEffect } from 'react'
// // import { useState } from 'react'
// // import { useSelector } from 'react-redux'
// // import Card from './Card'

// // function CardPage() {
// //     const {courseData} = useSelector(state=>state.course)
// //     const [popularCourses,setPopularCourses] = useState([])

// //     useEffect(()=>{
// //      setPopularCourses(courseData?.slice(0,6));
// //     },[courseData])
// //   return (
// //     <div className='relative flex items-center justify-center flex-col'>
// //         <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>Our Popular Courses</h1>
// //         <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.</span>
// //         <div className='w-[100%]  flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>
// //          {
// //             popularCourses?.map((course,index)=>(
// //                 <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} reviews={course.reviews}/>
// //             ))
// //          }
// //         </div>
      
// //     </div>
// //   )
// // }

// // export default CardPage

// import React from 'react'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useSelector } from 'react-redux'
// import Card from './Card'

// function CardPage() {
//     const {courseData} = useSelector(state=>state.course)
//     const [popularCourses,setPopularCourses] = useState([])

//     useEffect(()=>{
//      setPopularCourses(courseData?.slice(0,6));
//     },[courseData])

//   return (
//     <div className='relative flex items-center justify-center flex-col bg-[#0F172A] overflow-hidden'>

//       {/* background glow orbs */}
//       <div className='absolute top-[0px] right-[5%] w-[450px] h-[450px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none' />
//       <div className='absolute bottom-[0px] left-[5%] w-[450px] h-[450px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none' />
//       <div className='absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-[#06B6D4] opacity-[0.04] rounded-full blur-[100px] pointer-events-none' />

//       {/* section label */}
//       <div className='flex items-center gap-3 mt-[50px]'>
//         <div className='w-8 h-[2px] bg-gradient-to-r from-transparent to-[#8B5CF6]' />
//         <span className='text-[#06B6D4] text-sm font-semibold tracking-widest uppercase'>
//           Popular Courses
//         </span>
//         <div className='w-8 h-[2px] bg-gradient-to-l from-transparent to-[#3B82F6]' />
//       </div>

//       {/* heading */}
//       <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[16px] px-[20px] leading-tight'>
//         <span className='text-[#E2E8F0]'>Our </span>
//         <span className='bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent'>
//           Popular Courses
//         </span>
//       </h1>

//       {/* subtext */}
//       <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[20px] mb-[16px] px-[20px] text-[#94A3B8] leading-relaxed'>
//         Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
//       </span>

//       {/* gradient divider */}
//       <div className='w-[80px] h-[3px] rounded-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] mb-[50px]' />

//       {/* cards grid */}
//       <div className='w-[100%] flex items-center justify-center flex-wrap gap-[30px] lg:px-[80px] md:px-[40px] px-[20px] pb-[80px]'>
//         {popularCourses?.map((course, index) => (
//           <div
//             key={index}
//             className='relative group'
//             style={{
//               animation: `fadeSlideUp 0.5s ease forwards`,
//               animationDelay: `${index * 0.1}s`,
//               opacity: 0
//             }}
//           >
//             {/* hover glow behind card */}
//             <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] opacity-0 group-hover:opacity-25 blur-[18px] transition-all duration-500 pointer-events-none' />
//             <Card
//               thumbnail={course.thumbnail}
//               title={course.title}
//               category={course.category}
//               price={"₹" + course.price}
//               id={course._id}
//               reviews={course.reviews}
//             />
//           </div>
//         ))}
//       </div>

//       {/* bottom fade */}
//       <div className='absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none' />

//       <style>{`
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default CardPage

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function CardPage() {
    const { courseData } = useSelector(state => state.course)
    const [popularCourses, setPopularCourses] = useState([])

    useEffect(() => {
        if (Array.isArray(courseData)) {
            setPopularCourses(courseData.slice(0, 6))
        }
    }, [courseData])

    return (
        <div className='relative flex items-center justify-center flex-col bg-[#0F172A] overflow-hidden'>

            {/* background glow orbs */}
            <div className='absolute top-[0px] right-[5%] w-[450px] h-[450px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute bottom-[0px] left-[5%] w-[450px] h-[450px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none' />
            <div className='absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-[#06B6D4] opacity-[0.04] rounded-full blur-[100px] pointer-events-none' />

            {/* section label */}
            <div className='flex items-center gap-3 mt-[50px]'>
                <div className='w-8 h-[2px] bg-gradient-to-r from-transparent to-[#8B5CF6]' />
                <span className='text-[#06B6D4] text-sm font-semibold tracking-widest uppercase'>
                    Popular Courses
                </span>
                <div className='w-8 h-[2px] bg-gradient-to-l from-transparent to-[#3B82F6]' />
            </div>

            {/* heading */}
            <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[16px] px-[20px] leading-tight'>
                <span className='text-[#E2E8F0]'>Our </span>
                <span className='bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent'>
                    Popular Courses
                </span>
            </h1>

            {/* subtext */}
            <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[20px] mb-[16px] px-[20px] text-[#94A3B8] leading-relaxed'>
                Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
            </span>

            {/* gradient divider */}
            <div className='w-[80px] h-[3px] rounded-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] mb-[50px]' />

            {/* cards grid */}
            <div className='w-[100%] flex items-center justify-center flex-wrap gap-[30px] lg:px-[80px] md:px-[40px] px-[20px] pb-[80px]'>
                {popularCourses.length === 0 ? (
                    <p className='text-[#94A3B8] text-sm'>No courses available yet.</p>
                ) : (
                    popularCourses.map((course) => (
                        <div
                            key={course._id}
                            className='relative group'
                            style={{
                                animation: `fadeSlideUp 0.5s ease forwards`,
                                animationDelay: `${popularCourses.indexOf(course) * 0.1}s`,
                                opacity: 0
                            }}
                        >
                            {/* hover glow behind card */}
                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] opacity-0 group-hover:opacity-25 blur-[18px] transition-all duration-500 pointer-events-none' />
                            <Card
                                thumbnail={course.thumbnail || null}
                                title={course.title}
                                category={course.category}
                                price={"₹" + course.price}
                                id={course._id}
                                reviews={course.reviews}
                            />
                        </div>
                    ))
                )}
            </div>

            {/* bottom fade */}
            <div className='absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-[#0F172A] to-transparent pointer-events-none' />

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default CardPage