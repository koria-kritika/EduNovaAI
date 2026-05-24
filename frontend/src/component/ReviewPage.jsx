import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard'

function ReviewPage() {
   const {reviewData} = useSelector(state=>state.review)
   const [latestReview,setLatestReview] = useState(null)


  useEffect(()=>{
   setLatestReview(
      reviewData?.filter((review) => review?.course && review?.user)?.slice(0,6)
   )
},[reviewData])

  return (
    <div className='flex items-center justify-center flex-col bg-[#0F172A] relative overflow-hidden'>

      {/* background glow orbs */}
      <div className='absolute top-[0px] left-[10%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[130px] pointer-events-none' />
      <div className='absolute bottom-[0px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[130px] pointer-events-none' />
      <div className='absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-[#06B6D4] opacity-[0.05] rounded-full blur-[100px] pointer-events-none' />

      {/* section label */}
      <div className='flex items-center gap-3 mt-[50px]'>
        <div className='w-8 h-[2px] bg-gradient-to-r from-transparent to-[#3B82F6]' />
        <span className='text-[#06B6D4] text-sm font-semibold tracking-widest uppercase'>
          Student Reviews
        </span>
        <div className='w-8 h-[2px] bg-gradient-to-l from-transparent to-[#8B5CF6]' />
      </div>

      {/* heading */}
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[16px] px-[20px] leading-tight'>
        <span className='text-[#E2E8F0]'>Real Reviews for </span>
        <span className='bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent'>
          Real Courses
        </span>
      </h1>

      {/* subtext */}
      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[20px] mb-[40px] px-[20px] text-[#94A3B8] leading-relaxed'>
        Discover how our Virtual Courses is transforming learning experiences through real feedback from students and professionals worldwide.
      </span>

      {/* divider */}
      <div className='w-[80px] h-[3px] rounded-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#06B6D4] mb-[50px]' />

      {/* review cards */}
      <div className='w-[100%] min-h-[100vh] flex items-center justify-center flex-wrap gap-[30px] lg:px-[80px] md:px-[40px] px-[20px] pb-[80px]'>
        {latestReview?.map((review, index) => (
          <div
            key={index}
            className='relative group'
            style={{
              animation: `fadeSlideUp 0.5s ease forwards`,
              animationDelay: `${index * 0.1}s`,
              opacity: 0
            }}
          >
            {/* card glow on hover */}
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] opacity-0 group-hover:opacity-20 blur-[15px] transition-all duration-500 pointer-events-none' />
            <ReviewCard
              comment={review.comment}
              rating={review.rating}
              photoUrl={review.user.photoUrl}
              courseTitle={review.course.title}
              description={review.user.description}
              name={review.user.name}
            />
          </div>
        ))}
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

export default ReviewPage