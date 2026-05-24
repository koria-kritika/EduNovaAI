

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
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/course/create", { title, category }, { withCredentials: true })
      console.log(result.data)
      navigate("/courses")
      setLoading(false)
      toast.success("Course Created")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden'
      style={{ background: '#0F172A' }}
    >
      {/* glow orbs */}
      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.08] rounded-full blur-[140px] pointer-events-none' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.08] rounded-full blur-[140px] pointer-events-none' />

      <div
        className='max-w-xl w-full mx-auto p-8 rounded-2xl relative z-10'
        style={{
          background: '#111827',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* back button */}
        <button
          className='absolute top-6 left-6 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300'
          style={{
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
          onClick={() => navigate("/courses")}
        >
          <FaArrowLeftLong className='text-[#3B82F6] w-3.5 h-3.5' />
        </button>

        {/* header */}
        <div className='text-center mb-8 pt-2'>
          <div className='flex items-center justify-center gap-2 mb-2'>
            <div className='w-8 h-[2px] bg-gradient-to-r from-transparent to-[#3B82F6]' />
            <span className='text-[#06B6D4] text-sm font-semibold tracking-widest uppercase'>
              Educator Panel
            </span>
            <div className='w-8 h-[2px] bg-gradient-to-l from-transparent to-[#8B5CF6]' />
          </div>
          <h2
            className='text-3xl font-bold'
            style={{
              background: 'linear-gradient(90deg, #E2E8F0, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Create New Course
          </h2>
          <p className='text-[#94A3B8] text-base mt-2'>
            Fill in the details to launch your course
          </p>
        </div>

        {/* divider */}
        <div
          className='w-full h-[1px] mb-7'
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }}
        />

        <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className='block text-base font-semibold mb-2'
              style={{ color: '#E2E8F0' }}
            >
              Course Title
            </label>
            <input
              type="text"
              id='title'
              placeholder='e.g. Complete Web Development Bootcamp'
              className='w-full rounded-xl px-4 py-3 text-base outline-none transition-all duration-200'
              style={{
                background: '#0F172A',
                border: '1px solid rgba(59,130,246,0.2)',
                color: '#E2E8F0',
              }}
              onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
              onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="cat"
              className='block text-base font-semibold mb-2'
              style={{ color: '#E2E8F0' }}
            >
              Course Category
            </label>
            <select
              id="cat"
              className='w-full rounded-xl px-4 py-3 text-base outline-none transition-all duration-200 cursor-pointer'
              style={{
                background: '#0F172A',
                border: '1px solid rgba(59,130,246,0.2)',
                color: category ? '#E2E8F0' : '#94A3B8',
              }}
              onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
              onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" style={{ background: '#111827', color: '#94A3B8' }}>
                Select Category
              </option>
              {[
                'App Development', 'AI/ML', 'AI Tools', 'Data Science',
                'Data Analytics', 'Ethical Hacking', 'UI UX Designing',
                'Web Development', 'Others'
              ].map(cat => (
                <option
                  key={cat}
                  value={cat}
                  style={{ background: '#111827', color: '#E2E8F0' }}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* preview pills */}
          {(title || category) && (
            <div
              className='flex flex-wrap gap-2 p-3 rounded-xl'
              style={{
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.1)',
              }}
            >
              {title && (
                <span
                  className='text-sm px-3 py-1 rounded-full font-medium'
                  style={{
                    background: 'rgba(59,130,246,0.12)',
                    border: '1px solid rgba(59,130,246,0.25)',
                    color: '#3B82F6',
                  }}
                >
                  📘 {title.slice(0, 30)}{title.length > 30 ? '...' : ''}
                </span>
              )}
              {category && (
                <span
                  className='text-sm px-3 py-1 rounded-full font-medium'
                  style={{
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    color: '#8B5CF6',
                  }}
                >
                  🏷️ {category}
                </span>
              )}
            </div>
          )}

          {/* submit button */}
          <button
            className='w-full py-3 rounded-xl text-base font-bold flex items-center justify-center transition-all duration-300 disabled:opacity-50'
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(59,130,246,0.4)',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => {
              if (!loading) e.currentTarget.style.boxShadow = '0 0 30px rgba(139,92,246,0.6)'
            }}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.4)'}
            disabled={loading}
            onClick={handleCreateCourse}
          >
            {loading ? <ClipLoader size={22} color='white' /> : ' Create Course'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default CreateCourses