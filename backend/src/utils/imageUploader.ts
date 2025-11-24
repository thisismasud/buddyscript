import multer from "multer";
import path from "path";
import { AppError } from "./asyncHandler";

function uploader(destination:string, allowed_file_types:string[], max_file_size:number, error_msg:string){
    const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${destination}`

    const storage = multer.diskStorage({
        destination:(req, file, cb) =>{
            cb(null, UPLOAD_FOLDER)
        },
        filename: (req, file, cb) =>{
            const fileExt = path.extname(file.originalname)
            const filename = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now()
            cb(null, filename + fileExt)
        }
    })

    //final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size
        },
        fileFilter: (req, file, cb) =>{
            if(allowed_file_types.includes(file.mimetype)){
                cb(null, true)
            }else{
                cb(new AppError(400, error_msg))
            }
        }
    })
    return upload
}
export default uploader