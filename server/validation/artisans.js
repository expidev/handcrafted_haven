const { body } = require("express-validator");

const updateArtisanValidation = [
	body("name")
		.trim()
		.notEmpty().withMessage("Name is required")
		.isLength({ max: 100 }).withMessage("Name must be at most 100 characters"),
	body("bio")
		.optional()
		.trim()
		.isLength({ max: 500 }).withMessage("Bio must be at most 500 characters"),
	body("speciality")
		.optional()
		.trim()
		.isLength({ max: 100 }).withMessage("Speciality must be at most 100 characters"),
	body("profile")
		.optional()
		.custom((value, { req }) => {
			if (req.file && !req.file.mimetype.startsWith("image/")) {
				throw new Error("Profile image must be an image file");
			}
			return true;
		}),
];

module.exports = { updateArtisanValidation };