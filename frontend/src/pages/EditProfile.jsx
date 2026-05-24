// import axios from 'axios';
// import React, { useState } from 'react'
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { serverUrl } from '../App';
// import { setUserData } from '../redux/userSlice';
// import { toast } from 'react-toastify';
// import { ClipLoader } from 'react-spinners';
// function EditProfile() {
//     const navigate = useNavigate()
//     const {userData} = useSelector(state=>state.user)
//     const [name ,setName] = useState(userData.name || "")
//     const [description,setDescription] = useState(userData.description || "")
//     const [photoUrl,setPhotoUrl] = useState(null)
//     const [loading,setLoading] = useState(false)
//     const dispatch = useDispatch()

//     const formData = new FormData()
//     formData.append("name",name)
//     formData.append("description",description)
//     formData.append("photoUrl" , photoUrl)


//     const handleEditProfile = async () => {
//         setLoading(true)
//         try {
//             const result = await axios.post(serverUrl + "/api/user/profile" , formData , {withCredentials:true})
//             dispatch(setUserData(result.data))
//             setLoading(false)
//             navigate("/")
//             toast.success("Profile Updated")
//          } catch (error) {
//             setLoading(false)
//             console.log(error)
//             toast.error(error.response.data.message)
//         }
        
//     }

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
//         <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
//         <FaArrowLeftLong  className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/profile")}/>
//             <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Edit Profile</h2>
//         <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
//            <div className='flex flex-col items-center text-center'>
//            {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt="" />: 
//         <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black  border-white'>
//          {userData?.name.slice(0,1).toUpperCase()}
//           </div>}
//            </div>

//            <div >
//             <label htmlFor="image" className='text-sm font-medium text-gray-700' >Select Avatar</label>
//             <input id='image' type="file"
//             name='photoUrl'
//             placeholder='PhotoUrl' 
//             accept='image/*'
//             className='w-full px-4 py-2 border rounded-md text-sm '
//             onChange={(e)=>setPhotoUrl(e.target.files[0])}/>
//            </div>
//            <div >
//             <label htmlFor="name" className='text-sm font-medium text-gray-700' >UserName</label>
//             <input id='name' type="text"
            
//             placeholder={userData.name} 
//             accept='image/*'
//             className='w-full px-4 py-2 border rounded-md text-sm '
//             onChange={(e)=>setName(e.target.value)} value={name}/>
//            </div>
//            <div >
//             <label  className='text-sm font-medium text-gray-700' >Email</label>
//             <input readOnly type="text" 
//             placeholder={userData.email} 
//             className='w-full px-4 py-2 border rounded-md text-sm '/>
//            </div>
//            <div >
//             <label  className='text-sm font-medium text-gray-700' >Bio</label>
//             <textarea 
//             name='description'
//             placeholder="Tell us about yourself" 
//             rows={3}
//             className='w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]
//              '
//              onChange={(e)=>setDescription(e.target.value)} value={description}/>
//            </div>
//           <button className='w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer'disabled={loading} onClick={handleEditProfile}>{loading?<ClipLoader size={30} color='white'/>:"Save Changes"}</button>
//         </form>

//         </div>
      
//     </div>
//   )
// }

// export default EditProfile

import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaUser, FaEnvelope, FaAlignLeft, FaImage } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

function EditProfile() {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.user)
  const [name, setName] = useState(userData.name || "")
  const [description, setDescription] = useState(userData.description || "")
  const [photoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const formData = new FormData()
  formData.append("name", name)
  formData.append("description", description)
  formData.append("photoUrl", photoUrl)

  const handleEditProfile = async () => {
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/user/profile", formData, { withCredentials: true })
      dispatch(setUserData(result.data))
      setLoading(false)
      navigate("/")
      toast.success("Profile Updated")
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    background: 'rgba(15,23,42,0.7)',
    border: '1px solid rgba(59,130,246,0.2)',
    borderRadius: 10, color: '#E2E8F0',
    fontSize: 13, fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 12, fontWeight: 600, color: '#94A3B8',
    marginBottom: 6, letterSpacing: '0.3px', textTransform: 'uppercase',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #111827 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 16px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .edit-input:focus { border-color: rgba(139,92,246,0.5) !important; }
        .edit-input::placeholder { color: #475569; }
        .edit-input:read-only { opacity: 0.5; cursor: not-allowed; }
        .file-input::file-selector-button {
          background: rgba(59,130,246,0.15);
          border: 1px solid rgba(59,130,246,0.3);
          color: #3B82F6; font-size: 12px; font-weight: 600;
          padding: 5px 12px; border-radius: 6px; cursor: pointer;
          font-family: inherit; margin-right: 10px; transition: all 0.2s;
        }
        .file-input::file-selector-button:hover { background: rgba(59,130,246,0.25); }
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
        borderRadius: 20, padding: '40px 32px',
        maxWidth: 480, width: '100%',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>

        {/* Back button */}
        <button
          onClick={() => navigate("/profile")}
          style={{
            position: 'absolute', top: 20, left: 20,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
            color: '#3B82F6', fontSize: 13, fontWeight: 600,
            fontFamily: 'inherit', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <FaArrowLeftLong style={{ width: 15, height: 15 }} /> Back
        </button>

        {/* Heading */}
        <h2 style={{
          fontSize: 22, fontWeight: 800, textAlign: 'center',
          background: 'linear-gradient(135deg, #E2E8F0, #94A3B8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          margin: '16px 0 28px', letterSpacing: '-0.3px',
        }}>Edit Profile</h2>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Avatar preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            {userData?.photoUrl
              ? <img src={userData?.photoUrl} alt="" style={{
                  width: 88, height: 88, borderRadius: '50%', objectFit: 'cover',
                  border: '3px solid rgba(139,92,246,0.5)',
                  boxShadow: '0 0 24px rgba(139,92,246,0.3)',
                }} />
              : <div style={{
                  width: 88, height: 88, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, fontWeight: 800, color: 'white',
                  boxShadow: '0 0 24px rgba(139,92,246,0.35)',
                  border: '3px solid rgba(139,92,246,0.4)',
                }}>
                  {userData?.name.slice(0, 1).toUpperCase()}
                </div>
            }
          </div>

          {/* Avatar upload */}
          <div>
            <label style={labelStyle}>
              <FaImage style={{ color: '#06B6D4', fontSize: 50 }} /> Select Avatar
            </label>
            <input
              id="image" type="file" name="photoUrl" accept="image/*"
              className="file-input edit-input"
              style={{ ...inputStyle, padding: '8px 10px', color: '#94A3B8' }}
              onChange={e => setPhotoUrl(e.target.files[0])}
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="name" style={labelStyle}>
              <FaUser style={{ color: '#8B5CF6', fontSize: 18 }} /> Username
            </label>
            <input
              id="name" type="text"
              placeholder={userData.name}
              value={name}
              className="edit-input"
              style={inputStyle}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label style={labelStyle}>
              <FaEnvelope style={{ color: '#3B82F6', fontSize: 18 }} /> Email
            </label>
            <input
              readOnly type="text"
              placeholder={userData.email}
              className="edit-input"
              style={inputStyle}
            />
          </div>

          {/* Bio */}
          <div>
            <label style={labelStyle}>
              <FaAlignLeft style={{ color: '#94A3B8', fontSize: 18 }} /> Bio
            </label>
            <textarea
              name="description"
              placeholder="Tell us about yourself"
              rows={3}
              value={description}
              className="edit-input"
              style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.25), transparent)' }} />

          {/* Save button */}
          <button
            onClick={handleEditProfile}
            disabled={loading}
            style={{
              width: '100%', padding: '13px 0',
              background: loading ? 'rgba(59,130,246,0.3)' : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer',
              color: 'white', fontSize: 14, fontWeight: 700,
              fontFamily: 'inherit', letterSpacing: '0.2px',
              boxShadow: loading ? 'none' : '0 4px 18px rgba(59,130,246,0.4)',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,130,246,0.55)' } }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(59,130,246,0.4)' }}
          >
            {loading ? <ClipLoader size={22} color="white" /> : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditProfile