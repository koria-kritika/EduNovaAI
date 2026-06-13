import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong, FaSignal } from "react-icons/fa6"; 
import { FaPlayCircle, FaLayerGroup } from "react-icons/fa";

function MyEnrolledCourses() {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#ff23670d', 
      padding: '40px 20px',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Orbs (Consistent with SignUp) */}
      <div className='absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#C4B5FD] opacity-30 rounded-full blur-[130px] pointer-events-none' />
      <div className='absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[130px] pointer-events-none' />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'white', border: '1px solid #E5E7EB',
          borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
          color: '#374151', fontSize: 14, fontWeight: 600,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <FaArrowLeftLong /> Back
      </button>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#1F2937', margin: 0 }}>
          My Enrolled Courses
        </h1>
        <div style={{ height: 4, width: 60, borderRadius: 2, background: 'linear-gradient(90deg, #7C3AED, #10B981)', margin: '12px auto' }} />
      </div>

      {/* Courses Container */}
      <div style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 24, paddingBottom: 50
      }}>
        {userData?.enrolledCourses?.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
            <FaLayerGroup style={{ fontSize: 48, margin: '0 auto 16px', opacity: 0.5 }} />
            <p>You haven't enrolled in any courses yet.</p>
          </div>
        ) : (
          userData?.enrolledCourses?.map((course, index) => (
            <div key={index} style={{
              background: 'white', borderRadius: 16, overflow: 'hidden',
              border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              <div style={{ height: 160, overflow: 'hidden' }}>
                <img src={course?.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1F2937', marginBottom: 12 }}>{course?.title}</h2>
                <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280' }}>
                    <FaLayerGroup color="#7C3AED" /> {course?.category}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280' }}>
                    <FaSignal color="#10B981" /> {course?.level}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/viewlecture/${course._id}`)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 8, border: 'none',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)',
                    color: 'white', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Watch Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyEnrolledCourses;