import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function CreateCourses() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreateCourse = async () => {
    if (!title.trim() || !category) {
      toast.error("Please fill in all details");
      return;
    }
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true })
      console.log(result.data)
      navigate("/courses")
      setLoading(false)
      toast.success("Course Created Successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden w-full'
      style={{ 
        /* Premium Premium Bright Aura Gradient background matching your dashboards */
        background: 'radial-gradient(circle at 85% 15%, #FFEBE0 0%, transparent 45%), radial-gradient(circle at 15% 85%, #E8F5E9 0%, transparent 45%), radial-gradient(circle at 50% 50%, #F3E8FF 0%, #FFFFFF 100%)' 
      }}
    >
      {/* Soft Decorative Fluid Orbs */}
      <div className='fixed top-[-60px] right-[12%] w-[380px] h-[380px] bg-[#6C5CE7]/5 rounded-full blur-3xl pointer-events-none' />
      <div className='fixed bottom-[-60px] left-[6%] w-[380px] h-[380px] bg-[#4AD8B4]/5 rounded-full blur-3xl pointer-events-none' />

      <div
        className='max-w-2xl w-full mx-auto p-8 md:p-10 rounded-2xl relative z-10 transition-all duration-300'
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(78, 91, 242, 0.15)',
          boxShadow: '0 20px 50px rgba(14, 27, 77, 0.05)',
        }}
      >
        {/* Absolute Back Navigation Arrow */}
        <button
          className='absolute top-7 left-7 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm'
          style={{
            background: 'rgba(78, 91, 242, 0.06)',
            border: '1px solid rgba(78, 91, 242, 0.15)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.14)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(78, 91, 242, 0.06)'}
          onClick={() => navigate("/courses")}
        >
          <FaArrowLeftLong className='text-[#4E5BF2] w-4 h-4' />
        </button>

        {/* Card Header Structure with Upscaled Typography */}
        <div className='text-center mb-8 pt-4'>
          <div className='flex items-center justify-center gap-3 mb-2'>
            <div className='w-10 h-[2px] bg-gradient-to-r from-transparent to-[#4E5BF2]' />
            <span className='text-[#6C5CE7] text-sm font-black tracking-widest uppercase'>
              Educator Studio
            </span>
            <div className='w-10 h-[2px] bg-gradient-to-l from-transparent to-[#6C5CE7]' />
          </div>
          <h2 className='text-3xl md:text-[35px] font-black tracking-tight text-[#0E1B4D]'>
            Create New Course
          </h2>
          <p className='text-[#5F6C85] text-[16px] font-semibold mt-2'>
            Fill in the essential data fields to draft your structural curriculum.
          </p>
        </div>

        {/* Elegant Minimal Divider Line */}
        <div
          className='w-full h-[1px] mb-8'
          style={{ background: 'linear-gradient(90deg, transparent, rgba(78, 91, 242, 0.2), transparent)' }}
        />

        <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>

          {/* Upscaled Input Block: Title */}
          <div>
            <label
              htmlFor="title"
              className='block text-[17px] font-black mb-2.5 text-[#0E1B4D]'
            >
              Course Core Title
            </label>
            <input
              type="text"
              id='title'
              placeholder='e.g. Masterclass in Web Architectures & Development'
              className='w-full rounded-xl px-5 py-4 text-[16px] font-bold outline-none transition-all duration-200 border bg-white'
              style={{
                borderColor: 'rgba(78, 91, 242, 0.2)',
                color: '#0E1B4D',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#4E5BF2'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(78, 91, 242, 0.08)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78, 91, 242, 0.2)'; e.currentTarget.style.boxShadow = 'none' }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Upscaled Input Block: Category */}
          <div>
            <label
              htmlFor="cat"
              className='block text-[17px] font-black mb-2.5 text-[#0E1B4D]'
            >
              Curriculum Category
            </label>
            <select
              id="cat"
              className='w-full rounded-xl px-5 py-4 text-[16px] font-bold outline-none transition-all duration-200 cursor-pointer border bg-white'
              style={{
                borderColor: 'rgba(78, 91, 242, 0.2)',
                color: category ? '#0E1B4D' : '#7C8BA1',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#4E5BF2'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(78, 91, 242, 0.08)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(78, 91, 242, 0.2)'; e.currentTarget.style.boxShadow = 'none' }}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" disabled style={{ color: '#7C8BA1' }}>
                Select Domain Category
              </option>
              {[
                'App Development', 'AI/ML', 'AI Tools', 'Data Science',
                'Data Analytics', 'Ethical Hacking', 'UI UX Designing',
                'Web Development', 'Others'
              ].map(cat => (
                <option
                  key={cat}
                  value={cat}
                  style={{ color: '#0E1B4D', fontWeight: '600' }}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Clean Realtime Preview Meta Pills (Slightly larger text) */}
          {(title || category) && (
            <div
              className='flex flex-wrap gap-2.5 p-4 rounded-xl transition-all duration-300'
              style={{
                background: 'rgba(78, 91, 242, 0.03)',
                border: '1px solid rgba(78, 91, 242, 0.08)',
              }}
            >
              {title && (
                <span
                  className='text-[14px] px-3.5 py-1.5 rounded-full font-black tracking-wide inline-flex items-center'
                  style={{
                    background: 'rgba(78, 91, 242, 0.08)',
                    border: '1px solid rgba(78, 91, 242, 0.2)',
                    color: '#4E5BF2',
                  }}
                >
                  {title.slice(0, 35)}{title.length > 35 ? '...' : ''}
                </span>
              )}
              {category && (
                <span
                  className='text-[14px] px-3.5 py-1.5 rounded-full font-black tracking-wide inline-flex items-center'
                  style={{
                    background: 'rgba(108, 92, 231, 0.08)',
                    border: '1px solid rgba(108, 92, 231, 0.2)',
                    color: '#6C5CE7',
                  }}
                >
                {category}
                </span>
              )}
            </div>
          )}

          {/* Primary Submit Action Trigger */}
          <button
            className='w-full py-4 rounded-xl text-[16px] font-black flex items-center justify-center transition-all duration-300 disabled:opacity-50 hover:scale-[1.01]'
            style={{
              background: 'linear-gradient(135deg, #4E5BF2 0%, #6C5CE7 100%)',
              color: '#fff',
              boxShadow: '0 6px 20px rgba(78, 91, 242, 0.2)',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              if (!loading) e.currentTarget.style.boxShadow = '0 8px 25px rgba(108, 92, 231, 0.35)'
            }}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 91, 242, 0.2)'}
            disabled={loading}
            onClick={handleCreateCourse}
          >
            {loading ? <ClipLoader size={24} color='white' /> : 'Create Course Blueprint'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateCourses