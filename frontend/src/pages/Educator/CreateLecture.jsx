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
            // Updated background: Light Purple to Peach/Green gradient
            background: 'linear-gradient(135deg, #F3E8FF 0%, #E8F5E9 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                .lec-input::placeholder { color: #94A3B8; }
                .lec-input:focus { border-color: #8B5CF6 !important; outline: none; }
                .lec-row:hover { background: rgba(255,255,255,0.8) !important; border-color: #DDD !important; }
            `}</style>

            <div style={{
                position: 'relative', zIndex: 1,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 24, padding: '48px 40px',
                width: '100%', maxWidth: 800, // Card width badha di gayi hai
                boxShadow: '0 20px 40px rgba(108, 92, 231, 0.1)',
            }}>

                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <h1 style={{
                        fontSize: 28, fontWeight: 800, color: '#0E1B4D', // Font bada aur bold
                        margin: '0 0 10px',
                    }}>
                        Let's Add a Lecture
                    </h1>
                    <p style={{ fontSize: 15, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
                        Enter the title and add your video lectures to enhance your course content.
                    </p>
                    <div style={{ height: 4, width: 60, borderRadius: 99, background: '#6C5CE7', marginTop: 16 }} />
                </div>

                {/* Input */}
                <input
                    type="text"
                    className="lec-input"
                    placeholder="e.g. Introduction to MERN Stack"
                    value={lectureTitle}
                    onChange={e => setLectureTitle(e.target.value)}
                    style={{
                        width: '100%', padding: '16px 20px',
                        background: '#ffffff',
                        border: '2px solid #E5E7EB',
                        borderRadius: 14, color: '#1E293B',
                        fontSize: 16, fontFamily: 'inherit',
                        marginBottom: 20, boxSizing: 'border-box',
                    }}
                />

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                    <button
                        onClick={() => navigate(`/editcourse/${courseId}`)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', borderRadius: 12, cursor: 'pointer',
                            background: '#F1F5F9', border: '1px solid #E2E8F0',
                            color: '#475569', fontSize: 14, fontWeight: 700,
                        }}
                    >
                        <FaArrowLeftLong /> Back to Course
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleCreateLecture}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', borderRadius: 12, cursor: 'pointer',
                            background: '#6C5CE7', border: 'none', color: 'white',
                            fontSize: 14, fontWeight: 700,
                        }}
                    >
                        {loading ? <ClipLoader size={18} color="white" /> : <><FaPlus /> Create Lecture</>}
                    </button>
                </div>

                {/* Lecture List */}
                {lectureData?.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <FaListUl style={{ color: '#6C5CE7' }} />
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#0E1B4D' }}>
                                Lectures ({lectureData.length})
                            </span>
                        </div>

                        {lectureData?.map((lecture, index) => (
                            <div key={index} className="lec-row" style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '16px 20px', borderRadius: 12,
                                background: 'white', border: '1px solid #E2E8F0',
                            }}>
                                <span style={{ fontSize: 15, fontWeight: 600, color: '#1E293B' }}>
                                    {index + 1}. {lecture.lectureTitle}
                                </span>
                                <button
                                    onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                                    style={{
                                        background: '#F3E8FF', border: '1px solid #E9D5FF',
                                        borderRadius: 8, padding: '8px 12px', cursor: 'pointer',
                                        color: '#6C5CE7',
                                    }}
                                >
                                    <FaPenToSquare />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateLecture