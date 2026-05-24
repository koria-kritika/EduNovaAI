
// import React, { useEffect, useState } from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6"
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import { setSelectedCourse } from '../redux/courseSlice'
// import { FaStar } from "react-icons/fa6"
// import img from "../assets/empty.jpg"
// import { FaPlayCircle } from "react-icons/fa"
// import { FaLock } from "react-icons/fa"
// import axios from 'axios'
// import { serverUrl } from '../App'
// import Card from '../component/Card'
// import { toast } from 'react-toastify'
// import { ClipLoader } from 'react-spinners'
// import { setUserData } from '../redux/userSlice'

// // Handles both boolean true and string "true" that can come from DB
// const isFree = (val) => val === true || val === 'true'

// function ViewCourse() {
//     const navigate = useNavigate()
//     const { courseId } = useParams()
//     const dispatch = useDispatch()

//     // ── Redux ──────────────────────────────────────────────────────────────
//     // Derive selectedCourse from courseData so socket updates flow in automatically.
//     // Fall back to state.course.selectedCourse for the case where courseData is empty
//     // (e.g. direct URL hit before fetch completes).
//     const courseData = useSelector(state => state.course.courseData)
//     const reduxSelected = useSelector(state => state.course.selectedCourse)
//     const userData = useSelector(state => state.user.userData)

//     const selectedCourse =
//         (Array.isArray(courseData) ? courseData.find(c => c._id === courseId) : null)
//         ?? reduxSelected

//     // ── Local state ────────────────────────────────────────────────────────
//     const [selectedLecture, setSelectedLecture] = useState(null)
//     const [creatorData, setCreatorData] = useState(null)
//     const [creatorCourses, setCreatorCourses] = useState([])
//     const [isEnrolled, setIsEnrolled] = useState(false)
//     const [rating, setRating] = useState(0)
//     const [comment, setComment] = useState('')
//     const [loading, setLoading] = useState(false)

//     // ── Keep Redux selectedCourse in sync (for legacy consumers) ──────────
//     useEffect(() => {
//         if (selectedCourse) dispatch(setSelectedCourse(selectedCourse))
//     }, [selectedCourse?._id])

//     // ── Auto-select / refresh selectedLecture when lectures list changes ───
//     // This runs whenever socket events add/edit/remove a lecture.
//     useEffect(() => {
//         const lectures = selectedCourse?.lectures
//         if (!lectures?.length) { setSelectedLecture(null); return }

//         setSelectedLecture(prev => {
//             // If nothing selected yet, pick the first free lecture
//             if (!prev) {
//                 return lectures.find(l => isFree(l.isPreviewFree)) ?? null
//             }
//             // If the previously selected lecture still exists, refresh its data
//             // (in case isPreviewFree or videoUrl changed via socket)
//             const refreshed = lectures.find(l => l._id === prev._id)
//             if (refreshed) return refreshed
//             // If it was deleted, fall back to first free
//             return lectures.find(l => isFree(l.isPreviewFree)) ?? null
//         })
//     }, [selectedCourse?.lectures])

//     // ── Check enrollment ───────────────────────────────────────────────────
//     useEffect(() => {
//         if (!userData || !courseId) return
//         const enrolled = userData?.enrolledCourses?.some(c =>
//             (typeof c === 'string' ? c : c._id).toString() === courseId.toString()
//         )
//         setIsEnrolled(!!enrolled)
//     }, [userData, courseId])

//     // ── Fetch creator ──────────────────────────────────────────────────────
//     useEffect(() => {
//         if (!selectedCourse?.creator) return
//         axios.post(serverUrl + '/api/course/creator', { userId: selectedCourse.creator }, { withCredentials: true })
//             .then(r => setCreatorData(r.data))
//             .catch(console.log)
//     }, [selectedCourse?.creator])

//     // ── Other courses by same creator ──────────────────────────────────────
//     useEffect(() => {
//         if (!creatorData?._id || !courseData?.length) return
//         setCreatorCourses(courseData.filter(c => c.creator === creatorData._id && c._id !== courseId))
//     }, [creatorData, courseData, courseId])

//     // ── Enroll via Razorpay ────────────────────────────────────────────────
//     const handleEnroll = async () => {
//         if (!userData?._id) { toast.error('Please log in to enroll.'); return }
//         try {
//             const { data: order } = await axios.post(
//                 serverUrl + '/api/order/razorpay-order',
//                 { userId: userData._id, courseId },
//                 { withCredentials: true }
//             )
//             const options = {
//                 key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                 amount: order.amount, currency: 'INR',
//                 name: 'EduNovaAI', description: 'COURSE ENROLLMENT PAYMENT',
//                 order_id: order.id,
//                 method: { upi: true, card: true, netbanking: true, wallet: true },
//                 handler: async (response) => {
//                     try {
//                         const { data: verify } = await axios.post(
//                             serverUrl + '/api/order/verifypayment',
//                             { ...response, courseId, userId: userData._id },
//                             { withCredentials: true }
//                         )
//                         const { data: freshUser } = await axios.get(serverUrl + '/api/user/getcurrentuser', { withCredentials: true })
//                         dispatch(setUserData(freshUser))
//                         setIsEnrolled(true)
//                         toast.success(verify.message)
//                     } catch (err) {
//                         toast.error(err?.response?.data?.message ?? 'Payment verification failed.')
//                     }
//                 },
//             }
//             new window.Razorpay(options).open()
//         } catch (err) {
//             console.log(err)
//             toast.error('Something went wrong while enrolling.')
//         }
//     }

//     // ── Submit review ──────────────────────────────────────────────────────
//     const handleReview = async () => {
//         if (!rating) { toast.error('Please select a star rating.'); return }
//         setLoading(true)
//         try {
//             await axios.post(serverUrl + '/api/review/createreview', { rating, comment, courseId }, { withCredentials: true })
//             toast.success('Review Added')
//             setRating(0); setComment('')
//         } catch (err) {
//             toast.error(err?.response?.data?.message ?? 'Failed to submit review.')
//             setRating(0); setComment('')
//         } finally {
//             setLoading(false)
//         }
//     }

//     // ── Derived ────────────────────────────────────────────────────────────
//     const avgRating = (() => {
//         const r = selectedCourse?.reviews
//         if (!r?.length) return 0
//         return (r.reduce((s, v) => s + v.rating, 0) / r.length).toFixed(1)
//     })()
//     const hasFreeLecture = selectedCourse?.lectures?.some(l => isFree(l.isPreviewFree))

//     // ── Render ─────────────────────────────────────────────────────────────
//     return (
//         <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #111827 50%, #0F172A 100%)', padding: '24px', fontFamily: "'Syne', 'Inter', sans-serif" }}>

//             {/* Ambient blobs */}
//             <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
//                 <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
//                 <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
//             </div>

//             <div style={{ maxWidth: '1152px', margin: '0 auto', position: 'relative', zIndex: 1, background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '20px', padding: '32px', boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

//                 {/* ── Top section ── */}
//                 <div className='flex flex-col md:flex-row gap-6'>

//                     {/* Thumbnail */}
//                     <div className='w-full md:w-1/2'>
//                         <button onClick={() => navigate('/')}
//                             style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: '#3B82F6', fontSize: '14px', fontWeight: '600', marginBottom: '16px', transition: 'all 0.2s ease' }}
//                             onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.3)' }}
//                             onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}>
//                             <FaArrowLeftLong /> Back
//                         </button>
//                         <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(139,92,246,0.2)' }}>
//                             <img src={selectedCourse?.thumbnail || img} alt="" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
//                         </div>
//                     </div>

//                     {/* Info */}
//                     <div style={{ flex: 1, marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                         <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#E2E8F0', lineHeight: 1.2, letterSpacing: '-0.5px' }}>{selectedCourse?.title}</h2>
//                         <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>{selectedCourse?.subTitle}</p>

//                         {/* Rating */}
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '20px', padding: '4px 12px', color: '#FBBF24', fontWeight: '700', fontSize: '14px' }}>
//                                 <FaStar style={{ fontSize: '12px' }} /> {avgRating}
//                             </div>
//                             <span style={{ color: '#94A3B8', fontSize: '13px' }}>{selectedCourse?.reviews?.length ?? 0} {selectedCourse?.reviews?.length === 1 ? 'Review' : 'Reviews'}</span>
//                         </div>

//                         {/* Price */}
//                         <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
//                             <span style={{ fontSize: '28px', fontWeight: '800', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹{selectedCourse?.price}</span>
//                             <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '14px' }}>₹599</span>
//                         </div>

//                         {/* Features */}
//                         <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                             {['Comprehensive and easy-to-follow learning content', 'Lifetime access to course materials and updates', 'Practical lessons with real-world applications', 'Learn at your own pace, anytime and anywhere', 'Designed for beginners as well as advancing learners'].map((item, i) => (
//                                 <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '14px' }}>
//                                     <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>✓</span>
//                                     {item}
//                                 </li>
//                             ))}
//                         </ul>

//                         {/* CTA */}
//                         {!isEnrolled ? (
//                             <button onClick={handleEnroll}
//                                 style={{ marginTop: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', border: 'none', borderRadius: '12px', cursor: 'pointer', color: 'white', fontWeight: '700', fontSize: '16px', width: 'fit-content', boxShadow: '0 4px 20px rgba(59,130,246,0.4)', transition: 'all 0.3s ease' }}
//                                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.6)' }}
//                                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,130,246,0.4)' }}>
//                                 ⚡ Enroll Now
//                             </button>
//                         ) : (
//                             <button onClick={() => navigate(`/viewlecture/${courseId}`)}
//                                 style={{ marginTop: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', border: 'none', borderRadius: '12px', cursor: 'pointer', color: 'white', fontWeight: '700', fontSize: '16px', width: 'fit-content', boxShadow: '0 4px 20px rgba(6,182,212,0.4)', transition: 'all 0.3s ease' }}
//                                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.6)' }}
//                                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(6,182,212,0.4)' }}>
//                                 ▶ Watch Now
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

//                 {/* ── What You'll Learn ── */}
//                 <div>
//                     <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #3B82F6, #8B5CF6)', display: 'inline-block' }} />
//                         What You'll Learn
//                     </h2>
//                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                         <li style={{ color: '#94A3B8', fontSize: '14px', background: 'rgba(59,130,246,0.06)', borderLeft: '3px solid #3B82F6', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
//                             Learn {selectedCourse?.category} from Beginning
//                         </li>
//                     </ul>
//                 </div>

//                 <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

//                 {/* ── Who This Course is For ── */}
//                 <div>
//                     <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #8B5CF6, #06B6D4)', display: 'inline-block' }} />
//                         Who This Course is For
//                     </h2>
//                     <div style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.7, background: 'rgba(139,92,246,0.06)', borderLeft: '3px solid #8B5CF6', borderRadius: '0 8px 8px 0', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                         {['Beginners starting their coding journey', 'Aspiring developers seeking practical skills', 'College students preparing for internships and placements', 'Working professionals upgrading their technical expertise', 'Freelancers who want to build websites and digital products', 'Career switchers transitioning into tech', 'Anyone passionate about learning modern technologies'].map((line, i) => (
//                             <span key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
//                                 <span style={{ color: '#8B5CF6', flexShrink: 0 }}>›</span>{line}
//                             </span>
//                         ))}
//                     </div>
//                 </div>

//                 <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

//                 {/* ── Curriculum + Video ── */}
//                 <div className='flex flex-col md:flex-row gap-6'>

//                     {/* Curriculum list */}
//                     <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '16px', padding: '24px' }} className='w-full md:w-2/5'>
//                         <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#E2E8F0', marginBottom: '4px' }}>Course Curriculum</h2>
//                         <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>{selectedCourse?.lectures?.length ?? 0} Lectures</p>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                             {selectedCourse?.lectures?.map((lecture, index) => {
//                                 const unlocked = isEnrolled || isFree(lecture.isPreviewFree)
//                                 const isActive = selectedLecture?._id === lecture._id
//                                 return (
//                                     <button key={lecture._id || index}
//                                         disabled={!unlocked}
//                                         onClick={() => { if (unlocked) setSelectedLecture(lecture) }}
//                                         style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', textAlign: 'left', border: isActive ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.06)', background: isActive ? 'rgba(59,130,246,0.12)' : unlocked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', cursor: unlocked ? 'pointer' : 'not-allowed', opacity: unlocked ? 1 : 0.45, transition: 'all 0.2s ease', width: '100%' }}
//                                         onMouseEnter={e => { if (unlocked && !isActive) { e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)' } }}
//                                         onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' } }}>
//                                         <span style={{ color: unlocked ? '#06B6D4' : '#94A3B8', fontSize: '16px', flexShrink: 0 }}>
//                                             {unlocked ? <FaPlayCircle /> : <FaLock />}
//                                         </span>
//                                         <span style={{ fontSize: '13px', fontWeight: '500', color: unlocked ? '#E2E8F0' : '#94A3B8' }}>
//                                             {lecture?.lectureTitle}
//                                         </span>
//                                     </button>
//                                 )
//                             })}
//                         </div>
//                     </div>

//                     {/* Video player */}
//                     <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '16px', padding: '24px' }} className='w-full md:w-3/5'>
//                         <div style={{ aspectRatio: '16/9', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#0F172A', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(59,130,246,0.1)' }}>
//                             {selectedLecture?.videoUrl ? (
//                                 /* key forces remount whenever the video src changes */
//                                 <video key={selectedLecture.videoUrl} className='w-full h-full object-cover' src={selectedLecture.videoUrl} controls />
//                             ) : (
//                                 <div style={{ textAlign: 'center' }}>
//                                     <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '2px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '22px', color: '#3B82F6' }}>▶</div>
//                                     <span style={{ color: '#94A3B8', fontSize: '14px' }}>
//                                         {hasFreeLecture ? 'Select a preview lecture to watch' : 'Enroll to access all lectures'}
//                                     </span>
//                                 </div>
//                             )}
//                         </div>
//                         {selectedLecture && (
//                             <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '10px' }}>
//                                 <p style={{ color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Now Playing</p>
//                                 <p style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>{selectedLecture.lectureTitle}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

//                 {/* ── Review ── */}
//                 <div>
//                     <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #FBBF24, #F59E0B)', display: 'inline-block' }} />
//                         Write a Review
//                     </h2>
//                     <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(59,130,246,0.12)', borderRadius: '14px', padding: '20px' }}>
//                         <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
//                             {[1, 2, 3, 4, 5].map(star => (
//                                 <FaStar key={star} onClick={() => setRating(star)}
//                                     style={{ fontSize: '24px', cursor: 'pointer', fill: star <= rating ? '#FBBF24' : '#334155', transition: 'all 0.15s ease', filter: star <= rating ? 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' : 'none' }} />
//                             ))}
//                         </div>
//                         <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder='Write your review here...' rows={3}
//                             style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '12px 14px', color: '#E2E8F0', fontSize: '14px', resize: 'vertical', outline: 'none', lineHeight: 1.6, transition: 'border-color 0.2s ease', boxSizing: 'border-box', fontFamily: 'inherit' }}
//                             onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
//                             onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'} />
//                         <button onClick={handleReview} disabled={loading}
//                             style={{ marginTop: '14px', padding: '12px 24px', background: loading ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', color: 'white', fontWeight: '600', fontSize: '14px', boxShadow: loading ? 'none' : '0 4px 16px rgba(59,130,246,0.35)', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                             {loading ? <ClipLoader size={20} color='white' /> : 'Submit Review'}
//                         </button>
//                     </div>
//                 </div>

//                 <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', margin: '28px 0' }} />

//                 {/* ── Creator Info ── */}
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '14px', padding: '20px' }}>
//                     <div style={{ borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(139,92,246,0.4)', boxShadow: '0 0 20px rgba(139,92,246,0.25)', width: '64px', height: '64px' }}>
//                         <img src={creatorData?.photoUrl || img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     </div>
//                     <div>
//                         <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#E2E8F0', marginBottom: '4px' }}>{creatorData?.name}</h2>
//                         <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '2px' }}>{creatorData?.description}</p>
//                         <p style={{ color: '#06B6D4', fontSize: '13px' }}>{creatorData?.email}</p>
//                     </div>
//                 </div>

//                 {/* ── Creator's other courses ── */}
//                 <div style={{ marginTop: '28px' }}>
//                     <p style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #06B6D4, #8B5CF6)', display: 'inline-block' }} />
//                         LEARN MORE FROM THIS EDUCATOR
//                     </p>
//                 </div>
//                 <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
//                     {creatorCourses?.map((course, index) => (
//                         <Card key={course._id || index} thumbnail={course.thumbnail} id={course._id} price={course.price} title={course.title} category={course.category} />
//                     ))}
//                 </div>

//             </div>

//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
//                 * { box-sizing: border-box; }
//                 textarea::placeholder { color: #475569; }
//                 video::-webkit-media-controls-panel { background: rgba(15,23,42,0.9); }
//             `}</style>
//         </div>
//     )
// }

// export default ViewCourse

import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedCourse } from '../redux/courseSlice'
import { FaStar } from "react-icons/fa6"
import img from "../assets/empty.jpg"
import { FaPlayCircle } from "react-icons/fa"
import { FaLock } from "react-icons/fa"
import axios from 'axios'
import { serverUrl, socket } from '../App'
import Card from '../component/Card'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { setUserData } from '../redux/userSlice'

const isFree = (val) => val === true || val === 'true'

function ViewCourse() {
    const navigate = useNavigate()
    const { courseId } = useParams()
    const dispatch = useDispatch()

    const courseData = useSelector(state => state.course.courseData)
    const reduxSelected = useSelector(state => state.course.selectedCourse)
    const userData = useSelector(state => state.user.userData)

    const selectedCourse =
        (Array.isArray(courseData) ? courseData.find(c => c._id === courseId) : null)
        ?? reduxSelected

    const [selectedLecture, setSelectedLecture] = useState(null)
    const [creatorData, setCreatorData] = useState(null)
    const [creatorCourses, setCreatorCourses] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    // Sync Redux selectedCourse for legacy consumers
    useEffect(() => {
        if (selectedCourse) dispatch(setSelectedCourse(selectedCourse))
    }, [selectedCourse?._id])

    // ✅ FIX 1: Redirect home when this course is deleted/unpublished live
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

    // Auto-select / refresh selectedLecture when lectures list changes
    useEffect(() => {
        const lectures = selectedCourse?.lectures
        if (!lectures?.length) { setSelectedLecture(null); return }

        setSelectedLecture(prev => {
            if (!prev) return lectures.find(l => isFree(l.isPreviewFree)) ?? null
            const refreshed = lectures.find(l => l._id === prev._id)
            if (refreshed) return refreshed
            return lectures.find(l => isFree(l.isPreviewFree)) ?? null
        })
    }, [selectedCourse?.lectures])

    // Check enrollment
    useEffect(() => {
        if (!userData || !courseId) return
        const enrolled = userData?.enrolledCourses?.some(c =>
            (typeof c === 'string' ? c : c._id).toString() === courseId.toString()
        )
        setIsEnrolled(!!enrolled)
    }, [userData, courseId])

    // Fetch creator
    useEffect(() => {
        if (!selectedCourse?.creator) return
        axios.post(serverUrl + '/api/course/creator', { userId: selectedCourse.creator }, { withCredentials: true })
            .then(r => setCreatorData(r.data))
            .catch(console.log)
    }, [selectedCourse?.creator])

    // Other courses by same creator
    useEffect(() => {
        if (!creatorData?._id || !courseData?.length) return
        setCreatorCourses(courseData.filter(c => c.creator === creatorData._id && c._id !== courseId))
    }, [creatorData, courseData, courseId])

    // Enroll via Razorpay
    const handleEnroll = async () => {
        if (!userData?._id) { toast.error('Please log in to enroll.'); return }
        try {
            const { data: order } = await axios.post(
                serverUrl + '/api/order/razorpay-order',
                { userId: userData._id, courseId },
                { withCredentials: true }
            )
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount, currency: 'INR',
                name: 'EduNovaAI', description: 'COURSE ENROLLMENT PAYMENT',
                order_id: order.id,
                method: { upi: true, card: true, netbanking: true, wallet: true },
                handler: async (response) => {
                    try {
                        const { data: verify } = await axios.post(
                            serverUrl + '/api/order/verifypayment',
                            { ...response, courseId, userId: userData._id },
                            { withCredentials: true }
                        )
                        const { data: freshUser } = await axios.get(serverUrl + '/api/user/getcurrentuser', { withCredentials: true })
                        dispatch(setUserData(freshUser))
                        setIsEnrolled(true)
                        toast.success(verify.message)
                    } catch (err) {
                        toast.error(err?.response?.data?.message ?? 'Payment verification failed.')
                    }
                },
            }
            new window.Razorpay(options).open()
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong while enrolling.')
        }
    }

    // Submit review
    const handleReview = async () => {
        if (!rating) { toast.error('Please select a star rating.'); return }
        setLoading(true)
        try {
            await axios.post(serverUrl + '/api/review/createreview', { rating, comment, courseId }, { withCredentials: true })
            toast.success('Review Added')
            setRating(0); setComment('')
        } catch (err) {
            toast.error(err?.response?.data?.message ?? 'Failed to submit review.')
            setRating(0); setComment('')
        } finally {
            setLoading(false)
        }
    }

    // Derived values
    const avgRating = (() => {
        const r = selectedCourse?.reviews
        if (!r?.length) return 0
        return (r.reduce((s, v) => s + v.rating, 0) / r.length).toFixed(1)
    })()

    const hasFreeLecture = selectedCourse?.lectures?.some(l => isFree(l.isPreviewFree))

   
    const canWatch = isEnrolled || hasFreeLecture

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #111827 50%, #0F172A 100%)', padding: '24px', fontFamily: "'Syne', 'Inter', sans-serif" }}>

            {/* Ambient blobs */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
            </div>

            <div style={{ maxWidth: '1152px', margin: '0 auto', position: 'relative', zIndex: 1, background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '20px', padding: '32px', boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

                {/* ── Top section ── */}
                <div className='flex flex-col md:flex-row gap-6'>

                    {/* Thumbnail */}
                    <div className='w-full md:w-1/2'>
                        <button onClick={() => navigate('/')}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: '#3B82F6', fontSize: '14px', fontWeight: '600', marginBottom: '16px', transition: 'all 0.2s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.3)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}>
                            <FaArrowLeftLong /> Back
                        </button>
                        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(139,92,246,0.2)' }}>
                            <img src={selectedCourse?.thumbnail || img} alt="" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#E2E8F0', lineHeight: 1.2, letterSpacing: '-0.5px' }}>{selectedCourse?.title}</h2>
                        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6 }}>{selectedCourse?.subTitle}</p>

                        {/* Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '20px', padding: '4px 12px', color: '#FBBF24', fontWeight: '700', fontSize: '14px' }}>
                                <FaStar style={{ fontSize: '12px' }} /> {avgRating}
                            </div>
                            <span style={{ color: '#94A3B8', fontSize: '13px' }}>{selectedCourse?.reviews?.length ?? 0} {selectedCourse?.reviews?.length === 1 ? 'Review' : 'Reviews'}</span>
                        </div>

                        {/* Price — hide if free course */}
                        {selectedCourse?.price > 0 && (
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                <span style={{ fontSize: '28px', fontWeight: '800', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹{selectedCourse?.price}</span>
                                <span style={{ textDecoration: 'line-through', color: '#94A3B8', fontSize: '14px' }}>₹599</span>
                            </div>
                        )}
                        {selectedCourse?.price === 0 && (
                            <div>
                                <span style={{ fontSize: '22px', fontWeight: '800', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Free</span>
                            </div>
                        )}

                        {/* Features */}
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {['Comprehensive and easy-to-follow learning content', 'Lifetime access to course materials and updates', 'Take quiz anytime for the entire course', 'Learn at your own pace, anytime and anywhere', 'Generate certificate just by completing quiz'].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '14px' }}>
                                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroun1d: 'linear-gradient(135deg, #06B6D4, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* ✅ FIX 2: canWatch controls the button, not just isEnrolled */}
                        {!canWatch ? (
                            <button onClick={handleEnroll}
                                style={{ marginTop: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', border: 'none', borderRadius: '12px', cursor: 'pointer', color: 'white', fontWeight: '700', fontSize: '16px', width: 'fit-content', boxShadow: '0 4px 20px rgba(59,130,246,0.4)', transition: 'all 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(59,130,246,0.6)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,130,246,0.4)' }}>
                                ⚡ Enroll Now
                            </button>
                        ) : (
                            <button onClick={() => navigate(`/viewlecture/${courseId}`)}
                                style={{ marginTop: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', border: 'none', borderRadius: '12px', cursor: 'pointer', color: 'white', fontWeight: '700', fontSize: '16px', width: 'fit-content', boxShadow: '0 4px 20px rgba(6,182,212,0.4)', transition: 'all 0.3s ease' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.6)' }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(6,182,212,0.4)' }}>
                                ▶ Watch Now
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

                {/* ── What You'll Learn ── */}
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #3B82F6, #8B5CF6)', display: 'inline-block' }} />
                        What You'll Learn
                    </h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ color: '#94A3B8', fontSize: '14px', background: 'rgba(59,130,246,0.06)', borderLeft: '3px solid #3B82F6', borderRadius: '0 8px 8px 0', padding: '10px 14px' }}>
                            Learn {selectedCourse?.category} from Beginning
                        </li>
                    </ul>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

                {/* ── Who This Course is For ── */}
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #8B5CF6, #06B6D4)', display: 'inline-block' }} />
                        Who This Course is For
                    </h2>
                    <div style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.7, background: 'rgba(139,92,246,0.06)', borderLeft: '3px solid #8B5CF6', borderRadius: '0 8px 8px 0', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {['Beginners starting their coding journey', 'Aspiring developers seeking practical skills', 'College students preparing for internships and placements', 'Working professionals upgrading their technical expertise', 'Freelancers who want to build websites and digital products', 'Career switchers transitioning into tech', 'Anyone passionate about learning modern technologies'].map((line, i) => (
                            <span key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                <span style={{ color: '#8B5CF6', flexShrink: 0 }}>›</span>{line}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

                {/* ── Curriculum + Video ── */}
                <div className='flex flex-col md:flex-row gap-6'>

                    {/* Curriculum list */}
                    <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '16px', padding: '24px' }} className='w-full md:w-2/5'>
                        <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#E2E8F0', marginBottom: '4px' }}>Course Curriculum</h2>
                        <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>{selectedCourse?.lectures?.length ?? 0} Lectures</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {selectedCourse?.lectures?.map((lecture, index) => {
                                const unlocked = isEnrolled || isFree(lecture.isPreviewFree)
                                const isActive = selectedLecture?._id === lecture._id
                                return (
                                    <button key={lecture._id || index}
                                        disabled={!unlocked}
                                        onClick={() => { if (unlocked) setSelectedLecture(lecture) }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', textAlign: 'left', border: isActive ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(255,255,255,0.06)', background: isActive ? 'rgba(59,130,246,0.12)' : unlocked ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', cursor: unlocked ? 'pointer' : 'not-allowed', opacity: unlocked ? 1 : 0.45, transition: 'all 0.2s ease', width: '100%' }}
                                        onMouseEnter={e => { if (unlocked && !isActive) { e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)' } }}
                                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' } }}>
                                        <span style={{ color: unlocked ? '#06B6D4' : '#94A3B8', fontSize: '16px', flexShrink: 0 }}>
                                            {unlocked ? <FaPlayCircle /> : <FaLock />}
                                        </span>
                                        <span style={{ fontSize: '13px', fontWeight: '500', color: unlocked ? '#E2E8F0' : '#94A3B8' }}>
                                            {lecture?.lectureTitle}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Video player */}
                    <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '16px', padding: '24px' }} className='w-full md:w-3/5'>
                        <div style={{ aspectRatio: '16/9', width: '100%', borderRadius: '12px', overflow: 'hidden', background: '#0F172A', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(59,130,246,0.1)' }}>
                            {selectedLecture?.videoUrl ? (
                                <video key={selectedLecture.videoUrl} className='w-full h-full object-cover' src={selectedLecture.videoUrl} controls />
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '2px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '22px', color: '#3B82F6' }}>▶</div>
                                    <span style={{ color: '#94A3B8', fontSize: '14px' }}>
                                        {hasFreeLecture  || isEnrolled? 'Select a preview lecture to watch' : 'Enroll to access all lectures'}
                                    </span>
                                </div>
                            )}
                        </div>
                        {selectedLecture && (
                            <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '10px' }}>
                                <p style={{ color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Now Playing</p>
                                <p style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: '600' }}>{selectedLecture.lectureTitle}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', margin: '28px 0' }} />

                {/* ── Review ── */}
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #FBBF24, #F59E0B)', display: 'inline-block' }} />
                        Write a Review
                    </h2>
                    <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(59,130,246,0.12)', borderRadius: '14px', padding: '20px' }}>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <FaStar key={star} onClick={() => setRating(star)}
                                    style={{ fontSize: '24px', cursor: 'pointer', fill: star <= rating ? '#FBBF24' : '#334155', transition: 'all 0.15s ease', filter: star <= rating ? 'drop-shadow(0 0 4px rgba(251,191,36,0.5))' : 'none' }} />
                            ))}
                        </div>
                        <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder='Write your review here...' rows={3}
                            style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '12px 14px', color: '#E2E8F0', fontSize: '14px', resize: 'vertical', outline: 'none', lineHeight: 1.6, transition: 'border-color 0.2s ease', boxSizing: 'border-box', fontFamily: 'inherit' }}
                            onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'} />
                        <button onClick={handleReview} disabled={loading}
                            style={{ marginTop: '14px', padding: '12px 24px', background: loading ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', color: 'white', fontWeight: '600', fontSize: '14px', boxShadow: loading ? 'none' : '0 4px 16px rgba(59,130,246,0.35)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {loading ? <ClipLoader size={20} color='white' /> : 'Submit Review'}
                        </button>
                    </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)', margin: '28px 0' }} />

                {/* ── Creator Info ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '14px', padding: '20px' }}>
                    <div style={{ borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(139,92,246,0.4)', boxShadow: '0 0 20px rgba(139,92,246,0.25)', width: '64px', height: '64px' }}>
                        <img src={creatorData?.photoUrl || img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#E2E8F0', marginBottom: '4px' }}>{creatorData?.name}</h2>
                        <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '2px' }}>{creatorData?.description}</p>
                        <p style={{ color: '#06B6D4', fontSize: '13px' }}>{creatorData?.email}</p>
                    </div>
                </div>

                {/* ── Creator's other courses ── */}
                <div style={{ marginTop: '28px' }}>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '20px', borderRadius: '2px', background: 'linear-gradient(180deg, #06B6D4, #8B5CF6)', display: 'inline-block' }} />
                        LEARN MORE FROM THIS EDUCATOR
                    </p>
                </div>
                <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>
                    {creatorCourses?.map((course, index) => (
                        <Card key={course._id || index} thumbnail={course.thumbnail} id={course._id} price={course.price} title={course.title} category={course.category} />
                    ))}
                </div>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
                * { box-sizing: border-box; }
                textarea::placeholder { color: #475569; }
                video::-webkit-media-controls-panel { background: rgba(15,23,42,0.9); }
            `}</style>
        </div>
    )
}

export default ViewCourse
