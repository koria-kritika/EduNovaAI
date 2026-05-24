
import React from 'react'
import Nav from '../component/Nav'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png"
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../component/Card';

function AllCourses() {
    const navigate = useNavigate()
    const { courseData } = useSelector(state => state.course)
    const [category, setCategory] = useState([])
    const [filterCourses, setFilterCourses] = useState([])
    const [isSidebarVisible, setIsSidebarVisible] = useState(false)

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(c => c !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let courseCopy = courseData?.slice()
        if (category.length > 0) {
            courseCopy = courseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourses(courseCopy)
    }

    useEffect(() => {
        setFilterCourses(courseData)
    }, [courseData])

    useEffect(() => {
        applyFilter()
    }, [category])

    const categories = [
        'App Development', 'AI/ML', 'AI Tools', 'Data Science',
        'Data Analytics', 'Ethical Hacking', 'UI UX Designing',
        'Web Development', 'Others'
    ]

    return (
        <div className='flex min-h-screen bg-[#0F172A] relative overflow-hidden'>

            {/* background glow orbs */}
            <div className='fixed top-[-100px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.06] rounded-full blur-[140px] pointer-events-none z-0' />
            <div className='fixed bottom-[-100px] left-[20%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.06] rounded-full blur-[140px] pointer-events-none z-0' />

            <Nav />

            {/* mobile filter toggle button */}
            <button
                className='fixed top-20 left-4 z-50 px-4 py-1.5 rounded-lg text-sm font-semibold md:hidden transition-all duration-300'
                style={{
                    background: 'rgba(59,130,246,0.15)',
                    border: '1px solid rgba(59,130,246,0.4)',
                    color: '#E2E8F0',
                    boxShadow: '0 0 12px #3B82F640',
                }}
                onClick={() => setIsSidebarVisible(prev => !prev)}
            >
                {isSidebarVisible ? 'Hide' : 'Show'} Filters
            </button>

            {/* ── Sidebar ── */}
            <aside
                className={`w-[260px] h-screen overflow-y-auto fixed top-0 left-0 p-6 py-[110px] border-r transition-transform duration-300 z-10
                    ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}
                style={{
                    background: 'linear-gradient(180deg, #111827 0%, #0F172A 100%)',
                    borderColor: 'rgba(59,130,246,0.15)',
                }}
            >
                {/* sidebar header */}
                <div className='flex items-center gap-3 mb-6'>
                    <button
                        className='w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0'
                        style={{
                            background: 'rgba(59,130,246,0.1)',
                            border: '1px solid rgba(59,130,246,0.3)',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
                        onClick={() => navigate("/")}
                    >
                        <FaArrowLeftLong className='text-[#3B82F6] w-3 h-3' />
                    </button>
                    <h2
                        className='text-sm font-bold tracking-wide'
                        style={{
                            background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Filter by Category
                    </h2>
                </div>

                {/* AI Search button */}
                <button
                    className='w-full px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mb-5 transition-all duration-300'
                    style={{
                        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        color: '#fff',
                        boxShadow: '0 0 16px #3B82F655',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px #8B5CF688'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px #3B82F655'}
                    onClick={() => navigate("/search")}
                >
                    Search with AI
                    <img src={ai} className='w-[26px] h-[26px] rounded-full ring-2 ring-white/30' alt="" />
                </button>

                {/* divider */}
                <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent mb-4' />

                {/* category filters */}
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-1'>
                    {categories.map((cat, i) => (
                        <label
                            key={i}
                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group'
                            style={{
                                background: category.includes(cat) ? 'rgba(59,130,246,0.12)' : 'transparent',
                                border: category.includes(cat) ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                            }}
                            onMouseEnter={e => {
                                if (!category.includes(cat)) e.currentTarget.style.background = 'rgba(59,130,246,0.06)'
                            }}
                            onMouseLeave={e => {
                                if (!category.includes(cat)) e.currentTarget.style.background = 'transparent'
                            }}
                        >
                            <input
                                type="checkbox"
                                className='w-4 h-4 rounded cursor-pointer'
                                style={{ accentColor: '#3B82F6' }}
                                value={cat}
                                onChange={toggleCategory}
                                checked={category.includes(cat)}
                            />
                            <span className={`text-sm transition-colors ${category.includes(cat) ? 'text-[#3B82F6] font-medium' : 'text-[#94A3B8] group-hover:text-[#E2E8F0]'}`}>
                                {cat}
                            </span>
                            {category.includes(cat) && (
                                <div className='ml-auto w-1.5 h-1.5 rounded-full bg-[#3B82F6]' />
                            )}
                        </label>
                    ))}
                </form>

                {/* active filter count */}
                {category.length > 0 && (
                    <div className='mt-4 px-3 py-2 rounded-lg flex items-center justify-between'
                        style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
                        <span className='text-[#06B6D4] text-xs font-medium'>{category.length} filter{category.length > 1 ? 's' : ''} active</span>
                        <button
                            className='text-[10px] text-[#94A3B8] hover:text-[#E2E8F0] transition-colors'
                            onClick={() => setCategory([])}
                        >
                            Clear all
                        </button>
                    </div>
                )}

                {/* bottom glow line */}
                <div className='absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent' />
            </aside>

            {/* ── Main content ── */}
            <main className='w-full transition-all duration-300 py-[110px] md:pl-[280px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[20px] relative z-[1]'>

                {/* page header */}
                <div className='w-full flex flex-col gap-1 mb-2 px-2'>
                    <div className='flex items-center gap-2'>
                        <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
                        <h1
                            className='text-xl font-bold'
                            style={{
                                background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            All Courses
                        </h1>
                    </div>
                    <p className='text-[#94A3B8] text-xs pl-3'>
                        {filterCourses?.length || 0} course{filterCourses?.length !== 1 ? 's' : ''} found
                        {category.length > 0 ? ` in ${category.join(', ')}` : ''}
                    </p>
                </div>

                {/* course cards */}
                {filterCourses?.map((course, index) => (
                    <div
                        key={index}
                        className='relative group'
                        style={{
                            animation: `fadeSlideUp 0.4s ease forwards`,
                            animationDelay: `${index * 0.05}s`,
                            opacity: 0,
                        }}
                    >
                        {/* hover glow */}
                        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] opacity-0 group-hover:opacity-20 blur-[16px] transition-all duration-500 pointer-events-none' />
                        <Card
                            thumbnail={course.thumbnail}
                            title={course.title}
                            category={course.category}
                            price={`₹${course.price}`}
                            id={course._id}
                            reviews={course.reviews}
                        />
                    </div>
                ))}

                {/* empty state */}
                {filterCourses?.length === 0 && (
                    <div className='w-full flex flex-col items-center justify-center py-20 gap-4'>
                        <div className='text-5xl'>🔍</div>
                        <p className='text-[#E2E8F0] font-semibold text-lg'>No courses found</p>
                        <p className='text-[#94A3B8] text-sm'>Try removing some filters or search with AI</p>
                        <button
                            className='px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300'
                            style={{
                                background: 'rgba(59,130,246,0.15)',
                                border: '1px solid rgba(59,130,246,0.3)',
                                color: '#3B82F6',
                            }}
                            onClick={() => setCategory([])}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default AllCourses