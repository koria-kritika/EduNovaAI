
// import axios from 'axios'
// import React, { useState } from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6"
// import { FaUser, FaEnvelope, FaAlignLeft, FaImage } from "react-icons/fa"
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { serverUrl } from '../App'
// import { setUserData } from '../redux/userSlice'
// import { toast } from 'react-toastify'
// import { ClipLoader } from 'react-spinners'

// function EditProfile() {
//   const navigate = useNavigate()
//   const { userData } = useSelector(state => state.user)
//   const [name, setName] = useState(userData.name || "")
//   const [description, setDescription] = useState(userData.description || "")
//   const [photoUrl, setPhotoUrl] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const dispatch = useDispatch()

//   const formData = new FormData()
//   formData.append("name", name)
//   formData.append("description", description)
//   formData.append("photoUrl", photoUrl)

//   const handleEditProfile = async () => {
//     setLoading(true)
//     try {
//       const result = await axios.post(serverUrl + "/api/user/profile", formData, { withCredentials: true })
//       dispatch(setUserData(result.data))
//       setLoading(false)
//       navigate("/")
//       toast.success("Profile Updated")
//     } catch (error) {
//       setLoading(false)
//       console.log(error)
//       toast.error(error.response.data.message)
//     }
//   }

//   const inputStyle = {
//     width: '100%', padding: '10px 14px',
//     background: 'rgba(15,23,42,0.7)',
//     border: '1px solid rgba(59,130,246,0.2)',
//     borderRadius: 10, color: '#E2E8F0',
//     fontSize: 13, fontFamily: 'inherit',
//     outline: 'none', transition: 'border-color 0.2s',
//     boxSizing: 'border-box',
//   }

//   const labelStyle = {
//     display: 'flex', alignItems: 'center', gap: 6,
//     fontSize: 12, fontWeight: 600, color: '#94A3B8',
//     marginBottom: 6, letterSpacing: '0.3px', textTransform: 'uppercase',
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       padding: '40px 16px',
//       fontFamily: "'Plus Jakarta Sans', sans-serif",
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         .edit-input:focus { border-color: rgba(139,92,246,0.5) !important; }
//         .edit-input::placeholder { color: #475569; }
//         .edit-input:read-only { opacity: 0.5; cursor: not-allowed; }
//         .file-input::file-selector-button {
//           background: rgba(59,130,246,0.15);
//           border: 1px solid rgba(59,130,246,0.3);
//           color: #3B82F6; font-size: 12px; font-weight: 600;
//           padding: 5px 12px; border-radius: 6px; cursor: pointer;
//           font-family: inherit; margin-right: 10px; transition: all 0.2s;
//         }
//         .file-input::file-selector-button:hover { background: rgba(59,130,246,0.25); }
//       `}</style>

//       {/* Ambient blobs */}
//       <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
//         <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
//       </div>

//       <div style={{
//         position: 'relative', zIndex: 1,
//         background: 'rgba(30,41,59,0.75)',
//         backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
//         border: '1px solid rgba(59,130,246,0.15)',
//         borderRadius: 20, padding: '40px 32px',
//         maxWidth: 480, width: '100%',
//         boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
//       }}>

//         {/* Back button */}
//         <button
//           onClick={() => navigate("/profile")}
//           style={{
//             position: 'absolute', top: 20, left: 20,
//             display: 'inline-flex', alignItems: 'center', gap: 6,
//             background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
//             borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
//             color: '#3B82F6', fontSize: 13, fontWeight: 600,
//             fontFamily: 'inherit', transition: 'all 0.2s',
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.3)' }}
//           onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
//         >
//           <FaArrowLeftLong style={{ width: 15, height: 15 }} /> Back
//         </button>

//         {/* Heading */}
//         <h2 style={{
//           fontSize: 22, fontWeight: 800, textAlign: 'center',
//           background: 'linear-gradient(135deg, #E2E8F0, #94A3B8)',
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//           margin: '16px 0 28px', letterSpacing: '-0.3px',
//         }}>Edit Profile</h2>

//         <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

//           {/* Avatar preview */}
//           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
//             {userData?.photoUrl
//               ? <img src={userData?.photoUrl} alt="" style={{
//                   width: 88, height: 88, borderRadius: '50%', objectFit: 'cover',
//                   border: '3px solid rgba(139,92,246,0.5)',
//                   boxShadow: '0 0 24px rgba(139,92,246,0.3)',
//                 }} />
//               : <div style={{
//                   width: 88, height: 88, borderRadius: '50%',
//                   background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   fontSize: 32, fontWeight: 800, color: 'white',
//                   boxShadow: '0 0 24px rgba(139,92,246,0.35)',
//                   border: '3px solid rgba(139,92,246,0.4)',
//                 }}>
//                   {userData?.name.slice(0, 1).toUpperCase()}
//                 </div>
//             }
//           </div>

//           {/* Avatar upload */}
//           <div>
//             <label style={labelStyle}>
//               <FaImage style={{ color: '#06B6D4', fontSize: 50 }} /> Select Avatar
//             </label>
//             <input
//               id="image" type="file" name="photoUrl" accept="image/*"
//               className="file-input edit-input"
//               style={{ ...inputStyle, padding: '8px 10px', color: '#94A3B8' }}
//               onChange={e => setPhotoUrl(e.target.files[0])}
//             />
//           </div>

//           {/* Username */}
//           <div>
//             <label htmlFor="name" style={labelStyle}>
//               <FaUser style={{ color: '#8B5CF6', fontSize: 18 }} /> Username
//             </label>
//             <input
//               id="name" type="text"
//               placeholder={userData.name}
//               value={name}
//               className="edit-input"
//               style={inputStyle}
//               onChange={e => setName(e.target.value)}
//             />
//           </div>

//           {/* Email (readonly) */}
//           <div>
//             <label style={labelStyle}>
//               <FaEnvelope style={{ color: '#3B82F6', fontSize: 18 }} /> Email
//             </label>
//             <input
//               readOnly type="text"
//               placeholder={userData.email}
//               className="edit-input"
//               style={inputStyle}
//             />
//           </div>

//           {/* Bio */}
//           <div>
//             <label style={labelStyle}>
//               <FaAlignLeft style={{ color: '#94A3B8', fontSize: 18 }} /> Bio
//             </label>
//             <textarea
//               name="description"
//               placeholder="Tell us about yourself"
//               rows={3}
//               value={description}
//               className="edit-input"
//               style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
//               onChange={e => setDescription(e.target.value)}
//             />
//           </div>

//           {/* Divider */}
//           <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }} />

//           {/* Save button */}
//           <button
//             onClick={handleEditProfile}
//             disabled={loading}
//             style={{
//               width: '100%', padding: '13px 0',
//               background: loading ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
//               border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer',
//               color: 'white', fontSize: 14, fontWeight: 700,
//               fontFamily: 'inherit', letterSpacing: '0.2px',
//               boxShadow: loading ? 'none' : '0 4px 18px rgba(59,130,246,0.4)',
//               transition: 'all 0.2s',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}
//             onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.55)' } }}
//             onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(59,130,246,0.4)' }}
//           >
//             {loading ? <ClipLoader size={22} color="white" /> : "Save Changes"}
//           </button>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default EditProfile
import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeftLong, FaUser, FaEnvelope, FaAlignLeft, FaImage, FaPenToSquare } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditProfile() {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData?.name || "")
  const [description, setDescription] = useState(userData?.description || "")
  const [photoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleEditProfile = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    if (photoUrl) formData.append("photoUrl", photoUrl)
    
    try {
      const result = await axios.post(`${serverUrl}/api/user/profile`, formData, { withCredentials: true })
      dispatch(setUserData(result.data))
      toast.success("Profile Updated Successfully")
      navigate("/profile")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '16px',
    background: '#F9FAFB', border: '2px solid #E2E8F0',
    borderRadius: '16px', color: '#1E293B',
    fontSize: '15px', fontWeight: '500',
    outline: 'none', transition: 'all 0.3s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F3E8FF 0%, #E8F5E9 100%)',
      padding: '40px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');`}</style>

      <div style={{
        background: '#ff23670d', border: '5px solid rgba(255,35,103,0.15)', borderRadius: '40px', padding: '50px 40px',
        maxWidth: 550, width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        
        <button
          onClick={() => navigate("/profile")}
          style={{
            position: 'absolute', top: 30, left: 30,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#F3F4F6', border: 'none',
            borderRadius: 50, padding: '12px 20px', cursor: 'pointer',
            color: '#6C5CE7', fontSize: 14, fontWeight: 700,
          }}
        >
          <FaArrowLeftLong /> Back
        </button>

        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', color: '#1E293B', margin: '20px 0 35px' }}>
          Edit Profile
        </h2>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <div style={{
              width: 120, height: 120, borderRadius: '35px',
              background: 'linear-gradient(135deg, #6C5CE7, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 45, fontWeight: 800, color: 'white',
            }}>
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'block' }}>PROFILE PICTURE</label>
            <input type="file" accept="image/*" onChange={e => setPhotoUrl(e.target.files[0])} 
              style={{ ...inputStyle, padding: '10px' }} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'block' }}>USERNAME</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'block' }}>BIO</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, height: '120px', resize: 'none' }} />
          </div>

          <button
            onClick={handleEditProfile}
            disabled={loading}
            style={{
              marginTop: 20, width: '100%', padding: '20px',
              borderRadius: 20, border: 'none', cursor: 'pointer',
              background: '#6C5CE7', color: 'white',
              fontSize: 17, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              boxShadow: '0 10px 20px -5px rgba(108,92,231,0.5)'
            }}
          >
            {loading ? <ClipLoader size={20} color="white" /> : <><FaPenToSquare /> Save Changes</>}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile