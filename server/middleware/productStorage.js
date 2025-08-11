const multer = require('multer');
const path = require('path');

const productStorage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'upload/product/'),
	filename: (req, file, cb) => {
		const uniqueName = req.user.id + '-' + Date.now() + path.extname(file.originalname);
		cb(null, uniqueName);
	},
});


const uploadProduct = multer({ storage: productStorage });
module.exports = uploadProduct;