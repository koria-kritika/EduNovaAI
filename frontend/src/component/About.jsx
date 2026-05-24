
import React from 'react'
import about from '../assets/about.jpg'
import video from "../assets/video.mp4"
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs";

function About() {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px] bg-[#0F172A] relative overflow-hidden'>

      {/* background glow effects */}
      <div className='absolute top-[-80px] left-[-80px] w-[350px] h-[350px] bg-[#3B82F6] opacity-10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] bg-[#8B5CF6] opacity-10 rounded-full blur-[120px] pointer-events-none' />

      {/* image side */}
      <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
        <div className='relative'>
          {/* glow ring behind image */}
          <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[18px] opacity-30 scale-105' />
          <img
            src={about}
            alt=""
            className='w-[80%] h-[90%] rounded-lg relative z-10 border border-[#1E293B]'
          />
        </div>

        <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%] z-20'>
          <div className='relative'>
            <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] blur-[10px] opacity-40' />
            <video
              src={video}
              className='w-full rounded-xl shadow-2xl border-2 border-[#3B82F6] relative z-10'
              controls
              autoPlay
              loop
            />
          </div>
        </div>
      </div>

      {/* info side */}
      <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px]'>

        {/* About Us label */}
        <div className='flex text-[18px] items-center justify-center gap-[20px] text-[#06B6D4] font-medium tracking-widest uppercase'>
          About Us
          <TfiLayoutLineSolid className='w-[40px] h-[40px] text-[#3B82F6]' />
        </div>

        {/* heading */}
        <div className='md:text-[45px] text-[35px] font-semibold leading-tight mt-2'>
          <span className='text-[#E2E8F0]'>We Are </span>
          <span className='bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent'>
            Maximize Your
          </span>
          <span className='text-[#E2E8F0]'> Learning Growth</span>
        </div>

        {/* description */}
        <div className='text-[15px] text-[#94A3B8] mt-3 leading-relaxed'>
          We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
        </div>

        {/* feature checks */}
        <div className='w-[100%] lg:w-[70%] mt-[40px]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-[10px] text-[#E2E8F0] group'>
              <div className='w-8 h-8 rounded-full bg-[#1E293B] border border-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] transition-all duration-300'>
                <BsFillPatchCheckFill className='w-[14px] h-[14px] text-[#3B82F6] group-hover:text-white transition-all duration-300' />
              </div>
              <span className='text-sm font-medium'>Safe classrooms for discussions</span>
            </div>
            <div className='flex items-center gap-[10px] text-[#E2E8F0] group'>
              <div className='w-8 h-8 rounded-full bg-[#1E293B] border border-[#8B5CF6] flex items-center justify-center group-hover:bg-[#8B5CF6] transition-all duration-300'>
                <BsFillPatchCheckFill className='w-[14px] h-[14px] text-[#8B5CF6] group-hover:text-white transition-all duration-300' />
              </div>
              <span className='text-sm font-medium'>Expert Trainers</span>
            </div>
          </div>

          <div className='flex items-center justify-between mt-[30px]'>
            <div className='flex items-center gap-[10px] text-[#E2E8F0] group'>
              <div className='w-8 h-8 rounded-full bg-[#1E293B] border border-[#06B6D4] flex items-center justify-center group-hover:bg-[#06B6D4] transition-all duration-300'>
                <BsFillPatchCheckFill className='w-[14px] h-[14px] text-[#06B6D4] group-hover:text-white transition-all duration-300' />
              </div>
              <span className='text-sm font-medium'>Search content with AI Voice assistance</span>
            </div>
            <div className='flex items-center gap-[10px] text-[#E2E8F0] group'>
              <div className='w-8 h-8 rounded-full bg-[#1E293B] border border-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] transition-all duration-300'>
                <BsFillPatchCheckFill className='w-[14px] h-[14px] text-[#3B82F6] group-hover:text-white transition-all duration-300' />
              </div>
              <span className='text-sm font-medium'>LifeTime Access</span>
            </div>
          </div>
        </div>

        {/* bottom accent line */}
        <div className='mt-10 w-[120px] h-[3px] rounded-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4]' />
      </div>

    </div>
  )
}

export default About