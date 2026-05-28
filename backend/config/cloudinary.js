import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null

    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv']
    const ext = '.' + filePath.split('.').pop().toLowerCase()
    const isVideo = videoExtensions.includes(ext)

    let resource_type = 'image'
    if (filePath.endsWith('.pdf')) resource_type = 'raw'
    else if (isVideo) resource_type = 'video'

    let uploadOptions = {
      resource_type,
      timeout: 300000,
    }

    // For videos — let Cloudinary compress on their servers
    if (isVideo) {
      uploadOptions = {
        ...uploadOptions,
        chunk_size: 6000000,         // upload in 6MB chunks to avoid timeout
        eager: [
          {
            format: 'mp4',
            transformation: [
              { quality: 'auto:low' },
              { width: 480, crop: 'scale' }
            ]
          }
        ],
        eager_async: true,           // Cloudinary processes in background
        // use the eager url once ready, fallback to original
      }
    }

    const uploadResult = await cloudinary.uploader.upload(filePath, uploadOptions)

    fs.unlink(filePath, () => {})

    // Return eager URL if available (compressed), otherwise original
    const url = uploadResult?.eager?.[0]?.secure_url || uploadResult.secure_url
    return url

  } catch (error) {
    try { fs.unlinkSync(filePath) } catch (_) {}
    console.log('Cloudinary upload error:', error)
    throw error
  }
}

export default uploadOnCloudinary