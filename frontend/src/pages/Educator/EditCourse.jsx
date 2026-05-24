import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../../App';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';

function EditCourse() {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const thumb = useRef()
  const [isPublished, setIsPublished] = useState(false)
  const [selectCourse, setSelectCourse] = useState(null)
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState(0)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()
  
  const { courseData } = useSelector(state => state.course)

  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, { withCredentials: true })
      setSelectCourse(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "")
      setSubTitle(selectCourse.subTitle || "")
      setDescription(selectCourse.description || "")
      setCategory(selectCourse.category || "")
      setLevel(selectCourse.level || "")
      setPrice(selectCourse.price ?? 0)  // ✅ ?? only falls back if null/undefined, not 0
      setFrontendImage(selectCourse.thumbnail || img)
      setIsPublished(selectCourse?.isPublished)
    }
  }, [selectCourse])

  useEffect(() => { getCourseById() }, [])

  const handleEditCourse = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("subTitle", subTitle)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("level", level)
    formData.append("price", price)
    formData.append("thumbnail", backendImage)
    formData.append("isPublished", isPublished)
    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData, { withCredentials: true })
      const updateData = result.data

      // ✅ always work with a guaranteed array
      const safeData = Array.isArray(courseData) ? courseData : []

      if (updateData.isPublished) {
        const exists = safeData.some(c => c._id === courseId)
        const updateCourses = exists
          ? safeData.map(c => c._id === courseId ? updateData : c)
          : [...safeData, updateData]
        dispatch(setCourseData(updateCourses))
      } else {
        // ✅ dispatch plain filtered array, never a function
        dispatch(setCourseData(safeData.filter(c => c._id !== courseId)))
      }

      setLoading(false)
      navigate("/courses")
      toast.success("Course Updated")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }

  const handleRemoveCourse = async () => {
    setLoading1(true)
    try {
      await axios.delete(serverUrl + `/api/course/remove/${courseId}`, { withCredentials: true })

      // ✅ always work with a guaranteed array
      const safeData = Array.isArray(courseData) ? courseData : []
      dispatch(setCourseData(safeData.filter(c => c._id !== courseId)))

      setLoading1(false)
      toast.success("Course Removed")
      navigate("/courses")
    } catch (error) {
      console.log(error)
      setLoading1(false)
      toast.error(error.response.data.message)
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
    <div className='min-h-screen relative overflow-hidden' style={{ background: '#0F172A' }}>

      <div className='fixed top-[-80px] right-[10%] w-[400px] h-[400px] bg-[#8B5CF6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />
      <div className='fixed bottom-[-80px] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] opacity-[0.07] rounded-full blur-[140px] pointer-events-none z-0' />

      <div className='max-w-5xl mx-auto p-6 pt-10 relative z-[1]'>

        {/* Top bar */}
        <div className='flex items-center justify-between flex-col md:flex-row gap-4 mb-8'>
          <div className='flex items-center gap-4 w-full md:w-auto'>
            <button
              className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300'
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
              onClick={() => navigate("/courses")}
            >
              <FaArrowLeftLong className='text-[#3B82F6] w-3.5 h-3.5' />
            </button>
            <div>
              <div className='flex items-center gap-2'>
                <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
                <h2 className='text-2xl font-bold' style={{
                  background: 'linear-gradient(90deg, #E2E8F0, #94A3B8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  Edit Course
                </h2>
              </div>
              <p className='text-sm text-[#94A3B8] pl-3 mt-0.5'>Update course details and settings</p>
            </div>
          </div>

          <button
            className='px-5 py-2.5 rounded-xl text-base font-semibold transition-all duration-300 whitespace-nowrap'
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
              color: '#fff',
              boxShadow: '0 0 16px rgba(59,130,246,0.4)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 26px rgba(139,92,246,0.6)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.4)'}
            onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
          >
            Go to Lectures →
          </button>
        </div>

        {/* Main card */}
        <div
          className='rounded-2xl p-6 md:p-8'
          style={{
            background: '#111827',
            border: '1px solid rgba(59,130,246,0.15)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className='flex items-center gap-2 mb-6'>
            <div className='w-1 h-6 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#8B5CF6]' />
            <h2 className='text-xl font-bold text-[#E2E8F0]'>Basic Course Information</h2>
          </div>

          <div className='flex flex-wrap gap-3 mb-8'>
            <button
              className='px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200'
              style={{
                background: isPublished ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                border: isPublished ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(34,197,94,0.3)',
                color: isPublished ? '#F87171' : '#4ADE80',
              }}
              onClick={() => setIsPublished(prev => !prev)}
            >
              {isPublished ? '● Unpublish Course' : '● Publish Course'}
            </button>

            <button
              className='px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2'
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#F87171',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
              onClick={handleRemoveCourse}
            >
              {loading1 ? <ClipLoader size={14} color='#F87171' /> : '🗑 Remove Course'}
            </button>
          </div>

          <div className='w-full h-[1px] mb-7'
            style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }} />

          <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>

            <div>
              <label style={labelStyle}>Course Title</label>
              <input type="text" style={inputStyle}
                placeholder='e.g. Complete Web Development Bootcamp'
                onChange={(e) => setTitle(e.target.value)} value={title}
                onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
              />
            </div>

            <div>
              <label style={labelStyle}>Course Subtitle</label>
              <input type="text" style={inputStyle}
                placeholder='e.g. Learn from scratch to advanced level'
                onChange={(e) => setSubTitle(e.target.value)} value={subTitle}
                onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
              />
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, height: 100, resize: 'none' }}
                placeholder='What will students learn in this course?'
                onChange={(e) => setDescription(e.target.value)} value={description}
                onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
                onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
              />
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex-1'>
                <label style={labelStyle}>Category</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }}
                  onChange={(e) => setCategory(e.target.value)} value={category}
                  onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
                  onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
                >
                  {['', 'App Development', 'AI/ML', 'AI Tools', 'Data Science',
                    'Data Analytics', 'Ethical Hacking', 'UI UX Designing',
                    'Web Development', 'Others'].map((cat) => (
                    <option key={cat || 'default'} value={cat}
                      style={{ background: '#111827', color: cat ? '#E2E8F0' : '#94A3B8' }}>
                      {cat || 'Select Category'}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex-1'>
                <label style={labelStyle}>Level</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }}
                  onChange={(e) => setLevel(e.target.value)} value={level}
                  onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
                  onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
                >
                  {['', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
                    <option key={l || 'default'} value={l}
                      style={{ background: '#111827', color: l ? '#E2E8F0' : '#94A3B8' }}>
                      {l || 'Select Level'}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div className='flex-1'>
                <label style={labelStyle}>Price (INR)</label>
                <input type="number" style={inputStyle}
                  placeholder='₹ Enter price (add 0 for free course)'
                  onChange={(e) => setPrice(e.target.value)} value={price}
                  onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
                  onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
                />
              </div> */}
              <div className='flex-1'>
  <label style={labelStyle}>Price (INR)</label>
  <input
    type="number"
    style={inputStyle}
    placeholder='₹ Enter price (0 for free course)'
    min={0}
    value={price}
    onChange={(e) => {
      const val = parseInt(e.target.value)
      setPrice(isNaN(val) || val < 0 ? 0 : val)
    }}
    onFocus={e => e.currentTarget.style.border = '1px solid #3B82F6'}
    onBlur={e => e.currentTarget.style.border = '1px solid rgba(59,130,246,0.2)'}
  />
</div>
            </div>

            <div>
              <label style={labelStyle}>Course Thumbnail</label>
              <input type="file" hidden ref={thumb} accept='image/*' onChange={handleThumbnail} />
              <div
                className='relative w-[300px] h-[170px] rounded-xl overflow-hidden cursor-pointer group'
                style={{
                  border: '2px dashed rgba(59,130,246,0.3)',
                  boxShadow: '0 0 20px rgba(59,130,246,0.08)',
                }}
                onClick={() => thumb.current.click()}
              >
                {frontendImage && (
                  <img src={frontendImage} alt="" className='w-full h-full object-cover transition-all duration-300 group-hover:brightness-75' />
                )}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <div className='flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold'
                    style={{ background: 'rgba(59,130,246,0.85)', color: '#fff' }}>
                    <FaEdit className='w-4 h-4' /> Change Thumbnail
                  </div>
                </div>
              </div>
              <p className='text-xs text-[#94A3B8] mt-2'>Click on the image to change thumbnail</p>
            </div>

            <div className='w-full h-[1px]'
              style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)' }} />

            <div className='flex items-center gap-4 pt-2'>
              <button
                className='px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-200'
                style={{ background: 'transparent', border: '1px solid rgba(59,130,246,0.25)', color: '#94A3B8' }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '1px solid rgba(239,68,68,0.4)'
                  e.currentTarget.style.color = '#F87171'
                  e.currentTarget.style.background = 'rgba(239,68,68,0.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(59,130,246,0.25)'
                  e.currentTarget.style.color = '#94A3B8'
                  e.currentTarget.style.background = 'transparent'
                }}
                onClick={() => navigate("/courses")}
              >
                Cancel
              </button>

              <button
                className='px-8 py-2.5 rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50'
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(59,130,246,0.4)',
                  minWidth: 120,
                }}
                onMouseEnter={e => !loading && (e.currentTarget.style.boxShadow = '0 0 30px rgba(139,92,246,0.6)')}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.4)'}
                onClick={handleEditCourse}
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} color='white' /> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditCourse