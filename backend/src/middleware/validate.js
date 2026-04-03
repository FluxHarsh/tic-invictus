/**
 * middleware/validate.js — Request Validation
 *
 * Uses express-validator to check req.body / req.params before
 * the controller runs. If validation fails, returns a clean 422
 * error with all field errors listed — no controller code runs.
 *
 * Usage in route files:
 *   const { body } = require('express-validator');
 *   const { validate } = require('../middleware/validate');
 *
 *   router.post('/send-otp',
 *     [body('phone').matches(/^[6-9]\d{9}$/).withMessage('Invalid phone')],
 *     validate,
 *     sendOtp
 *   );
 */

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      // Map errors to { field, message } format — easy for frontend to display
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

module.exports = { validate };