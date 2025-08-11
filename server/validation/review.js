const { body, validationResult } = require("express-validator");

const reviewValidation = [
	body("rating")
		.isInt({ min: 1, max: 5 })
		.withMessage("Rating must be an integer between 1 and 5."),
	body("comment")
		.isString()
		.isLength({ min: 3, max: 500 })
		.withMessage("Comment must be between 3 and 500 characters.")
];

module.exports = { reviewValidation };