const { createUser, signin, verifyEmail, forgotPassword, resetPassword, getUserInfo } = require("../controllers/user");
const { validateUser, validate } = require("../middlewares/validator");
const { isResetTokenValid } = require("../middlewares/user");
const authenticateToken = require("../middlewares/authenticateToken");
const router = require('express').Router();

router.post('/create', validateUser, validate, createUser);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/verify-token', isResetTokenValid, (req, res) => {
    res.json({ success: true });
});
router.get('/user-info', authenticateToken, getUserInfo);

module.exports = router;
