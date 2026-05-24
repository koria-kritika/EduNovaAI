// 
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
          background: '#1E293B',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: 10,
          padding: '10px 16px',
          color: '#E2E8F0',
          fontSize: 13,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>
          <p style={{ color: '#94A3B8', marginBottom: 4 }}>{label}</p>
          <p style={{ color: '#3B82F6', fontWeight: 700 }}>{payload[0].value}</p>
        </div>
      )
    }
    return null;
  }

  return (
    <div className='flex min-h-screen relative' style={{ background: '#0F172A' }}>

      {/* background glow orbs */}
      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />

      {/* back button */}
      <button
        className='absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300'
        style={{
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.3)',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className='text-[#3B82F6] w-4 h-4' />
      </button>

      <div className='w-full px-6 py-10 space-y-8 relative z-[1]'>

        {/* ── Profile + Earning card ── */}
        <div
          className='max-w-5xl mx-auto rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 mt-8'
          style={{
            background: '#111827',
            border: '1px solid rgba(59,130,246,0.15)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* avatar */}
          <div className='relative flex-shrink-0'>
            <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[10px] opacity-50' />
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                className='w-28 h-28 rounded-full object-cover relative z-10'
                style={{ border: '3px solid rgba(59,130,246,0.5)' }}
                alt="Educator"
              />
            ) : (
              <div
                className='w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black relative z-10'
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  color: '#fff',
                  border: '3px solid rgba(59,130,246,0.5)',
                }}
              >
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          {/* info */}
          <div className='text-center md:text-left space-y-3 flex-1'>
            <h1
              className='text-3xl font-bold'
              style={{
                background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome, {userData?.name || "Educator"} 👋
            </h1>

            {/* earning pill */}
            <div
              className='inline-flex items-center gap-2 px-4 py-2 rounded-xl'
              style={{
                background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.25)',
              }}
            >
              <span className='text-2xl font-bold' style={{
                background: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ₹{totalEarning.toLocaleString()}
              </span>
              <span className='text-base text-[#94A3B8] font-medium'>Total Earnings</span>
            </div>

            <p className='text-large text-[#94A3B8] leading-relaxed'>
              {userData?.description || "Start Creating Courses for Your Students"}
            </p>

            <button
              className='px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-300'
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                color: '#fff',
                boxShadow: '0 0 16px rgba(59,130,246,0.4)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px rgba(139,92,246,0.6)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.4)'}
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
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              <p className='text-2xl font-bold text-[#3B82F6]'>
                {creatorCourseData?.length || 0}
              </p>
              <p className='text-base text-[#94A3B8]'>Courses</p>
            </div>
            <div
              className='px-5 py-3 rounded-xl text-center'
              style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <p className='text-2xl font-bold text-[#8B5CF6]'>
                {creatorCourseData?.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0) || 0}
              </p>
              <p className='text-base text-[#94A3B8]'>Students</p>
            </div>
          </div>
        </div>

        {/* ── Charts ── */}
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* Course Progress chart */}
          <div
            className='rounded-2xl p-6'
            style={{
              background: '#111827',
              border: '1px solid rgba(59,130,246,0.15)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
              <h2 className='text-xl font-bold text-[#E2E8F0]'>Course Progress</h2>
              <span
                className='ml-auto text-base px-2 py-0.5 rounded-full font-medium'
                style={{
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  color: '#3B82F6',
                }}
              >
                Lectures
              </span>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={CourseProgressData} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(59,130,246,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#94A3B8', fontSize: 13 }}
                  axisLine={{ stroke: 'rgba(59,130,246,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#94A3B8', fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.05)' }} />
                <Bar
                  dataKey="lectures"
                  radius={[6, 6, 0, 0]}
                  fill="url(#blueGrad)"
                />
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment chart */}
          <div
            className='rounded-2xl p-6'
            style={{
              background: '#111827',
              border: '1px solid rgba(139,92,246,0.15)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#06B6D4]' />
              <h2 className='text-xl font-bold text-[#E2E8F0]'>Student Enrollment</h2>
              <span
                className='ml-auto text-base px-2 py-0.5 rounded-full font-medium'
                style={{
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  color: '#8B5CF6',
                }}
              >
                Students
              </span>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={EnrollData} barSize={28}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(139,92,246,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#94A3B8', fontSize: 13 }}
                  axisLine={{ stroke: 'rgba(139,92,246,0.1)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#94A3B8', fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139,92,246,0.05)' }} />
                <Bar
                  dataKey="enrolled"
                  radius={[6, 6, 0, 0]}
                  fill="url(#purpleGrad)"
                />
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
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