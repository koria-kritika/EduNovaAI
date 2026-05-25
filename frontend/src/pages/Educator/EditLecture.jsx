import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { setLectureData } from '../../redux/lectureSlice';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const MAX_INPUT_MB = 300  

function EditLecture() {
  const { courseId, lectureId } = useParams()
  const { lectureData } = useSelector(state => state.lecture)
  const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || "")
  const [videoFile, setVideoFile] = useState(null)
  const [videoError, setVideoError] = useState("")   // ← size error shown under the upload box
  const [isPreviewFree, setIsPreviewFree] = useState(
    selectedLecture?.isPreviewFree === true || selectedLecture?.isPreviewFree === "true" || false
  )
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  // Validate file size on selection — give instant feedback before even hitting the server
  const handleVideoSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const fileMB = file.size / 1024 / 1024
    if (fileMB > MAX_INPUT_MB) {
      setVideoError(`File too large (${fileMB.toFixed(0)}MB). Maximum upload limit is ${MAX_INPUT_MB}MB.`)
      setVideoFile(null)
      e.target.value = ""
      return
    }
    setVideoError("")
    setVideoFile(file)
  }

  const handleEditLecture = async () => {
    if (videoError) { toast.error(videoError); return }
    setLoading(true)
    try {
      const formdata = new FormData()
      formdata.append("lectureTitle", lectureTitle)
      if (videoFile) formdata.append("video", videoFile)
      formdata.append("isPreviewFree", isPreviewFree.toString())

      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formdata,
        { withCredentials: true }
      )

      const updatedLectures = lectureData.map(lec =>
        lec._id === lectureId ? result.data : lec
      )
      dispatch(setLectureData(updatedLectures))
      toast.success("Lecture Updated")
      navigate("/courses")
    } catch (error) {
      console.log(error)
      const msg = error?.response?.data?.message || "Error updating lecture"
      // Show a clear message if backend reports size issue
      if (msg.includes('too large') || msg.includes('FILE_TOO_LARGE')) {
        toast.error(`Video too large. Maximum upload limit is ${MAX_INPUT_MB}MB. Please use a smaller file.`)
      } else {
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const removeLecture = async () => {
    setLoading1(true)
    try {
      await axios.delete(
        serverUrl + `/api/course/removelecture/${lectureId}`,
        { withCredentials: true }
      )
      toast.success("Lecture Removed")
      navigate(`/createlecture/${courseId}`)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Error removing lecture")
    } finally {
      setLoading1(false)
    }
  }

  const inputStyle = {
    background: '#0F172A',
    border: '1px solid rgba(59,130,246,0.2)',
    color: '#E2E8F0',
    borderRadius: 10,
    padding: '10px 16px',
    width: '100%',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#94A3B8',
    marginBottom: 6,
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'
      style={{ background: '#0F172A' }}>

      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.08] rounded-full blur-[140px] pointer-events-none' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.08] rounded-full blur-[140px] pointer-events-none' />

      <div className='w-full max-w-xl rounded-2xl p-7 space-y-6 relative z-10'
        style={{ background: '#111827', border: '1px solid rgba(59,130,246,0.2)', boxShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>

        
        <div className='flex items-center gap-4'>
          <button className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300'
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
            onClick={() => navigate(`/createlecture/${courseId}`)}>
            <FaArrowLeftLong className='text-[#3B82F6] w-3.5 h-3.5' />
          </button>
          <div>
            <div className='flex items-center gap-2'>
              <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
              <h2 className='text-2xl font-bold' style={{
                background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Update Lecture</h2>
            </div>
            <p className='text-sm text-[#94A3B8] pl-3 mt-0.5'>Edit lecture details and video</p>
          </div>
        </div>

        <div className='w-full h-[1px]' style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }} />
        
        <button className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-semibold transition-all duration-200'
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
          disabled={loading1} onClick={removeLecture}>
          {loading1 ? <ClipLoader size={16} color='#F87171' /> : '🗑 Remove Lecture'}
        </button>

        {/* Form */}
        <div className='space-y-5'>

          {/* Title */}
          <div>
            <label style={labelStyle}>Lecture Title *</label>
            <input type="text" style={inputStyle}
              placeholder='e.g. Introduction to React Hooks'
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
              onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'} />
          </div>

          {/* Video Upload */}
          <div>
            <label style={labelStyle}>
              Video File
              <span style={{ color: '#64748B', fontWeight: 400, marginLeft: 8 }}>
                (max {MAX_INPUT_MB}MB — leave empty to keep existing)
              </span>
            </label>

            <label className='flex flex-col items-center justify-center w-full rounded-xl cursor-pointer transition-all duration-200'
              style={{
                border: videoError ? '2px dashed rgba(239,68,68,0.6)' : '2px dashed rgba(59,130,246,0.3)',
                background: videoError ? 'rgba(239,68,68,0.04)' : 'rgba(59,130,246,0.04)',
                padding: '20px'
              }}
              onMouseEnter={e => {
                if (!videoError) { e.currentTarget.style.border = '2px dashed rgba(59,130,246,0.6)'; e.currentTarget.style.background = 'rgba(59,130,246,0.08)' }
              }}
              onMouseLeave={e => {
                if (!videoError) { e.currentTarget.style.border = '2px dashed rgba(59,130,246,0.3)'; e.currentTarget.style.background = 'rgba(59,130,246,0.04)' }
              }}>
              <div className='flex flex-col items-center gap-2'>
                <div className='w-12 h-12 rounded-xl flex items-center justify-center text-2xl'
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  🎬
                </div>
                <p className='text-base font-semibold' style={{ color: '#E2E8F0' }}>
                  {videoFile ? videoFile.name : 'Click to upload video'}
                </p>
                <p className='text-sm' style={{ color: '#94A3B8' }}>MP4, MOV, AVI · Max {MAX_INPUT_MB}MB</p>
              </div>
              <input type="file" accept='video/*' className='hidden' onChange={handleVideoSelect} />
            </label>

            {/* ✅ Size error shown right under the upload box */}
            {videoError && (
              <div className='flex items-start gap-2 mt-2 p-3 rounded-xl'
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <span style={{ color: '#F87171', fontSize: '18px', flexShrink: 0 }}>⚠</span>
                <div>
                  <p className='text-sm font-semibold' style={{ color: '#F87171' }}>File too large</p>
                  <p className='text-sm' style={{ color: '#94A3B8' }}>{videoError}</p>
                </div>
              </div>
            )}

            {/* Already uploaded indicator */}
            {selectedLecture?.videoUrl && !videoFile && !videoError && (
              <p className='text-sm mt-2' style={{ color: '#4ADE80' }}>
                ✓ Video already uploaded — upload a new one to replace it
              </p>
            )}

            {/* Show selected file size */}
            {videoFile && !videoError && (
              <p className='text-sm mt-2' style={{ color: '#94A3B8' }}>
                Selected: {videoFile.name} · {(videoFile.size / 1024 / 1024).toFixed(1)}MB
                {videoFile.size / 1024 / 1024 > 10 && (
                  <span style={{ color: '#FBBF24', marginLeft: 8 }}>
                  Will be compressed before upload
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Free Preview toggle */}
          <div className='flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200'
            style={{
              background: isPreviewFree ? 'rgba(34,197,94,0.08)' : 'rgba(59,130,246,0.05)',
              border: isPreviewFree ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(59,130,246,0.12)',
            }}
            onClick={() => setIsPreviewFree(prev => !prev)}>
            <div className='w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-200'
              style={{
                background: isPreviewFree ? '#22C55E' : 'rgba(59,130,246,0.1)',
                border: isPreviewFree ? '1px solid #22C55E' : '1px solid rgba(59,130,246,0.3)',
              }}>
              {isPreviewFree && <span className='text-white text-xs font-bold'>✓</span>}
            </div>
            <div>
              <p className='text-base font-semibold' style={{ color: isPreviewFree ? '#4ADE80' : '#E2E8F0' }}>
                Free Preview {isPreviewFree ? '(ON)' : '(OFF)'}
              </p>
              <p className='text-sm' style={{ color: '#94A3B8' }}>
                {isPreviewFree ? 'Students can watch this without enrolling' : 'Only enrolled students can watch this'}
              </p>
            </div>
          </div>

          {/* Uploading indicator */}
          {loading && (
            <div className='flex items-center gap-3 p-3 rounded-xl'
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <ClipLoader size={16} color='#3B82F6' />
              <div>
                <p className='text-base font-medium' style={{ color: '#3B82F6' }}>
                  Uploading to Cloudinary...
                </p>
                {videoFile && videoFile.size / 1024 / 1024 > 10 && (
                  <p className='text-sm' style={{ color: '#94A3B8' }}>
                    Compressing video first — this may take a minute.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className='w-full h-[1px]' style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }} />

        {/* Submit */}
        <button className='w-full py-3 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50'
          style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}
          onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 0 30px rgba(139,92,246,0.6)')}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.4)'}
          onClick={handleEditLecture}
          disabled={loading || !!videoError}>
          {loading ? <ClipLoader size={20} color='white' /> : 'Update Lecture'}
        </button>
      </div>
    </div>
  )
}

export default EditLecture