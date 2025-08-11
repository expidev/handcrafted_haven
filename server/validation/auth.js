const { body, validationResult } = require("express-validator");

const registerValidation = [
	body("name").isString()
				.isLength({ min: 3, max: 255 })
				.withMessage("Name must be between 3 and 255 characters."),
	body("email").isEmail()
				 .withMessage("Invalid email address."),
	body("password").isLength({ min: 5 })
					.withMessage("Password must be at least 5 characters long."),
	body("isSeller").isBoolean()
					.withMessage("Invalid User Option.")];

const loginValidation = [
	body("email").isEmail()
				 .withMessage("Invalid email address."),
	body("password").isLength({ min: 5 })
					.withMessage("Password must be at least 5 characters long.")];

module.exports = { registerValidation, loginValidation };