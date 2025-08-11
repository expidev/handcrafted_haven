const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'upload/profile/'),
	filename: (req, file, cb) => {
		const uniqueName = req.user.id + '-' + Date.now() + path.extname(file.originalname);
		cb(null, uniqueName);
	},
});


const upload = multer({ storage });
module.exports = upload;