import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard'

function ReviewPage() {
   const { reviewData } = useSelector(state => state.review)
   const [latestReview, setLatestReview] = useState([])

   useEffect(() => {
     if (Array.isArray(reviewData)) {
       setLatestReview(
          reviewData?.filter((review) => review?.course && review?.user)?.slice(0, 6)
       )
     }
   }, [reviewData])

  return (
    <div 
      className='flex items-center justify-center flex-col relative overflow-hidden w-full'
      style={{
        /* Bright Fluid Mesh Background mixing Mint Green, Purple, and Soft Peach exactly like your reference image */
        background: 'radial-gradient(circle at 15% 15%, #E8F5E9 0%, transparent 40%), radial-gradient(circle at 85% 85%, #FFEBE0 0%, transparent 40%), radial-gradient(circle at 50% 50%, #F3E8FF 0%, #FFFFFF 100%)',
      }}
    >
      {/* Background Soft Organic Floating Elements */}
      <div className='absolute top-[20%] right-[5%] w-[150px] h-[150px] bg-gradient-to-tr from-[#6C5CE7]/10 to-[#4E5BF2]/10 rounded-full blur-2xl pointer-events-none' />
      <div className='absolute bottom-[20%] left-[2%] w-[130px] h-[130px] bg-gradient-to-tr from-[#4AD8B4]/10 to-[#E8F5E9]/15 rounded-full blur-xl pointer-events-none' />

      {/* Section Label */}
      <div className='flex items-center gap-3 mt-[70px]'>
        <div className='w-8 h-[2px] bg-gradient-to-r from-transparent to-[#4E5BF2]' />
        <span className='text-[#4E5BF2] text-xs font-bold tracking-widest uppercase'>
          Student Reviews
        </span>
        <div className='w-8 h-[2px] bg-gradient-to-l from-transparent to-[#4AD8B4]' />
      </div>

      {/* Heading with Clean Premium Contrast */}
      <h1 className='md:text-[42px] text-[32px] font-extrabold text-center mt-[12px] px-[20px] leading-tight text-[#0E1B4D]'>
        Real Reviews for{' '}
        <span 
          style={{
            background: 'linear-gradient(90deg, #4E5BF2, #6C5CE7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Real Courses
        </span>
      </h1>

      {/* Subtext */}
      <p className='lg:w-[50%] md:w-[75%] text-[15px] text-center mt-[16px] mb-[24px] px-[20px] text-[#5F6C85] font-medium leading-relaxed'>
        Discover how our Virtual Courses are transforming learning experiences through real feedback from students and professionals worldwide.
      </p>

      {/* Pastel Soft Gradient Divider */}
      <div 
        className='w-[80px] h-[3.5px] rounded-full mb-[50px]' 
        style={{
          background: 'linear-gradient(90deg, #4E5BF2, #FF8A8A, #4AD8B4)'
        }}
      />

      {/* Review Cards Grid Wrapper */}
      <div className='w-[100%] min-h-[60vh] flex items-center justify-center flex-wrap gap-[35px] lg:px-[80px] md:px-[40px] px-[20px] pb-[90px]'>
        {!latestReview || latestReview.length === 0 ? (
          <p className='text-[#5F6C85] font-medium text-sm bg-white/50 px-6 py-3 rounded-xl border border-gray-100 shadow-sm'>
            No reviews available yet.
          </p>
        ) : (
          latestReview.map((review, index) => (
            <div
              key={review._id || index}
              className='relative group transition-transform duration-300 hover:-translate-y-1'
              style={{
                animation: `fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${index * 0.08}s`,
                opacity: 0
              }}
            >
              {/* Soft Subtle Translucent Hover Glow leaking from behind */}
              <div className='absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#4E5BF2] to-[#4AD8B4] opacity-0 group-hover:opacity-[0.06] blur-[20px] transition-all duration-500 pointer-events-none' />
              
              <ReviewCard
                comment={review.comment}
                rating={review.rating}
                photoUrl={review.user?.photoUrl}
                courseTitle={review.course?.title}
                description={review.user?.description}
                name={review.user?.name}
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

export default ReviewPage