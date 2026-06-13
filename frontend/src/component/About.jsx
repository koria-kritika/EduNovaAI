import React from 'react'
import image from '../assets/image.png'
import video from "../assets/video.mp4"
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs";

function About() {
  return (
    <div 
      className='w-full lg:min-h-[85vh] py-20 flex items-center justify-center relative overflow-hidden'
      style={{
        background: 'radial-gradient(circle at 80% 20%, #FFEBE0 0%, transparent 45%), radial-gradient(circle at 20% 80%, #E8F5E9 0%, transparent 40%), radial-gradient(circle at 50% 50%, #F3E8FF 0%, #FFFFFF 100%)',
      }}
    >
      {/* Background Soft Organic Floating Element Orbs */}
      <div className='absolute top-[-40px] right-[10%] w-[300px] h-[300px] bg-[#6C5CE7]/5 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-[-40px] left-[10%] w-[350px] h-[350px] bg-[#4AD8B4]/5 rounded-full blur-3xl pointer-events-none' />

      {/* Full-width Responsive Container */}
      <div className='w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-12'>
        
        {/* ── Image & Media Content Side ── */}
        <div className='w-full lg:w-[46%] flex items-center justify-center relative min-h-[420px] lg:min-h-0'>
          <div className='relative w-[80%] max-w-[420px] aspect-[4/5] lg:mb-6'>
            <div className='absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#4E5BF2] to-[#4AD8B4] blur-[24px] opacity-[0.14] scale-105' />
            <img
              src={image}
              alt="About Us"
              className='w-full h-full object-cover rounded-3xl relative z-10 border border-white/80 shadow-[0_20px_45px_rgba(14,27,77,0.08)]'
            />
          </div>

          {/* Floating Mini Video Frame */}
          <div className='w-[260px] md:w-[320px] absolute bottom-[-10px] lg:bottom-10 md:right-[10%] right-[4%] z-20 transition-transform duration-300 hover:scale-102'>
            <div className='relative'>
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#6C5CE7] to-[#FF8A8A] blur-[15px] opacity-[0.15]' />
              <video
                src={video}
                className='w-full rounded-2xl shadow-[0_25px_50px_rgba(14,27,77,0.15)] border-[5px] border-white relative z-10'
                controls
                autoPlay
                loop
                muted
              />
            </div>
          </div>
        </div>

        {/* ── Info Copywriting Content Side ── */}
        <div className='w-full lg:w-[50%] flex items-start justify-center flex-col mt-8 lg:mt-0'>

          {/* About Us Label */}
          <div className='flex text-[15px] items-center justify-center gap-3 text-[#4E5BF2] font-black tracking-widest uppercase'>
            About Us
            <TfiLayoutLineSolid className='w-[40px] h-[2px] text-[#4AD8B4]' />
          </div>

          {/* Big Ultra-Bold Heading */}
          <div className='md:text-[48px] text-[36px] font-black leading-tight mt-4 text-[#0E1B4D] tracking-tight'>
            We Are{' '}
            <span 
              style={{
                background: 'linear-gradient(90deg, #4E5BF2, #6C5CE7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Maximize Your
            </span>
            <br />Learning Growth
          </div>

          {/* Larger Description Copy */}
          <div className='text-[16px] md:text-[17px] text-[#5F6C85] font-semibold mt-5 leading-relaxed max-w-[620px]'>
            We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
          </div>

          {/* Feature Checks Matrix Grid (Bigger Fonts) */}
          <div className='w-full max-w-[650px] mt-10 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8'>
            {[
              { label: 'Safe classrooms for discussions', color: '#4E5BF2', bg: 'rgba(78, 91, 242, 0.08)' },
              { label: 'Expert Trainers', color: '#6C5CE7', bg: 'rgba(108, 92, 231, 0.08)' },
              { label: 'Search content with AI Voice', color: '#4AD8B4', bg: 'rgba(74, 216, 180, 0.08)' },
              { label: 'LifeTime Access', color: '#FF8A8A', bg: 'rgba(255, 138, 138, 0.08)' }
            ].map((item, index) => (
              <div key={index} className='flex items-center gap-4 group cursor-default'>
                <div 
                  className='w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0'
                  style={{ backgroundColor: item.bg }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = item.color;
                    e.currentTarget.querySelector('svg').style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = item.bg;
                    e.currentTarget.querySelector('svg').style.color = item.color;
                  }}
                >
                  <BsFillPatchCheckFill 
                    className='w-[16px] h-[16px] transition-colors duration-300' 
                    style={{ color: item.color }}
                  />
                </div>
                <span className='text-[15px] md:text-[16px] font-bold text-[#0E1B4D]/90 transition-colors duration-200 group-hover:text-[#4E5BF2]'>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Shaded Accent Divider Line */}
          <div className='mt-12 w-[110px] h-[4px] rounded-full bg-gradient-to-r from-[#4E5BF2] via-[#FF8A8A] to-[#4AD8B4]' />
        </div>

      </div>
    </div>
  )
}

export default About