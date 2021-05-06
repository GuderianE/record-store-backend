const { body, validationResult } = require('express-validator');

exports.userValidationRules = () => {
    return [
        body("email")
            .trim()
            .isEmail()
            .withMessage("Your email address is not valid")
            .normalizeEmail(),
        body("password")
            .isLength({ min: 5 })
            .withMessage("Password is to short!")
            .custom((value) => {
                const regex = new RegExp(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
                );
                //const res = value.match(regex);
                const res = regex.test(value);
                return res;
            })
            .withMessage("Your password must contain upper, lower and special characters and numbers!"),
        body("firstName").trim(),
        body("lastName").trim(),
        body("userName").trim(),
    ];
};

exports.userValidationErrorHandling = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    res.status(422).json({ errors: errors.array() });
};


