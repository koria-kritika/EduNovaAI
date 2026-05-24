
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { FaPenToSquare } from "react-icons/fa6";
import { FaPlus, FaListUl } from "react-icons/fa";

function CreateLecture() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const [lectureTitle, setLectureTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { lectureData } = useSelector(state => state.lecture)

    const handleCreateLecture = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`, { lectureTitle }, { withCredentials: true })
            dispatch(setLectureData([...lectureData, result.data.lecture]))
            setLoading(false)
            toast.success("Lecture Added")
            setLectureTitle("")
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const getCourseLecture = async () => {
            try {
                const result = await axios.get(serverUrl + `/api/course/courselecture/${courseId}`, { withCredentials: true })
                dispatch(setLectureData(result.data.lectures))
            } catch (error) {
                console.log(error)
            }
        }
        getCourseLecture()
    }, [])

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                .lec-input::placeholder { color: #475569; }
                .lec-input:focus { border-color: rgba(139,92,246,0.5) !important; outline: none; }
                .lec-row:hover { background: rgba(59,130,246,0.08) !important; border-color: rgba(59,130,246,0.25) !important; }
            `}</style>

            {/* Ambient blobs */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
            </div>

            <div style={{
                position: 'relative', zIndex: 1,
                background: 'rgba(30,41,59,0.75)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: 20, padding: '36px 32px',
                width: '100%', maxWidth: 620,
                boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}>

                {/* Header */}
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{
                        fontSize: 22, fontWeight: 800, color: '#E2E8F0',
                        margin: '0 0 6px', letterSpacing: '-0.3px',
                    }}>
                        Let's Add a Lecture
                    </h1>
                    <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                        Enter the title and add your video lectures to enhance your course content.
                    </p>
                    <div style={{ height: 3, width: 48, borderRadius: 99, background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', marginTop: 14 }} />
                </div>

                {/* Input */}
                <input
                    type="text"
                    className="lec-input"
                    placeholder="e.g. Introduction to MERN Stack"
                    value={lectureTitle}
                    onChange={e => setLectureTitle(e.target.value)}
                    style={{
                        width: '100%', padding: '12px 16px',
                        background: 'rgba(15,23,42,0.7)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        borderRadius: 12, color: '#E2E8F0',
                        fontSize: 14, fontFamily: 'inherit',
                        marginBottom: 18, boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                    }}
                />

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
                    <button
                        onClick={() => navigate(`/editcourse/${courseId}`)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '10px 18px', borderRadius: 10, cursor: 'pointer',
                            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                            color: '#3B82F6', fontSize: 13, fontWeight: 600,
                            fontFamily: 'inherit', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.25)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                        <FaArrowLeftLong style={{ fontSize: 13 }} /> Back to Course
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleCreateLecture}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 7,
                            padding: '10px 22px', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer',
                            background: loading ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                            border: 'none', color: 'white',
                            fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
                            boxShadow: loading ? 'none' : '0 4px 16px rgba(59,130,246,0.4)',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.55)' } }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.4)' }}
                    >
                        {loading ? <ClipLoader size={18} color="white" /> : <><FaPlus style={{ fontSize: 12 }} /> Create Lecture</>}
                    </button>
                </div>

                {/* Lecture List */}
                {lectureData?.length > 0 && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <FaListUl style={{ color: '#8B5CF6', fontSize: 13 }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Lectures ({lectureData.length}) <span style={{ fontSize: 12, color: '#FCD34D' }}>MAKE SURE TO UNLOCK THIS LECTURE IF IT IS FREE FOR VIEWERS</span>
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {lectureData?.map((lecture, index) => (
                                <div
                                    key={index}
                                    className="lec-row"
                                    style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '12px 16px', borderRadius: 10,
                                        background: 'rgba(15,23,42,0.5)',
                                        border: '1px solid rgba(59,130,246,0.1)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{
                                            width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 11, fontWeight: 800, color: 'white',
                                        }}>
                                            {index + 1}
                                        </span>
                                        <span style={{ fontSize: 13, fontWeight: 500, color: '#E2E8F0' }}>
                                            {lecture.lectureTitle}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                                        style={{
                                            background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)',
                                            borderRadius: 7, padding: '5px 8px', cursor: 'pointer',
                                            color: '#8B5CF6', fontSize: 13, display: 'flex', alignItems: 'center',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.22)'; e.currentTarget.style.boxShadow = '0 0 10px rgba(139,92,246,0.3)' }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
                                    >
                                        <FaPenToSquare />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CreateLecture