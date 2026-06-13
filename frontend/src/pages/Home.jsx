

// import React from 'react'
// import Nav from '../component/Nav'
// import home from "../assets/home1.jpg"
// import { SiViaplay } from "react-icons/si";
// import ai from "../assets/ai.png"
// import ai1 from "../assets/SearchAi.png"
// import Logos from '../component/Logos';
// import ExploreCourses from '../component/ExploreCourses';
// import CardPage from '../component/CardPage';
// import { useNavigate } from 'react-router-dom';
// import About from '../component/About';
// import Footer from '../component/Footer';
// import ReviewPage from '../component/ReviewPage';

// function Home() {
//   const navigate = useNavigate()
//   return (
//     <div className='w-[100%] overflow-hidden bg-[#0F172A]'>

//       {/* Hero Section */}
//       <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
//         <Nav />

//         {/* Hero image with dark overlay + blue-purple gradient tint */}
//         <div className='relative w-[100%] lg:h-[100%] h-[50vh]'>
//           <img
//             src={home}
//             className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]'
//             alt=""
//           />
//           {/* Gradient overlay */}
//           <div className='absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-[#1E293B]/40 to-[#0F172A]/90'></div>
//           {/* Subtle blue-purple glow at bottom */}
//           <div className='absolute bottom-0 left-0 w-[100%] h-[40%] bg-gradient-to-t from-[#3B82F6]/10 via-[#8B5CF6]/5 to-transparent'></div>
//         </div>

//         {/* Headline line 1 */}
//         <span
//           className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center font-bold text-[20px]'
//           style={{
//             background: 'linear-gradient(90deg, #E2E8F0 0%, #06B6D4 50%, #8B5CF6 100%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             textShadow: 'none',
//             filter: 'drop-shadow(0 0 24px #3B82F6aa)',
//           }}
//         >
//           Grow Your Skills to Advance
//         </span>

//         {/* Headline line 2 */}
//         <span
//           className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center font-bold'
//           style={{
//             background: 'linear-gradient(90deg, #8B5CF6 0%, #3B82F6 60%, #06B6D4 100%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             textShadow: 'none',
//             filter: 'drop-shadow(0 0 20px #8B5CF6aa)',
//           }}
//         >
//           Your Career Path
//         </span>

//         {/* CTA Buttons */}
//         <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-4 flex-wrap px-4'>

//           {/* View All Courses — ghost/outline with cyan glow */}
//           <button
//             onClick={() => navigate("/allcourses")}
//             className='group relative px-[24px] py-[12px] rounded-[12px] text-[18px] font-semibold flex gap-2 items-center cursor-pointer overflow-hidden transition-all duration-300'
//             style={{
//               border: '2px solid #06B6D4',
//               color: '#E2E8F0',
//               background: 'rgba(6,182,212,0.08)',
//               boxShadow: '0 0 16px #06B6D455, inset 0 0 12px #06B6D415',
//             }}
//             onMouseEnter={e => {
//               e.currentTarget.style.background = 'rgba(6,182,212,0.20)';
//               e.currentTarget.style.boxShadow = '0 0 28px #06B6D488, inset 0 0 16px #06B6D430';
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
//               e.currentTarget.style.boxShadow = '0 0 16px #06B6D455, inset 0 0 12px #06B6D415';
//             }}
//           >
//             View All Courses
//             <SiViaplay className='w-[24px] h-[24px]' style={{ fill: '#06B6D4' }} />
//           </button>

//           {/* Search With AI — solid gradient with purple-blue glow */}
//           <button
//             onClick={() => navigate("/search")}
//             className='group px-[24px] py-[12px] rounded-[12px] text-[18px] font-semibold flex gap-2 items-center justify-center cursor-pointer transition-all duration-300'
//             style={{
//               background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
//               color: '#fff',
//               boxShadow: '0 0 20px #8B5CF688, 0 4px 24px #3B82F655',
//             }}
//             onMouseEnter={e => {
//               e.currentTarget.style.boxShadow = '0 0 36px #8B5CF6aa, 0 4px 32px #3B82F677';
//               e.currentTarget.style.transform = 'translateY(-2px)';
//             }}
//             onMouseLeave={e => {
//               e.currentTarget.style.boxShadow = '0 0 20px #8B5CF688, 0 4px 24px #3B82F655';
//               e.currentTarget.style.transform = 'translateY(0)';
//             }}
//           >
//             Search With AI
//             <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block ring-2 ring-white/30' alt="" />
//             <img src={ai1} className='w-[35px] h-[35px] rounded-full lg:hidden ring-2 ring-white/30' alt="" />
//           </button>

//         </div>
//       </div>

//       {/* All sub-components inherit the dark background */}
//       <Logos />
//       <ExploreCourses />
//       <CardPage />
//       <About />
//       <ReviewPage />
//       <Footer />
//     </div>
//   )
// }

// export default Home


import React from 'react'
import Nav from '../component/Nav'
import home from "../assets/home1.jpg"
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import Logos from '../component/Logos';
import ExploreCourses from '../component/ExploreCourses';
import CardPage from '../component/CardPage';
import { useNavigate } from 'react-router-dom';
import About from '../component/About';
import Footer from '../component/Footer';
import ReviewPage from '../component/ReviewPage';

function Home() {
  const navigate = useNavigate()
  return (
    <div className='w-[100%] overflow-hidden forced-font-container' style={{ background: 'linear-gradient(135deg, #FFF0E5 0%, #F5F3FF 40%, #E8F5E9 100%)' }}>
      
      {/* Design Typography and Refined Premium Text Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .forced-font-container, 
        .forced-font-container *, 
        .forced-font-container h1, 
        .forced-font-container h2, 
        .forced-font-container p, 
        .forced-font-container span, 
        .forced-font-container button {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        }

        .attractive-headline {
          letter-spacing: -0.02em;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
          text-shadow: 0px 4px 12px rgba(15,  23,  42, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Nav />

        {/* Hero image container */}
        <div className='relative w-[100%] lg:h-[100%] h-[50vh]'>
          <img
            src={home}
            className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]'
            alt=""
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3FF]/10 to-transparent'></div>
          <div className='absolute bottom-0 left-0 w-[100%] h-[40%] bg-gradient-to-t from-[#4E5BF2]/10 via-[#6C5CE7]/5 to-transparent'></div>
        </div>

        {/* Headline line 1 — Clean, crisp premium white to subtle platinum metallic gradient */}
        <span
          className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center font-extrabold text-[20px] attractive-headline'
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Grow Your Skills to Advance
        </span>

        {/* Headline line 2 — Premium ice-blue/cyan premium accent tint for that modern tech look */}
        <span
          className='lg:text-[70px] text-[20px] md:text-[40px] absolute lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center font-extrabold attractive-headline'
          style={{
            background: 'linear-gradient(180deg, #E0F2FE 0%, #38BDF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Your Career Path
        </span>

        {/* CTA Buttons Layout */}
        <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-4 flex-wrap px-4'>

          {/* View All Courses */}
          <button
            onClick={() => navigate("/allcourses")}
            className='group relative px-[24px] py-[12px] rounded-[12px] text-[18px] font-semibold flex gap-2 items-center cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95'
            style={{
              border: '2px solid #4E5BF2',
              color: '#4E5BF2',
              background: 'rgba(78, 91, 242, 0.05)',
              boxShadow: '0 4px 14px rgba(78, 91, 242, 0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(78, 91, 242, 0.12)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 91, 242, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(78, 91, 242, 0.05)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(78, 91, 242, 0.15)';
            }}
          >
            View All Courses
            <SiViaplay className='w-[24px] h-[24px] transition-transform duration-300 group-hover:translate-x-1' style={{ fill: '#4E5BF2' }} />
          </button>

          {/* Search With AI */}
          <button
            onClick={() => navigate("/search")}
            className='group px-[24px] py-[12px] rounded-[12px] text-[18px] font-semibold flex gap-2 items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95'
            style={{
              background: 'linear-gradient(135deg, #4E5BF2 0%, #6C5CE7 100%)',
              color: '#fff',
              boxShadow: '0 6px 20px rgba(78, 91, 242, 0.25)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(78, 91, 242, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(78, 91, 242, 0.25)';
            }}
          >
            Search With AI
            <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block ring-2 ring-white/30 transition-transform duration-300 group-hover:rotate-12' alt="" />
            <img src={ai1} className='w-[35px] h-[35px] rounded-full lg:hidden ring-2 ring-white/30' alt="" />
          </button>

        </div>
      </div>

      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  )
}

export default Home