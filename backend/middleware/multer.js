import multer from "multer"

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload = multer({ storage })

export default upload