const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'image') {
            if (!file.mimetype.startsWith('image/')) {
                return cb(new Error('Only image files are allowed for the image field'), false);
            }
        } else if (file.fieldname === 'video') {
            if (!file.mimetype.startsWith('video/')) {
                return cb(new Error('Only video files are allowed for the video field'), false);
            }
        }
        cb(null, true);
    }
}).fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'video', maxCount: 1 }
]);

module.exports = upload;
