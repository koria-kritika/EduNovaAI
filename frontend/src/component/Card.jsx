import React from 'react'
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function Card({ thumbnail, title, category, price, id, reviews }) {
  const navigate = useNavigate()

  const calculateAvgReview = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return 0
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return (total / reviews.length).toFixed(1)
  }

  const avgRating = calculateAvgReview(reviews)

  // Soft elegant badge tints
  const getBadgeStyles = (cat) => {
    const normalize = cat?.toLowerCase() || '';
    if (normalize.includes('web') || normalize.includes('code') || normalize.includes('dev')) {
      return { bg: '#FFFFFF', text: '#4E5BF2', border: 'rgba(78, 91, 242, 0.2)' }
    }
    return { bg: '#FFFFFF', text: '#6C5CE7', border: 'rgba(108, 92, 231, 0.2)' }
  }

  const badgeStyle = getBadgeStyles(category)

  return (
    <div
      onClick={() => navigate(`/viewcourse/${id}`)}
      className='max-w-[340px] w-full bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 relative group'
      style={{
        border: '1px solid rgba(78, 91, 242, 0.12)',
        boxShadow: '0 8px 24px rgba(14, 27, 77, 0.02)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(78, 91, 242, 0.25)';
        e.currentTarget.style.boxShadow = '0 20px 35px rgba(78, 91, 242, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(78, 91, 242, 0.12)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 27, 77, 0.02)';
      }}
    >
      {/* Top Section: Thumbnail */}
      <div className='w-full h-48 overflow-hidden relative'>
        <img
          src={thumbnail}
          alt={title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      {/* ── Bottom Content Frame with Light Purple-Blue Shade ── */}
      <div
        className='p-6 flex flex-col justify-between min-h-[170px] transition-all duration-300'
        style={{
          /* Image ke categories jaisa exclusive smooth blue-purple fluid shade background */
          background: 'linear-gradient(135deg, rgba(243, 232, 255, 0.7) 0%, rgba(224, 231, 255, 0.7) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.6)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(243, 232, 255, 0.9) 0%, rgba(224, 231, 255, 0.9) 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(243, 232, 255, 0.7) 0%, rgba(224, 231, 255, 0.7) 100%)';
        }}
      >
        <div className='space-y-3 flex-1'>
          {/* Shaded Rounded Badge */}
          <span
            className='inline-block px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm'
            style={{
              background: badgeStyle.bg,
              color: badgeStyle.text,
              border: `1px solid ${badgeStyle.border}`
            }}
          >
            {category}
          </span>

          {/* Course Title with Premium Contrast */}
          <h2 className='text-[17px] font-bold text-[#0E1B4D] line-clamp-2 leading-snug group-hover:text-[#4E5BF2] transition-colors duration-200'>
            {title}
          </h2>
        </div>

        {/* Metrics Footer (Price & Stars) */}
        <div className='flex items-center justify-between text-sm mt-4 pt-4 border-t border-[#0E1B4D]/5'>
          {/* Bold Deep Navy Price Tag */}
          <span className='text-[16px] font-extrabold text-[#0E1B4D]'>
            {price}
          </span>

          {/* Premium Glass-looking Star Pill */}
          <div className='flex items-center gap-1.5 bg-white/90 px-2.5 py-1 rounded-xl border border-amber-200/60 shadow-sm'>
            <FaStar className='text-amber-500 w-[13px] h-[13px]' />
            <span className='font-bold text-amber-900 text-xs'>
              {avgRating > 0 ? avgRating : "New"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card