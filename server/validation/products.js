const { body } = require("express-validator");

const addProductValidation = [
	body("title")
		.trim()
		.notEmpty().withMessage("Product name is required")
		.isLength({ max: 100 }).withMessage("Product name must be at most 100 characters"),
	body("description")
		.trim()
		.optional()
		.isLength({ max: 1000 }).withMessage("Description must be at most 1000 characters"),
	body("price")
		.notEmpty().withMessage("Price is required")
		.isFloat({ gt: 0 }).withMessage("Price must be a positive number"),
	body("category")
		.trim()
		.optional()
		.isLength({ max: 50 }).withMessage("Category must be at most 50 characters"),
	body("images")
		.optional()
		.custom((value, { req }) => {
			if (req.files && Array.isArray(req.files)) {
				for (const file of req.files) {
					if (!file.mimetype.startsWith("image/")) {
						throw new Error("All product images must be image files");
					}
				}
			}
			return true;
		}),
];

module.exports = { addProductValidation };