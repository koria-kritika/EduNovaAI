import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl, socket } from '../App'
import { FaArrowLeftLong } from "react-icons/fa6"
import CourseChatbot from '../component/CourseChatbot'
import { FaTrophy } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { toast } from 'react-toastify'

function QuizPage() {
  const { courseId } = useParams()
  const { courseData } = useSelector(state => state.course)
  const { userData } = useSelector(state => state.user)
  const selectedCourse = courseData?.find(course => course._id === courseId)
  const navigate = useNavigate()

  const [phase, setPhase] = useState('landing')
  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([])
  const [currentQ, setCurrentQ] = useState(0)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showCert, setShowCert] = useState(false)

 
  useEffect(() => {
    const handleCourseRemoved = (removedCourseId) => {
      if (removedCourseId === courseId) {
        toast.error('This course has been deleted.')
        navigate('/')
      }
    }
    const handleLectureRemoved = ({ courseId: cId }) => {
      if (cId === courseId) {
        toast.info('A lecture was removed from this course.')
        navigate('/')
      }
    }
    socket.on('course_removed', handleCourseRemoved)
    socket.on('lecture_removed', handleLectureRemoved)
    return () => {
      socket.off('course_removed', handleCourseRemoved)
      socket.off('lecture_removed', handleLectureRemoved)
    }
  }, [courseId])

  const startQuiz = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/quiz/generate/${courseId}`,
        { withCredentials: true }
      )
      setQuestions(data.quiz.questions)
      setUserAnswers(new Array(data.quiz.questions.length).fill(null))
      setCurrentQ(0)
      setPhase('quiz')
    } catch (err) {
      
      const status = err?.response?.status
      const msg = err?.response?.data?.message || ''
      if (status === 429|| status === 503 || msg.toLowerCase().includes('rate') || msg.toLowerCase().includes('limit') || msg.toLowerCase().includes('quota')) {
        toast.warn(
          'Too many requests. This is a free-tier limitation. Please try again in a few minutes.',
          { autoClose: 6000 }
        )
      } else {
        toast.error('Failed to generate quiz. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (optionIndex) => {
    const updated = [...userAnswers]
    updated[currentQ] = optionIndex
    setUserAnswers(updated)
  }

  const submitQuiz = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/quiz/submit`,
        { courseId, questions, userAnswers },
        { withCredentials: true }
      )
      setResult(data)
      setPhase('result')
    } catch (err) {
      const status = err?.response?.status
      const msg = err?.response?.data?.message || ''
      if (status === 429 || status === 503|| msg.toLowerCase().includes('rate') || msg.toLowerCase().includes('limit') || msg.toLowerCase().includes('quota')) {
        toast.warn(
          'Too many requests. This is a free-tier limitation. Please try submitting again in a moment.',
          { autoClose: 6000 }
        )
      } else {
        toast.error('Submission failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const retake = () => {
    setPhase('landing')
    setQuestions([])
    setUserAnswers([])
    setCurrentQ(0)
    setResult(null)
    setShowReview(false)
    setShowCert(false)
  }

  const allAnswered = userAnswers.every(a => a !== null)
  const q = questions[currentQ]

  // ─── LANDING 
  if (phase === 'landing') {
    return (
      <div className='min-h-screen p-6 flex flex-col gap-6 relative overflow-hidden fadeInUp'
        style={{ background: '#ff23670d', fontFamily: "'Syne', 'Inter', sans-serif" }}>

        <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#dfcbe9] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob1' />
        <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob2' />

        <div className='w-full rounded-2xl p-6'
          style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(196,181,253,0.5)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}>

          <h2 className='text-3xl font-bold flex items-center gap-4 mb-8'>
            <button
              className='w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300'
              style={{ background: 'rgba(196,181,253,0.2)', border: '1px solid rgba(196,181,253,0.5)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(196,181,253,0.4)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(196,181,253,0.2)'}
              onClick={() => navigate(`/viewlecture/${courseId}`)}>
              <FaArrowLeftLong className='text-[#7C3AED] w-4 h-4' />
            </button>
            <span style={{
              background: 'linear-gradient(90deg, #7C3AED, #10B981)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
              AI Quiz — {selectedCourse?.title}
            </span>
          </h2>

          <div className='flex flex-col md:flex-row gap-6'>

            <div className='flex-1 rounded-xl p-6'
              style={{ background: 'rgba(249,250,251,0.9)', border: '1px solid rgba(196,181,253,0.4)' }}>
              <div className='text-5xl font-extrabold mb-4' style={{ background: 'linear-gradient(135deg, #7C3AED, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>GET AHEAD OF WHOLE CROWD!</div>
              <br />
              <h3 className='text-4xl font-bold text-[#1F2937] mb-3'>Test Your Knowledge</h3>
              <p className='text-2xl text-[#6B7280] mb-6 leading-relaxed'>
                Our AI has analyzed this course content and prepared a personalized quiz just for you.
              </p>

              <div className='flex flex-col gap-3 mb-6'>
                {[
                  '10 multiple choice questions',
                  'No time limit — go at your own pace',
                  'Score 70% or above to pass',
                  'Get a certificate on passing',
                  'Retake anytime to improve',
                ].map((text) => (
                  <div key={text} className='flex items-center gap-3 text-xl text-[#374151]'>
                    <span style={{ color: '#10B981', fontSize: '22px' }}>-</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className='mb-4 p-3 rounded-xl flex items-start gap-2'
                style={{ background: '#dfcbe9', border: '4px solid rgba(251,191,36,0.3)' }}>
                <span style={{ color: 'black', fontSize: 17, flexShrink: 0, fontWeight: 700 }}>NOTE:</span>
                <p className='text-base' style={{ color: 'black' }}>
                  Quiz generation <span style={{ color: '#D97706', fontWeight: 700 }}>usage is limited</span>. If unavailable, please try again in a few minutes.
                </p>
              </div>

              <button
                onClick={startQuiz}
                disabled={loading}
                className='w-full text-lg font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 ctaBtn'
                style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}
                onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 8px 30px rgba(16,185,129,0.45)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)')}
              >
                {loading ? ' Generating quiz with AI...' : 'Start Quiz →'}
              </button>
            </div>

            <div className='flex-1 rounded-xl p-6'
              style={{ background: 'rgba(249,250,251,0.9)', border: '1px solid rgba(167,243,208,0.5)' }}>
              <div className='flex items-center gap-2 mb-5'>
                <div className='w-1 h-6 rounded-full' style={{ background: 'linear-gradient(180deg, #7C3AED, #10B981)' }} />
                <h3 className='text-4xl font-semibold text-[#1F2937]'>Course Details</h3>
              </div>
              <div className='flex flex-col gap-4'>
                {[
                  ['Course', selectedCourse?.title],
                  ['Category', selectedCourse?.category],
                  ['Level', selectedCourse?.level],
                  ['Lectures', selectedCourse?.lectures?.length || 0],
                ].map(([label, value]) => (
                  <div key={label} className='flex justify-between items-center pb-3'
                    style={{ borderBottom: '1px solid rgba(124,58,237,0.1)' }}>
                    <span className='text-xl text-[#6B7280]'>{label}</span>
                    <span className='text-2xl font-semibold text-[#1F2937]'>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
            .fadeInUp { animation: fadeInUp 0.6s ease both; }
            @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,40px); } }
            @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-30px); } }
            .floatBlob1 { animation: floatA 14s ease-in-out infinite; }
            .floatBlob2 { animation: floatB 16s ease-in-out infinite; }
            .ctaBtn:active { transform: scale(0.97); }
        `}</style>
      </div>
    )
  }

  // RESULT
  if (phase === 'result' && result) {
    if (showCert) {
      return (
        <CertificateView
          result={result}
          courseName={selectedCourse?.title}
          userName={userData?.name}
          onBack={() => setShowCert(false)}
        />
      )
    }

    return (
      <div className='min-h-screen p-6 relative overflow-hidden fadeInUp' style={{ background: '#ff23670d', fontFamily: "'Syne', 'Inter', sans-serif" }}>
        <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob1' />
        <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#C4B5FD] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob2' />

        <div className='max-w-2xl mx-auto'>
          <div className='rounded-2xl p-6 mb-4'
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(196,181,253,0.5)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}>

            <div className='text-center mb-6'>
              <div className='flex justify-center mb-4'>
                {result.passed ? (
                  <div className='pulseCircle' style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(251,191,36,0.18), rgba(245,158,11,0.1))', border: '2px solid rgba(251,191,36,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(251,191,36,0.25)' }}>
                    <FaTrophy size={42} color="#D97706" />
                  </div>
                ) : (
                  <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(16,185,129,0.1))', border: '2px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(124,58,237,0.15)' }}>
                    <FaBookOpen size={42} color="#7C3AED" />
                  </div>
                )}
              </div>
              <h2 className='text-4xl font-bold text-[#1F2937] mb-2'>
                {result.passed ? 'Congratulations!' : 'Keep Learning!'}
              </h2>
              <p className='text-xl text-[#6B7280]'>
                {result.passed
                  ? 'You passed the quiz and earned a certificate.'
                  : 'You need 70% to pass. Review the course and try again!'}
              </p>
            </div>

            <div className='flex items-center justify-center gap-6 mb-6'>
              <div className='text-center rounded-xl px-8 py-5'
                style={{ background: 'rgba(196,181,253,0.18)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <p className='text-5xl font-bold' style={{ background: 'linear-gradient(90deg, #7C3AED, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{result.percentage}%</p>
                <p className='text-base text-[#6B7280] mt-1'>Score</p>
              </div>
              <div className='text-center rounded-xl px-8 py-5'
                style={{ background: 'rgba(167,243,208,0.25)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <p className='text-5xl font-bold' style={{ background: 'linear-gradient(90deg, #10B981, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{result.score}/{result.total}</p>
                <p className='text-base text-[#6B7280] mt-1'>Correct</p>
              </div>
            </div>

            {result.passed && (
              <div className='rounded-xl p-4 mb-6 text-center'
                style={{ background: 'rgba(167,243,208,0.2)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <p className='text-base text-[#6B7280] mb-1'>Certificate ID</p>
                <p className='text-lg font-bold text-[#10B981]'>{result.certificateId}</p>
              </div>
            )}

            <div className='flex gap-3 flex-wrap'>
              {result.passed && (
                <button onClick={() => setShowCert(true)}
                  className='flex-1 text-lg font-semibold py-3.5 rounded-xl transition-all duration-300 ctaBtn'
                  style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', color: '#fff', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 26px rgba(16,185,129,0.45)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.3)'}>
                  View Certificate
                </button>
              )}
              <button onClick={retake}
                className='flex-1 text-lg font-semibold py-3.5 rounded-xl transition-all duration-300 ctaBtn'
                style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', color: '#1F2937' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                Retake Quiz
              </button>
              <button onClick={() => navigate(`/viewlecture/${courseId}`)}
                className='flex-1 text-lg font-semibold py-3.5 rounded-xl transition-all duration-300 ctaBtn'
                style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', color: '#1F2937' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                ← Back to Course
              </button>
            </div>
          </div>

          {/* Answer Review */}
          <div className='rounded-3xl mb-4'
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(196,181,253,0.5)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}>
            <button onClick={() => setShowReview(!showReview)}
              className='w-full flex items-center justify-between p-6 text-left'>
              <h3 className='text-2xl font-bold text-[#1F2937]'>
                <FaClipboardList className='inline mr-2 text-[#7C3AED]' />
                Review Answers
              </h3>
              <span className='text-lg text-[#6B7280]'>{showReview ? '▲ Hide' : '▼ Show'}</span>
            </button>

            {showReview && (
              <div className='px-6 pb-6 flex flex-col gap-4'>
                {questions.map((question, i) => {
                  const isCorrect = userAnswers[i] === question.correctAnswer
                  return (
                    <div key={i} className='rounded-xl p-4'
                      style={{ background: isCorrect ? 'rgba(167,243,208,0.2)' : 'rgba(239,68,68,0.06)', border: isCorrect ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.25)' }}>
                      <p className='text-xl font-semibold text-[#1F2937] mb-2'>Q{i + 1}: {question.question}</p>
                      <p className='text-lg text-[#6B7280] mb-1'>
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-[#10B981] font-semibold' : 'text-red-500 font-semibold'}>
                          {question.options[userAnswers[i]] ?? 'Not answered'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className='text-lg text-[#6B7280] mb-1'>
                          Correct: <span className='text-[#7C3AED] font-semibold'>{question.options[question.correctAnswer]}</span>
                        </p>
                      )}
                      <p className='text-lg text-[#6B7280] mt-2'>Remember: {question.explanation}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Learn from mistakes */}
          <div className='rounded-2xl p-6'
            style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(196,181,253,0.5)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-1 h-6 rounded-full' style={{ background: 'linear-gradient(180deg, #7C3AED, #10B981)' }} />
              <p className='text-2xl font-bold text-[#1F2937]'>
                <FaRobot className='inline mr-2 text-[#10B981]' />
                Learn from your mistakes
              </p>
            </div>
            <CourseChatbot
              courseId={courseId}
              wrongTopics={questions.filter((q, i) => userAnswers[i] !== q.correctAnswer).map(q => q.question.slice(0, 60))}
            />
          </div>
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
            .fadeInUp { animation: fadeInUp 0.6s ease both; }
            @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,40px); } }
            @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-30px); } }
            .floatBlob1 { animation: floatA 14s ease-in-out infinite; }
            .floatBlob2 { animation: floatB 16s ease-in-out infinite; }
            .ctaBtn:active { transform: scale(0.97); }
            @keyframes pulseRing { 0% { box-shadow: 0 0 0 0 rgba(251,191,36,0.35); } 70% { box-shadow: 0 0 0 16px rgba(251,191,36,0); } 100% { box-shadow: 0 0 0 0 rgba(251,191,36,0); } }
            .pulseCircle { animation: pulseRing 2.2s infinite; }
        `}</style>
      </div>
    )
  }

  //QUIZ
  return (
    <div className='min-h-screen p-6 flex flex-col lg:flex-row gap-6 relative overflow-hidden fadeInUp'
      style={{ background: '#ff23670d', fontFamily: "'Syne', 'Inter', sans-serif" }}>

      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob1' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#C4B5FD] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob2' />

      {/* Question panel */}
      <div className='w-full lg:w-1/2 rounded-2xl p-6'
        style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(196,181,253,0.5)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}>

        <div className='mb-6'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-3xl text-[#6B7280] font-medium'>Question {currentQ + 1} of {questions.length}</span>
            <span className='text-lg font-medium px-3 py-1 rounded-full'
              style={{ background: 'rgba(196,181,253,0.2)', border: '1px solid rgba(124,58,237,0.25)', color: '#7C3AED' }}>
              {userAnswers.filter(a => a !== null).length} answered
            </span>
          </div>
          <div className='w-full h-2 rounded-full overflow-hidden' style={{ background: 'rgba(124,58,237,0.1)' }}>
            <div className='h-full rounded-full transition-all'
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, background: 'linear-gradient(90deg, #7C3AED, #10B981)' }} />
          </div>
        </div>

        <h2 className='text-3xl font-bold text-[#1F2937] mb-6 leading-relaxed'>{q?.question}</h2>

        <div className='flex flex-col gap-3 mb-8'>
          {q?.options?.map((option, i) => (
            <button key={i} onClick={() => handleAnswer(i)}
              className='flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200'
              style={{
                background: userAnswers[currentQ] === i ? 'rgba(196,181,253,0.25)' : 'rgba(249,250,251,0.9)',
                border: userAnswers[currentQ] === i ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(124,58,237,0.08)',
                boxShadow: userAnswers[currentQ] === i ? '0 0 12px rgba(124,58,237,0.2)' : 'none',
              }}
              onMouseEnter={e => { if (userAnswers[currentQ] !== i) e.currentTarget.style.background = 'rgba(167,243,208,0.18)' }}
              onMouseLeave={e => { if (userAnswers[currentQ] !== i) e.currentTarget.style.background = 'rgba(249,250,251,0.9)' }}>
              <span className='w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0'
                style={{ background: userAnswers[currentQ] === i ? '#7C3AED' : 'rgba(124,58,237,0.1)', color: userAnswers[currentQ] === i ? '#fff' : '#6B7280', border: '1px solid rgba(124,58,237,0.3)' }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              <span className='text-xl font-medium' style={{ color: userAnswers[currentQ] === i ? '#1F2937' : '#374151' }}>
                {option}
              </span>
            </button>
          ))}
        </div>

        <div className='flex gap-3'>
          <button onClick={() => setCurrentQ(q => q - 1)} disabled={currentQ === 0}
            className='px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 disabled:opacity-40 ctaBtn'
            style={{ border: '1px solid rgba(124,58,237,0.3)', color: '#1F2937', background: 'transparent' }}
            onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.background = 'rgba(124,58,237,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            ← Prev
          </button>

          {currentQ === questions.length - 1 ? (
            <button onClick={submitQuiz} disabled={!allAnswered || loading}
              className='flex-1 text-lg font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 ctaBtn'
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', color: '#fff', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}
              onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.boxShadow = '0 8px 26px rgba(16,185,129,0.45)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.3)')}>
              {loading ? 'Submitting...' : 'Submit Quiz ✓'}
            </button>
          ) : (
            <button onClick={() => setCurrentQ(q => q + 1)}
              className='px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ctaBtn'
              style={{ border: '1px solid rgba(124,58,237,0.3)', color: '#1F2937', background: 'transparent' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Question navigator */}
      <div className='w-full lg:w-1/4 rounded-2xl p-6 h-fit'
        style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(196,181,253,0.5)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}>
        <div className='flex items-center gap-2 mb-5'>
          <div className='w-1 h-5 rounded-full' style={{ background: 'linear-gradient(180deg, #7C3AED, #10B981)' }} />
          <h2 className='text-2xl font-bold text-[#1F2937]'>Questions</h2>
        </div>
        <div className='grid grid-cols-5 gap-2 mb-6'>
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrentQ(i)}
              className='aspect-square rounded-lg text-base font-semibold transition-all duration-200 ctaBtn'
              style={{
                background: i === currentQ ? 'linear-gradient(135deg, #7C3AED, #10B981)' : userAnswers[i] !== null ? 'rgba(167,243,208,0.3)' : 'rgba(249,250,251,0.9)',
                border: i === currentQ ? '1px solid #7C3AED' : userAnswers[i] !== null ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(124,58,237,0.1)',
                color: i === currentQ ? '#fff' : userAnswers[i] !== null ? '#10B981' : '#6B7280',
                boxShadow: i === currentQ ? '0 0 10px rgba(124,58,237,0.4)' : 'none',
              }}>
              {i + 1}
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-2 text-lg text-[#6B7280]'>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 rounded inline-block' style={{ background: 'linear-gradient(135deg, #7C3AED, #10B981)' }} /> Current
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 rounded inline-block' style={{ background: 'rgba(167,243,208,0.3)', border: '1px solid rgba(16,185,129,0.4)' }} /> Answered
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4 rounded inline-block' style={{ background: 'rgba(249,250,251,0.9)', border: '1px solid rgba(124,58,237,0.1)' }} /> Unanswered
          </div>
        </div>
        <div className='mt-5 pt-4' style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
          <p className='text-lg text-[#6B7280] leading-relaxed'>
            Answer all questions before submitting. You can navigate freely between questions.
          </p>
        </div>
      </div>

     
      <div className='w-full lg:w-1/4 h-fit'>
        <div className='flex items-center gap-2 mb-3'>
          <div className='w-1 h-5 rounded-full' style={{ background: 'linear-gradient(180deg, #10B981, #7C3AED)' }} />
          <p className='text-2xl font-bold text-[#1F2937]'>Ask a doubt</p>
        </div>
        <CourseChatbot courseId={courseId} wrongTopics={[]} />
      </div>

      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
          .fadeInUp { animation: fadeInUp 0.6s ease both; }
          @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,40px); } }
          @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-30px); } }
          .floatBlob1 { animation: floatA 14s ease-in-out infinite; }
          .floatBlob2 { animation: floatB 16s ease-in-out infinite; }
          .ctaBtn:active { transform: scale(0.97); }
      `}</style>
    </div>
  )
}

// ─── CERTIFICATE 
function CertificateView({ result, courseName, userName, onBack }) {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className='min-h-screen p-6 relative overflow-hidden fadeInUp' style={{ background: '#ff23670d', fontFamily: "'Syne', 'Inter', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fadeInUp { animation: fadeInUp 0.6s ease both; }
        @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,40px); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,-30px); } }
        .floatBlob1 { animation: floatA 14s ease-in-out infinite; }
        .floatBlob2 { animation: floatB 16s ease-in-out infinite; }
        .ctaBtn:active { transform: scale(0.97); }
        @media print {
          body * { visibility: hidden !important; }
          #certificate, #certificate * { visibility: visible !important; }
          #certificate {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            margin: 0 !important; padding: 40px !important;
            border: none !important; box-shadow: none !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#A7F3D0] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob1' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#C4B5FD] opacity-30 rounded-full blur-[140px] pointer-events-none floatBlob2' />

      <div className='max-w-2xl mx-auto'>
        <button onClick={onBack}
          className='flex items-center gap-2 text-lg text-[#6B7280] hover:text-[#7C3AED] mb-6 transition-colors'>
          <FaArrowLeftLong className='w-4 h-4' /> Back to Results
        </button>

        <div id='certificate'
          className='rounded-2xl p-10 text-center mb-4 relative overflow-hidden'
          style={{ background: 'rgba(255,255,255,0.95)', border: '2px solid rgba(124,58,237,0.3)', boxShadow: '0 0 40px rgba(124,58,237,0.15)' }}>

          <div className='absolute top-[-40px] right-[-40px] w-[200px] h-[200px] bg-[#A7F3D0] opacity-40 rounded-full blur-[60px]' />
          <div className='absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] bg-[#C4B5FD] opacity-40 rounded-full blur-[60px]' />

          <div className='rounded-xl p-8 relative z-10' style={{ border: '1px solid rgba(124,58,237,0.15)' }}>
            <p className='text-base font-bold tracking-widest uppercase mb-4' style={{ color: '#10B981' }}>EduNovaAI</p>
            <h1 className='text-4xl font-bold mb-3' style={{ background: 'linear-gradient(90deg, #1F2937, #7C3AED, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Certificate of Completion
            </h1>
            <div className='w-20 h-[2px] rounded-full mx-auto mb-6' style={{ background: 'linear-gradient(90deg, #7C3AED, #10B981)' }} />
            <p className='text-lg text-[#6B7280] mb-2'>This certifies that</p>
            <h2 className='text-4xl font-bold text-[#1F2937] mb-4'>{userName || 'Student'}</h2>
            <p className='text-lg text-[#6B7280] mb-2'>has successfully completed</p>
            <h3 className='text-2xl font-semibold text-[#7C3AED] mb-2'>{courseName}</h3>
            <p className='text-lg text-[#6B7280] mb-6'>
              with a score of{' '}
              <span className='font-bold text-[#10B981] text-xl'>{result.percentage}%</span>
            </p>
            <div className='w-20 h-[2px] rounded-full mx-auto mb-6' style={{ background: 'linear-gradient(90deg, #10B981, #7C3AED)' }} />
            <div className='flex justify-around text-center'>
              <div>
                <p className='text-lg font-semibold text-[#1F2937]'>{today}</p>
                <p className='text-base text-[#6B7280] mt-1'>Date Issued</p>
              </div>
              <div>
                <p className='text-lg font-semibold text-[#10B981]'>{result.certificateId}</p>
                <p className='text-base text-[#6B7280] mt-1'>Certificate ID</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => window.print()}
          className='w-full text-lg font-semibold py-4 rounded-xl transition-all duration-300 ctaBtn'
          style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(16,185,129,0.45)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.3)'}>
           Print / Save as PDF
        </button>
      </div>
    </div>
  )
}

export default QuizPage