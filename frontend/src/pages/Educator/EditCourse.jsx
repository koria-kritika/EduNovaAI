import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';
import { serverUrl } from '../../App';
import img from "../../assets/empty.jpg";

function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef();
  const dispatch = useDispatch();
  const { courseData } = useSelector(state => state.course);

  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/course/getcourse/${courseId}`, { withCredentials: true });
      setSelectCourse(result.data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price ?? 0);
      setFrontendImage(selectCourse.thumbnail || img);
      setIsPublished(selectCourse?.isPublished);
    }
  }, [selectCourse]);

  useEffect(() => { getCourseById(); }, []);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    if(backendImage) formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);
    try {
      const result = await axios.post(`${serverUrl}/api/course/editcourse/${courseId}`, formData, { withCredentials: true });
      const updateData = result.data;
      const safeData = Array.isArray(courseData) ? courseData : [];
      if (updateData.isPublished) {
        dispatch(setCourseData(safeData.map(c => c._id === courseId ? updateData : c)));
      } else {
        dispatch(setCourseData(safeData.filter(c => c._id !== courseId)));
      }
      toast.success("Course Updated");
      navigate("/courses");
    } catch (error) { toast.error(error.response?.data?.message || "Error"); } 
    finally { setLoading(false); }
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      await axios.delete(`${serverUrl}/api/course/remove/${courseId}`, { withCredentials: true });
      const safeData = Array.isArray(courseData) ? courseData : [];
      dispatch(setCourseData(safeData.filter(c => c._id !== courseId)));
      toast.success("Course Removed");
      navigate("/courses");
    } catch (error) { toast.error(error.response?.data?.message || "Error"); }
    finally { setLoading1(false); }
  };

  
  const inputClass = "w-full p-4 rounded-xl border-2 border-gray-300 text-lg outline-none focus:border-[#6C5CE7] transition-all";

  return (
    <div className='min-h-screen p-6' style={{ background: 'linear-gradient(135deg, #F3E8FF 0%, #E8F5E9 100%)' }}>
      <div className='max-w-5xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-4'>
            <button onClick={() => navigate("/courses")} className='w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50'>
              <FaArrowLeftLong className='text-[#6C5CE7]' />
            </button>
            <div>
              <h2 className='text-3xl font-extrabold text-[#1E293B]'>Edit Course</h2>
              <p className='text-lg text-[#64748B]'>Update course details and settings</p>
            </div>
          </div>
          <button onClick={() => navigate(`/createlecture/${courseId}`)} className='px-6 py-3 rounded-2xl text-white font-bold text-lg' style={{ background: '#6C5CE7' }}>
            Go to Lectures →
          </button>
        </div>

        <div className='bg-white rounded-3xl p-10 shadow-xl'>
          <div className='flex gap-4 mb-8'>
            <button onClick={() => setIsPublished(!isPublished)} className={`px-6 py-3 rounded-xl font-bold ${isPublished ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {isPublished ? '● Unpublish Course' : '● Publish Course'}
            </button>
            <button onClick={handleRemoveCourse} className='px-6 py-3 rounded-xl bg-red-50 text-red-600 font-bold'>
              {loading1 ? <ClipLoader size={20} color='#DC2626' /> : '🗑 Remove Course'}
            </button>
          </div>

          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='col-span-2'><label className='block font-bold text-gray-700 mb-2'>Course Title</label><input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div className='col-span-2'><label className='block font-bold text-gray-700 mb-2'>Course Subtitle</label><input className={inputClass} value={subTitle} onChange={(e) => setSubTitle(e.target.value)} /></div>
            </div>
            <div><label className='block font-bold text-gray-700 mb-2'>Description</label><textarea className={`${inputClass} h-32`} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div><label className='block font-bold text-gray-700 mb-2'>Category</label><select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>{['App Development', 'Web Development', 'AI/ML', 'Others'].map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className='block font-bold text-gray-700 mb-2'>Level</label><select className={inputClass} value={level} onChange={(e) => setLevel(e.target.value)}>{['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l} value={l}>{l}</option>)}</select></div>
              <div><label className='block font-bold text-gray-700 mb-2'>Price (INR)</label><input type="number" className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            </div>
            <div>
              <label className='block font-bold text-gray-700 mb-2'>Thumbnail</label>
              <div onClick={() => thumb.current.click()} className='w-72 h-44 rounded-2xl border-4 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden relative'>
                <img src={frontendImage} className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black/20 flex items-center justify-center text-white font-bold'><FaEdit /> Change</div>
              </div>
              <input type="file" hidden ref={thumb} onChange={handleThumbnail} />
            </div>
            <button type="button" onClick={handleEditCourse} className='w-full py-4 rounded-2xl text-xl font-black text-white' style={{ background: '#6C5CE7' }}>
              {loading ? <ClipLoader color='white' /> : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
