import multer from 'multer'
import path from 'path'

//configuration du stockage de fichier + nom unique
const storage = multer.diskStorage(
   {
        destination: (req, file, cb) => {
            cb(null,'src/uploads/')
        },
        filename: (req ,file ,cb) => {
            const uniqueName = Date.now() + path.extname(file.originalname)
            cb(null,uniqueName)
        }
    }
)

// upload file dans storage et crée req.file {type,nom,path}
const upload = multer({ storage })

export default upload