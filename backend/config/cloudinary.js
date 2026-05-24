
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'

ffmpeg.setFfmpegPath(ffmpegStatic)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const MAX_UPLOAD_MB = 9    // Cloudinary free limit is 10MB — keep 1MB buffer
const MAX_INPUT_MB  = 300  // Reject originals over 300MB before even trying

const getSizeMB = (filePath) => {
  try { return fs.statSync(filePath).size / 1024 / 1024 } catch { return 0 }
}

const compressVideo = (inputPath, scale = '480') => {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(/(\.[^.]+)$/, `_compressed_${scale}p.mp4`)
    ffmpeg(inputPath)
      .outputOptions([
        '-vcodec libx264',
        '-crf 32',
        '-preset fast',
        `-vf scale=-2:${scale}`,
        '-acodec aac',
        '-b:a 96k',
        '-movflags +faststart'
      ])
      .output(outputPath)
      .on('end', () => {
        fs.unlink(inputPath, () => {})
        resolve(outputPath)
      })
      .on('error', (err) => reject(err))
      .run()
  })
}

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null

    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv']
    const ext = '.' + filePath.split('.').pop().toLowerCase()
    const isVideo = videoExtensions.includes(ext)

    let resource_type = 'image'
    if (filePath.endsWith('.pdf')) resource_type = 'raw'
    else if (isVideo) resource_type = 'video'

    let uploadPath = filePath

    if (isVideo) {
      const originalMB = getSizeMB(filePath)
      console.log(`Original video size: ${originalMB.toFixed(2)} MB`)

      // Reject files over 300MB upfront
      if (originalMB > MAX_INPUT_MB) {
        fs.unlink(filePath, () => {})
        const err = new Error(`FILE_TOO_LARGE:${originalMB.toFixed(0)}`)
        throw err
      }

      try {
        // First pass — compress to 480p
        console.log('Compressing to 480p...')
        uploadPath = await compressVideo(filePath, '480')
        let compressedMB = getSizeMB(uploadPath)
        console.log(`480p size: ${compressedMB.toFixed(2)} MB`)

        // Still too large — try 360p
        if (compressedMB > MAX_UPLOAD_MB) {
          console.log('Still too large, compressing to 360p...')
          uploadPath = await compressVideo(uploadPath, '360')
          compressedMB = getSizeMB(uploadPath)
          console.log(`360p size: ${compressedMB.toFixed(2)} MB`)
        }

        // Still too large after two passes
        if (compressedMB > MAX_UPLOAD_MB) {
          fs.unlink(uploadPath, () => {})
          const err = new Error(`FILE_TOO_LARGE_AFTER_COMPRESSION:${compressedMB.toFixed(1)}`)
          throw err
        }

      } catch (compressionError) {
        if (compressionError.message.startsWith('FILE_TOO_LARGE')) throw compressionError
        console.log('Compression failed:', compressionError.message)
        uploadPath = filePath
      }
    }

    const uploadResult = await cloudinary.uploader.upload(uploadPath, {
      resource_type,
      timeout: 120000,
    })

    if (uploadPath !== filePath) fs.unlink(uploadPath, () => {})

    return uploadResult.secure_url

  } catch (error) {
    try { fs.unlinkSync(filePath) } catch (_) {}
    console.log('Cloudinary upload error:', error)
    // Re-throw so controller can send proper error to frontend
    throw error
  }
}

export default uploadOnCloudinary