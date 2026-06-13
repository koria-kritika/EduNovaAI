// import React from 'react'
// import { FaStar } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// function ReviewCard({comment ,rating , photoUrl , name , description , courseTitle}) {
//   return (
//     <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full'>

//         <div className='flex items-center mb-3 text-yellow-400 text-sm'>
//             {
//                 Array(5).fill(0).map((_,i)=>(
//                     <span key={1}>
//                         {i < rating ? <FaStar/> : <FaRegStar/>}
//                     </span>
//                 ))
//             }
//         </div>
//         <p className='text-gray-700 text-sm '>Review For :  <span className='font-semibold'>{courseTitle}</span></p>
//         <p className='text-gray-700 text-sm mb-5'>Review : <span className='font-semibold'>{comment}</span></p>
//         <div className='flex items-center gap-2 '>
//             <img src={photoUrl} className='w-10 h-10 rounded-full object-cover' alt="" />
//             <div>
//              <h2 className='font-semibold text-gray-800 text-sm'>{name}</h2>
//             <p className='text-xs text-gray-500'>{description}</p>
//             </div>
//         </div>
        
           
      
//     </div>
//   )
// }

// export default ReviewCard

import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle }) {
  return (
    <div 
      className='p-6 rounded-3xl transition-all duration-300 max-w-sm w-full group relative overflow-hidden'
      style={{
        /* Same beautiful image style: Soft Peach blended into Purple-Blue pastel base */
        background: 'linear-gradient(135deg, rgba(255, 235, 224, 0.6) 0%, rgba(243, 232, 255, 0.7) 50%, rgba(224, 231, 255, 0.6) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(78, 91, 242, 0.12)',
        boxShadow: '0 8px 24px rgba(14, 27, 77, 0.02)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = 'rgba(78, 91, 242, 0.25)';
        e.currentTarget.style.boxShadow = '0 16px 32px rgba(78, 91, 242, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(78, 91, 242, 0.12)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(14, 27, 77, 0.02)';
      }}
    >
      {/* Stars Rating Badge Row */}
      <div className='flex items-center gap-1 mb-4 text-amber-500 text-sm bg-white/70 w-fit px-2.5 py-1 rounded-xl border border-amber-200/40 shadow-sm'>
        {
          Array(5).fill(0).map((_, i) => (
            <span key={i} className='transition-transform duration-300 group-hover:scale-110'>
              {i < rating ? <FaStar className='text-amber-500' /> : <FaRegStar className='text-gray-300' />}
            </span>
          ))
        }
      </div>

      {/* Review Content Frame */}
      <div className='space-y-2 mb-6'>
        <p className='text-[#5F6C85] text-xs font-semibold uppercase tracking-wider'>
          Review For : <span className='text-[#4E5BF2] normal-case font-bold'>{courseTitle}</span>
        </p>
        
        <p className='text-[#0E1B4D] text-[15px] font-medium leading-relaxed italic'>
          "{comment}"
        </p>
      </div>

      {/* User Info Profile Footer */}
      <div className='flex items-center gap-3 pt-4 border-t border-[#0E1B4D]/5'>
        <img 
          src={photoUrl} 
          className='w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform duration-300 group-hover:scale-105' 
          alt={name} 
        />
        <div>
          <h2 className='font-bold text-[#0E1B4D] text-[14px] leading-tight'>
            {name}
          </h2>
          <p className='text-xs text-[#5F6C85] font-medium mt-0.5'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard