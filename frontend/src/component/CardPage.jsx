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
        <div 
            className='relative flex items-center justify-center flex-col overflow-hidden w-full'
            style={{
                /* Bright Fluid Mesh Background mixing Purple, Mint Green, and Peach exactly like your image */
                background: 'radial-gradient(circle at 85% 15%, #FFEBE0 0%, transparent 40%), radial-gradient(circle at 15% 85%, #E8F5E9 0%, transparent 40%), radial-gradient(circle at 50% 50%, #F3E8FF 0%, #FFFFFF 100%)',
            }}
        >
            {/* Background Soft Organic Floating Orbs for extra premium depth */}
            <div className='absolute top-[10%] left-[5%] w-[120px] h-[120px] bg-gradient-to-tr from-[#6C5CE7]/10 to-[#4E5BF2]/10 rounded-full blur-xl pointer-events-none' />
            <div className='absolute bottom-[15%] right-[2%] w-[160px] h-[160px] bg-gradient-to-tr from-[#4AD8B4]/15 to-[#E8F5E9]/10 rounded-full blur-2xl pointer-events-none' />

            {/* Section Label */}
            <div className='flex items-center gap-3 mt-[70px]'>
                <div className='w-8 h-[2px] bg-gradient-to-r from-transparent to-[#6C5CE7]' />
                <span className='text-[#4E5BF2] text-xs font-bold tracking-widest uppercase'>
                    Popular Courses
                </span>
                <div className='w-8 h-[2px] bg-gradient-to-l from-transparent to-[#4AD8B4]' />
            </div>

            {/* Heading with Clean Contrast */}
            <h1 className='md:text-[42px] text-[32px] font-extrabold text-center mt-[12px] px-[20px] leading-tight text-[#0E1B4D]'>
                Our{' '}
                <span 
                    style={{
                        background: 'linear-gradient(90deg, #4E5BF2, #6C5CE7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Popular Courses
                </span>
            </h1>

            {/* Subtext */}
            <p className='lg:w-[50%] md:w-[75%] text-[15px] text-center mt-[16px] mb-[24px] px-[20px] text-[#5F6C85] font-medium leading-relaxed'>
                Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
            </p>

            {/* Pastel Soft Gradient Divider */}
            <div 
                className='w-[80px] h-[3.5px] rounded-full mb-[50px]' 
                style={{
                    background: 'linear-gradient(90deg, #6C5CE7 0%, #FED7AA 50%, #6E00F5 100%)',
                    background: 'linear-gradient(90deg, #4E5BF2, #FF8A8A, #4AD8B4)'
                }}
            />

            {/* Cards Grid wrapper */}
            <div className='w-[100%] flex items-center justify-center flex-wrap gap-[35px] lg:px-[80px] md:px-[40px] px-[20px] pb-[90px]'>
                {popularCourses.length === 0 ? (
                    <p className='text-[#5F6C85] font-medium text-sm bg-white/50 px-6 py-3 rounded-xl border border-gray-100 shadow-sm'>
                        No courses available yet.
                    </p>
                ) : (
                    popularCourses.map((course) => (
                        <div
                            key={course._id}
                            className='relative group transition-transform duration-300 hover:-translate-y-1'
                            style={{
                                animation: `fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                                animationDelay: `${popularCourses.indexOf(course) * 0.08}s`,
                                opacity: 0
                            }}
                        >
                            {/* Premium Soft Shadow Glow on Hover (Not too dark, very clean) */}
                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#4E5BF2] to-[#4AD8B4] opacity-0 group-hover:opacity-[0.08] blur-[20px] transition-all duration-500 pointer-events-none' />
                            
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

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default CardPage