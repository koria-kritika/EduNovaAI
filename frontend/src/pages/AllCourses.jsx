import React, { useState, useEffect } from 'react';
import Nav from '../component/Nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png";
import { useSelector } from 'react-redux';
import Card from '../component/Card';

function AllCourses() {
    const navigate = useNavigate();
    const { courseData } = useSelector(state => state.course);
    const [category, setCategory] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(c => c !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let courseCopy = courseData?.slice();
        if (category.length > 0) {
            courseCopy = courseCopy.filter(c => category.includes(c.category));
        }
        setFilterCourses(courseCopy);
    };

    useEffect(() => {
        setFilterCourses(courseData);
    }, [courseData]);

    useEffect(() => {
        applyFilter();
    }, [category]);

    const categories = [
        'App Development', 'AI/ML', 'AI Tools', 'Data Science',
        'Data Analytics', 'Ethical Hacking', 'UI UX Designing',
        'Web Development', 'Others'
    ];

    return (
        <div 
            className='flex min-h-screen relative overflow-hidden'
            style={{ 
                background: 'radial-gradient(circle at 85% 15%, #FFEBE0 0%, transparent 45%), radial-gradient(circle at 15% 85%, #E8F5E9 0%, transparent 45%), radial-gradient(circle at 50% 50%, #F3E8FF 0%, #FFFFFF 100%)' 
            }}
        >
            {/* Background Glow Orbs */}
            <div className='fixed top-[-60px] right-[10%] w-[380px] h-[380px] bg-[#6C5CE7]/4 rounded-full blur-3xl pointer-events-none z-0' />
            <div className='fixed bottom-[-60px] left-[20%] w-[380px] h-[380px] bg-[#4AD8B4]/4 rounded-full blur-3xl pointer-events-none z-0' />

            <Nav />

            {/* Mobile Filter Toggle Button */}
            <button
                className='fixed top-28 right-4 z-50 px-4 py-2 rounded-xl text-sm font-black md:hidden transition-all duration-300 shadow-md border'
                style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(78, 91, 242, 0.25)',
                    color: '#0E1B4D',
                }}
                onClick={() => setIsSidebarVisible(prev => !prev)}
            >
                {isSidebarVisible ? '✕ Hide' : '☰ Show'} Filters
            </button>

            {/* ── Translucent Sidebar ── */}
            <aside
                className={`w-[280px] h-screen overflow-y-auto fixed top-0 left-0 p-6 pt-[110px] border-r transition-transform duration-300 z-10
                    ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}
                style={{
                    background: 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(78, 91, 242, 0.12)',
                    boxShadow: '4px 0 32px rgba(14, 27, 77, 0.02)',
                }}
            >
                {/* Sidebar Header */}
                <div className='flex items-center gap-3 mb-6'>
                    <button
                        className='w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm'
                        style={{
                            background: 'rgba(78, 91, 242, 0.06)',
                            border: '1px solid rgba(78, 91, 242, 0.15)',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.14)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.06)'}
                        onClick={() => navigate("/")}
                    >
                        <FaArrowLeftLong className='text-[#4E5BF2] w-3.5 h-3.5' />
                    </button>
                    <h2 className='text-[15px] font-black tracking-tight text-[#0E1B4D]'>
                        Filter by Category
                    </h2>
                </div>

                {/* AI Search Button */}
                <button
                    className='w-full px-4 py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 mb-6 transition-all duration-300 shadow-md hover:scale-[1.01]'
                    style={{
                        background: 'linear-gradient(135deg, #4E5BF2 0%, #6C5CE7 100%)',
                        color: '#fff',
                    }}
                    onClick={() => navigate("/search")}
                >
                    Search with AI
                    <img src={ai} className='w-[24px] h-[24px] rounded-full ring-2 ring-white/30 object-cover' alt="AI Icon" />
                </button>

                {/* Divider */}
                <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#4E5BF2]/15 to-transparent mb-5' />

                {/* Category Filters Form */}
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-1.5'>
                    {categories.map((cat, i) => (
                        <label
                            key={i}
                            className='flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group border'
                            style={{
                                background: category.includes(cat) ? 'rgba(78, 91, 242, 0.06)' : 'transparent',
                                borderColor: category.includes(cat) ? 'rgba(78, 91, 242, 0.2)' : 'transparent',
                            }}
                            onMouseEnter={e => {
                                if (!category.includes(cat)) e.currentTarget.style.background = 'rgba(78, 91, 242, 0.03)'
                            }}
                            onMouseLeave={e => {
                                if (!category.includes(cat)) e.currentTarget.style.background = 'transparent'
                            }}
                        >
                            <input
                                type="checkbox"
                                className='w-4 h-4 rounded cursor-pointer'
                                style={{ accentColor: '#4E5BF2' }}
                                value={cat}
                                onChange={toggleCategory}
                                checked={category.includes(cat)}
                            />
                            <span className={`text-[14px] tracking-tight transition-colors ${category.includes(cat) ? 'text-[#4E5BF2] font-black' : 'text-[#5F6C85] font-bold group-hover:text-[#0E1B4D]'}`}>
                                {cat}
                            </span>
                            {category.includes(cat) && (
                                <div className='ml-auto w-1.5 h-1.5 rounded-full bg-[#4E5BF2]' />
                            )}
                        </label>
                    ))}
                </form>

                {/* Active Filter Counter */}
                {category.length > 0 && (
                    <div className='mt-5 px-3 py-2.5 rounded-xl flex items-center justify-between border'
                        style={{ background: '#F0FDF4', borderColor: 'rgba(34,197,94,0.2)' }}>
                        <span className='text-[#22C55E] text-xs font-black'>{category.length} Active Track{category.length > 1 ? 's' : ''}</span>
                        <button
                            className='text-[11px] text-[#5F6C85] font-black hover:text-[#0E1B4D] transition-colors underline decoration-dotted'
                            onClick={() => setCategory([])}
                        >
                            Reset
                        </button>
                    </div>
                )}

                {/* Bottom Decorative Line */}
                <div className='absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#4E5BF2]/20 to-transparent' />
            </aside>

            {/* ── Main Content Area ── */}
            <main className='w-full transition-all duration-300 py-[110px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-6 relative z-[1]'>

                {/* Page Dynamic Header */}
                <div className='w-full flex flex-col gap-1 mb-2 px-2'>
                    <div className='flex items-center gap-2.5'>
                        <div className='w-1.5 h-6 rounded-full bg-gradient-to-b from-[#4E5BF2] to-[#6C5CE7]' />
                        <h1 className='text-3xl font-black tracking-tight text-[#0E1B4D]'>
                            All Courses
                        </h1>
                    </div>
                    <p className='text-[#5F6C85] font-bold text-sm pl-4 mt-0.5'>
                        {filterCourses?.length || 0} Course{filterCourses?.length !== 1 ? 's' : ''} Found
                        {category.length > 0 ? ` under layers: ${category.join(', ')}` : ''}
                    </p>
                </div>

                {/* Course Grid Cards */}
                {filterCourses?.map((course, index) => (
                    <div
                        key={index}
                        className='relative group'
                        style={{
                            animation: `fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                            animationDelay: `${index * 0.04}s`,
                            opacity: 0,
                        }}
                    >
                        {/* Elegant Hover Backdrop Shadow */}
                        <div className='absolute inset-0 rounded-2xl bg-[#4E5BF2] opacity-0 group-hover:opacity-[0.04] blur-xl transition-all duration-500 pointer-events-none' />
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

                {/* Blank/Empty Query State */}
                {filterCourses?.length === 0 && (
                    <div className='w-full flex flex-col items-center justify-center py-24 gap-4'
                         style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '24px', border: '1px dashed rgba(78,91,242,0.15)' }}>
                        <div className='text-5xl filter grayscale opacity-80'></div>
                        <p className='text-[#0E1B4D] font-black text-xl tracking-tight'>No Active Course Found</p>
                        <p className='text-[#5F6C85] font-bold text-sm text-center max-w-xs'>Adjust your modular parameters or leverage AI matching engines.</p>
                        <button
                            className='px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border bg-white text-[#4E5BF2]'
                            style={{ borderColor: 'rgba(78, 91, 242, 0.25)' }}
                            onClick={() => setCategory([])}
                        >
                            Clear Parameters
                        </button>
                    </div>
                )}
            </main>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default AllCourses;