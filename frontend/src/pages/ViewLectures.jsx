import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl, socket } from '../App'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaPlayCircle } from "react-icons/fa"
import { toast } from 'react-toastify'
import Classroom from '../component/Classroom'
import { setCourseData } from '../redux/courseSlice'

function ViewLectures() {
    const { courseId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const courseData = useSelector(state => state.course.courseData)
    const safeData = Array.isArray(courseData) ? courseData : []
    const selectedCourse = safeData.find(c => c._id === courseId)

    const [creatorData, setCreatorData] = useState(null)
    const [selectedLectureId, setSelectedLectureId] = useState(null)
    const selectedLecture = selectedCourse?.lectures?.find(l => l._id === selectedLectureId) ?? null

    // ✅ Redirect home if the entire course is deleted/unpublished
    useEffect(() => {
        const handleCourseRemoved = (removedCourseId) => {
            if (removedCourseId === courseId) {
                toast.info('This course has been deleted.')
                navigate('/')
            }
        }
        socket.on('course_removed', handleCourseRemoved)
        return () => socket.off('course_removed', handleCourseRemoved)
    }, [courseId])

    // ✅ Redirect home if the lecture currently being watched is deleted
    useEffect(() => {
        const handleLectureRemoved = ({ courseId: cId, lectureId }) => {
            if (cId !== courseId) return
            // If the deleted lecture is the one currently playing → go home
            if (lectureId === selectedLectureId) {
                toast.info('This lecture has been removed.')
                navigate('/')
            }
        }
        socket.on('lecture_removed', handleLectureRemoved)
        return () => socket.off('lecture_removed', handleLectureRemoved)
    }, [courseId, selectedLectureId])

    // Fetch courses if store is empty (direct URL hit)
    useEffect(() => {
        if (!Array.isArray(courseData) || courseData.length === 0) {
            axios.get(serverUrl + '/api/course/getpublished', { withCredentials: true })
                .then(({ data }) => {
                    const courses = Array.isArray(data) ? data : Array.isArray(data.courses) ? data.courses : []
                    dispatch(setCourseData(courses))
                })
                .catch(err => { console.log(err); dispatch(setCourseData([])) })
        }
    }, [])

    // Auto-select first lecture; keep selection stable across socket updates
    useEffect(() => {
        const lectures = selectedCourse?.lectures
        if (!lectures?.length) return
        setSelectedLectureId(prev => {
            if (prev && lectures.some(l => l._id === prev)) return prev
            return lectures[0]._id
        })
    }, [selectedCourse?.lectures])

    // Fetch creator
    useEffect(() => {
        if (!selectedCourse?.creator) return
        axios.post(serverUrl + '/api/course/creator', { userId: selectedCourse.creator }, { withCredentials: true })
            .then(r => setCreatorData(r.data))
            .catch(console.log)
    }, [selectedCourse?.creator])

    return (
        <div className="!text-base">
            <div className='min-h-screen p-4 md:p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden' style={{ background: '#ff23670d' }}>

                {/* Background glow orbs */}
                <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#60cb8b] opacity-[0.06] rounded-full blur-[140px] pointer-events-none z-0' />
                <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.06] rounded-full blur-[140px] pointer-events-none z-0' />

                {/* ── LEFT: video player ── */}
                <div className='w-full md:w-2/3 rounded-2xl p-6 relative z-[1]'
                    style={{ background: '#FFFFEE', border: '1px solid rgba(59,130,246,0.15)', boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>

                    {/* Header */}
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold flex items-center gap-4 text-[#E2E8F0]'>
                            <button
                                className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300'
                                style={{ background: '#ECFDF5', border: '1px solid rgba(59,130,246,0.3)' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
                                onClick={() => navigate(`/viewcourse/${courseId}`)}>
                                <FaArrowLeftLong className='text-[#3B82F6] w-4 h-4' />
                            </button>
                            <span style={{ background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)', WebkitBackgroundClip: 'text', backgroundClip: 'text' , WebkitTextFillColor: 'black'}}>
                                {selectedCourse?.title}
                            </span>
                        </h2>
                        <div className='mt-3 flex gap-3 flex-wrap pl-12'>
                            <span className='text-sm font-medium px-3 py-1 rounded-full'
                                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#3B82F6' }}>
                                {selectedCourse?.category}
                            </span>
                            <span className='text-sm font-medium px-3 py-1 rounded-full'
                                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#8B5CF6' }}>
                                {selectedCourse?.level}
                            </span>
                        </div>
                    </div>

                    {/* Video player */}
                    <div className='aspect-video rounded-xl overflow-hidden mb-4'
                        style={{ border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 0 30px rgba(59,130,246,0.1)' }}>
                        {selectedLecture?.videoUrl ? (
                            <video key={selectedLecture.videoUrl} className='w-full h-full object-cover'
                                src={selectedLecture.videoUrl} controls />
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full gap-3' style={{ background: '#0F172A' }}>
                                <div className='w-16 h-16 rounded-full flex items-center justify-center'
                                    style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
                                    <FaPlayCircle className='text-[#3B82F6] text-3xl' />
                                </div>
                                <p className='text-[#94A3B8] text-base'>Select a lecture to start watching</p>
                            </div>
                        )}
                    </div>

                    {/* Now Playing */}
                    {selectedLecture?.lectureTitle && (
                        <div className='px-4 py-3 rounded-xl mb-4'
                            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', border: '1px solid rgba(59,130,246,0.1)' }}>
                            <p className='text-[#EDE9FE] text-lg uppercase tracking-wider mb-1 font-bold'>Now Playing</p>
                            <h2 className='text-lg font-semibold' style={{ background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                {selectedLecture.lectureTitle}
                            </h2>
                        </div>
                    )}

                    {/* AI Quiz Banner */}
                    <div className='mt-2 mb-6 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden'
                        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)', border: '1px solid rgba(59,130,246,0.25)' }}>
                        <div>
                            <h3 className='text-2xl font-bold text-[#7C3AED]'>Let's test your knowledge</h3>
                            <p className='text-lg text-[#7C3AED] mt-1'>AI-generated Assessment covers content from the <span className='text-[#ce1c1c] font-bold' >COMPLETE COURSE</span>.
                            Generate your certificate after passing the assessment.</p>
                        </div>
                        <button
                            onClick={() => navigate(`/quiz/${courseId}`)}
                            className='shrink-0 text-base font-semibold px-6 py-2.5 rounded-lg transition-all duration-300'
                            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)', color: '#fff', boxShadow: '0 0 16px #3B82F655' }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px #8B5CF688'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px #3B82F655'}>
                            Take Quiz →
                        </button>
                    </div>

                    {/* Classroom */}
                    <div className='mt-2'>
                        <Classroom courseId={courseId} />
                    </div>
                </div>

                {/* ── RIGHT: lecture list + educator ── */}
                <div className='w-full md:w-1/3 rounded-2xl p-6 h-fit sticky top-6 z-[1]'
                    style={{ background: '#FFFFEE', border: '1px solid rgba(59,130,246,0.15)', boxShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>

                    <div className='flex items-center gap-2 mb-4'>
                        <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
                        <h2 className='text-2xl font-bold' style={{ background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'black', backgroundClip: 'text' }}>
                            All Lectures
                        </h2>
                        <span className='ml-auto text-sm px-2.5 py-0.5 rounded-full font-medium'
                            style={{ background: 'rgba(59,130,246,0.1)', border: '5px solid rgba(59,130,246,0.2)', color: '#3B82F6' }}>
                            {selectedCourse?.lectures?.length || 0}
                        </span>
                    </div>

                    {/* Lecture list */}
                    <div className='flex flex-col gap-2 mb-6'>
                        {selectedCourse?.lectures?.length > 0 ? selectedCourse.lectures.map((lecture, index) => {
                            const isActive = selectedLectureId === lecture._id
                            return (
                                <button key={lecture._id || index}
                                    onClick={() => setSelectedLectureId(lecture._id)}
                                    className='flex items-center justify-between p-3.5 rounded-xl text-left transition-all duration-200 w-full'
                                    style={{
                                        background: isActive ? 'rgba(59,130,246,0.15)' : 'rgba(15,23,42,0.6)',
                                        border: isActive ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(59,130,246,0.08)',
                                        boxShadow: isActive ? '0 0 12px rgba(59,130,246,0.2)' : 'none',
                                    }}
                                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(59,130,246,0.07)'; e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)' } }}
                                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(15,23,42,0.6)'; e.currentTarget.style.border = '1px solid rgba(59,130,246,0.08)' } }}>
                                    <div className='flex items-center gap-3'>
                                        <span className='w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'
                                            style={{ background: isActive ? '#3B82F6' : 'rgba(59,130,246,0.1)', color: isActive ? '#fff' : '#94A3B8' }}>
                                            {index + 1}
                                        </span>
                                        <span className='text-xl font-medium truncate max-w-[170px]'
                                            style={{ color: isActive ? '#7C3AED' : '#6B7280' }}>
                                            {lecture.lectureTitle}
                                        </span>
                                    </div>
                                    <FaPlayCircle className='flex-shrink-0 text-lg'
                                        style={{ color: isActive ? '#7C3AED' : '#6B7280' }} />
                                </button>
                            )
                        }) : (
                            <p className='text-[#94A3B8] text-sm'>No lectures available.</p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent mb-4' />

                    {/* Educator */}
                    {creatorData && (
                        <div>
                            <div className='flex items-center gap-2 mb-3'>
                                <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#06B6D4]' />
                                <h3 className='text-base font-bold' style={{ color: '#94A3B8' }}>Educator</h3>
                            </div>
                            <div className='flex items-center gap-4 p-4 rounded-xl'
                                style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(139,92,246,0.15)' }}>
                                <div className='relative flex-shrink-0'>
                                    <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] blur-[6px] opacity-50' />
                                    {creatorData?.photoUrl && (
                                        <img src={creatorData.photoUrl} className='w-14 h-14 rounded-full object-cover relative z-10'
                                            style={{ border: '2px solid rgba(59,130,246,0.4)' }} alt={creatorData?.name} />
                                    )}
                                </div>
                                <div className='min-w-0'>
                                    <p className='text-base font-semibold text-[#E2E8F0] truncate'>{creatorData?.name}</p>
                                    <p className='text-sm text-[#94A3B8] truncate'>{creatorData?.email}</p>
                                    {creatorData?.description && (
                                        <p className='text-sm text-[#94A3B8] mt-1 line-clamp-2'>{creatorData?.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewLectures