const { validationResult } = require('express-validator');

const validateReq = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const message = errors.array()[0].msg;
		return res.status(400).json({ message: message });
	}
	next();
};

module.exports = validateReq;