/*
const { check, validationResult } = require("express-validator");

exports.validateUser = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is missing!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be 3 to 20 characters long!'),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is missing!')
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be 8 to 20 characters long!'),
    check('phone')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Phone number is missing!')
        .isMobilePhone('en-IN') // Allow only Indian mobile phone format
        .withMessage('Invalid phone number!'),
    check('address')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Address is missing!'),
    check('city')
        .trim()
        .not()
        .isEmpty()
        .withMessage('City is missing!'),
    check('state')
        .trim()
        .not()
        .isEmpty()
        .withMessage('State is missing!'),
    check('age')
        .isInt({ min: 1 })
        .withMessage('Age must be a positive number!'),
    check('gender')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Gender is missing!')
        .isIn(['Male', 'Female', 'Other'])
        .withMessage('Gender must be either Male, Female, or Other!'),
    check('emergencyContacts')
        .isArray({ min: 1, max: 4 })
        .withMessage('You must provide between 1 and 4 emergency contacts!'),
    check('emergencyContacts.*.name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Emergency contact name is missing!'),
    check('emergencyContacts.*.phone')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Emergency contact phone number is missing!')
        .isMobilePhone('en-IN') // Allow only Indian mobile phone format
        .withMessage('Invalid emergency contact phone number!'),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (!error.length) {
        return next();
    }
    res.status(400).json({ success: false, error: error[0].msg });
}
*/










const { check, validationResult } = require("express-validator");

exports.validateUser = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is missing!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be 3 to 20 characters long!'),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is missing!')
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be 8 to 20 characters long!'),
    check('phone')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Phone number is missing!')
        .isMobilePhone('en-IN') // Allow only Indian mobile phone format
        .withMessage('Invalid phone number!'),
    check('address')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Address is missing!'),
    check('emergencyContacts')
        .isArray({ min: 1, max: 4 })
        .withMessage('You must provide between 1 and 4 emergency contacts!'),
    check('emergencyContacts.*.name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Emergency contact name is missing!'),
    check('emergencyContacts.*.phone')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Emergency contact phone number is missing!')
        .isMobilePhone('en-IN') // Allow only Indian mobile phone format
        .withMessage('Invalid emergency contact phone number!'),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (!error.length) {
        return next();
    }
    res.status(400).json({ success: false, error: error[0].msg });
}
