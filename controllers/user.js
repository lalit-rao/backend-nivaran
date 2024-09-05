/*
const User = require("../model/user");
const VerificationToken = require("../model/verificationToken");
const ResetToken = require("../model/resetToken");
const { sendError, createRandomBytes } = require("../utils/helper");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { generateOTP, mailTransport, generateEmailTemplate, plainEmailTemplate, generatePasswordResetTemplate } = require("../utils/mail");
const { isValidObjectId } = require("mongoose");

exports.createUser = async (req, res) => {
    const { name, email, password, phone, address, emergencyContacts } = req.body;
    const user = await User.findOne({ email })
    if (user)
        return sendError(res, 'This email is already registered!')

    const newUser = new User({
        name,
        email,
        password,
        phone,
        address,
        emergencyContacts
    });

    const OTP = generateOTP()
    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP
    })

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
        from: 'emailverification@email.com',
        to: newUser.email,
        subject: 'Verify your email account',
        html: generateEmailTemplate(OTP)
    })

    res.json({ success: true, user: { name: newUser.name, email: newUser.email, phone: newUser.phone, address: newUser.address, id: newUser.id, verified: newUser.verified } });
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email.trim() || !password.trim()) {
            return sendError(res, 'Email/Password missing!')
        }

        const user = await User.findOne({ email });
        if (!user) {
            return sendError(res, 'User not found!')
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return sendError(res, 'Invalid password!')
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            success: true,
            user: { name: user.name, email: user.email, phone: user.phone,  id: user.id, token },
        });
    }
    catch (error) {
        sendError(res, error.message, 500)
    }
}

exports.verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp.trim()) {
        return sendError(res, 'Invalid request, Missing Parameters!')
    }
    if (!isValidObjectId(userId)) {
        return sendError(res, 'Invalid user ID!')
    }

    const user = await User.findById(userId);
    if (!user) {
        return sendError(res, 'User not found!')
    }
    if (user.verified) {
        return sendError(res, 'Email already verified!')
    }
    const token = await VerificationToken.findOne({ owner: userId })
    if (!token) {
        return sendError(res, 'Sorry user not found!')
    }
    const isMatched = await token.compareToken(otp)
    if (!isMatched) {
        return sendError(res, 'Please provide valid OTP')
    }

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    mailTransport().sendMail({
        from: 'emailverification@email.com',
        to: user.email,
        subject: 'Welcome Email',
        html: plainEmailTemplate(
            "Email Verified",
            "Thanks for verifying your email account. You can now login to your account."
        )
    });
    res.json({
        success: true,
        message: 'Email verified successfully!',
        user: { name: user.name, email: user.email, id: user.id }
    })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return sendError(res, 'Email is not registered!')
    }

    const user = await User.findOne({ email });
    if (!user) {
        return sendError(res, 'User not found!')
    }

    const token = await ResetToken.findOne({ owner: user._id })
    if (token) {
        return sendError(res, 'Only after one hour you can request for another reset password link!')
    }

    const RandomBytes = await createRandomBytes();
    const resetToken = new ResetToken({
        owner: user._id,
        token: RandomBytes
    });

    await resetToken.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: 'Password reset',
        html: generatePasswordResetTemplate(
            `http://localhost:5173/reset-password?token=${RandomBytes}&id=${user._id}`,
        )
    });

    res.json({ success: true, message: 'Reset password link sent to your email' })
}

exports.resetPassword = async (req, res) => {
    const { password } = req.body;

    const user = await User.findById(req.user._id)
    if (!user) {
        return sendError(res, 'User not found!')
    }
    const isSamePassword = await user.comparePassword(password)
    if (isSamePassword) {
        return sendError(res, 'New password must be different!')
    }

    if(password.trim().length < 8 || password.trim().length > 20) {
        return sendError(res, 'Password must be between 8 to 20 characters!')
    }
    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id })

    mailTransport().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: 'Password reset successfully',
        html: plainEmailTemplate(
            "Password Reset Successfully",
            "Your password has been reset successfully. You can now login to your account."
        )
    });

    res.json({ success: true, message: 'Password reset successfully' })
}

exports.getUserInfo = async (req, res) => {
    const user = req.user;
    res.json({
        success: true,
        user: {
            Ename: user.name,
            email: user.email,
            mobile: user.phone,
            address: user.address,
            emergencyContacts: user.emergencyContacts,
            avatar: user.avatar,
            verified: user.verified
        }
    });
    console.log(user)
};
*/


const User = require("../model/user");
const VerificationToken = require("../model/verificationToken");
const ResetToken = require("../model/resetToken");
const {sendError, createRandomBytes} = require("../utils/helper");
const Resource = require('../model/resource');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {
    generateOTP,
    mailTransport,
    generateEmailTemplate,
    plainEmailTemplate,
    generatePasswordResetTemplate
} = require("../utils/mail");
const {isValidObjectId} = require("mongoose");

exports.createUser = async (req, res) => {
    const {name, email, password, phone, address, city, state, age, gender, emergencyContacts} = req.body;
    const user = await User.findOne({email});
    if (user)
        return sendError(res, 'This email is already registered!');

    const newUser = new User({
        name,
        email,
        password,
        phone,
        address,
        city,
        state,
        age,
        gender,
        emergencyContacts
    });

    const OTP = generateOTP();
    const verificationToken = new VerificationToken({
        owner: newUser._id,
        token: OTP
    });

    await verificationToken.save();
    await newUser.save();

    mailTransport().sendMail({
        from: 'emailverification@email.com',
        to: newUser.email,
        subject: 'Verify your email account',
        html: generateEmailTemplate(OTP)
    });

    res.json({
        success: true,
        user: {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            emergencyContacts: newUser.emergencyContacts,
            city: newUser.city,
            state: newUser.state,
            age: newUser.age,
            gender: newUser.gender,
            id: newUser._id,
            verified: newUser.verified
        }
    });
};

exports.signin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email.trim() || !password.trim()) {
            return sendError(res, 'Email/Password missing!');
        }

        const user = await User.findOne({email});
        if (!user) {
            return sendError(res, 'User not found!');
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return sendError(res, 'Invalid password!');
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                age: user.age,
                gender: user.gender,
                emergencyContacts: user.emergencyContacts,
                verified: user.verified,
                avatar: user.avatar
            },
        });
    } catch (error) {
        sendError(res, error.message, 500);
    }
}

exports.verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;
    if (!userId || !otp.trim()) {
        return sendError(res, 'Invalid request, Missing Parameters!');
    }
    if (!isValidObjectId(userId)) {
        return sendError(res, 'Invalid user ID!');
    }

    const user = await User.findById(userId);
    if (!user) {
        return sendError(res, 'User not found!');
    }
    if (user.verified) {
        return sendError(res, 'Email already verified!');
    }
    const token = await VerificationToken.findOne({owner: userId});
    if (!token) {
        return sendError(res, 'Sorry user not found!');
    }
    const isMatched = await token.compareToken(otp);
    if (!isMatched) {
        return sendError(res, 'Please provide valid OTP');
    }

    user.verified = true;

    await VerificationToken.findByIdAndDelete(token._id);
    await user.save();

    mailTransport().sendMail({
        from: 'emailverification@email.com',
        to: user.email,
        subject: 'Welcome Email',
        html: plainEmailTemplate(
            "Email Verified",
            "Thanks for verifying your email account. You can now login to your account."
        )
    });
    res.json({
        success: true,
        message: 'Email verified successfully!',
        user: {
            name: user.name,
            email: user.email,
            id: user._id
        }
    });
}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    if (!email) {
        return sendError(res, 'Email is not registered!');
    }

    const user = await User.findOne({email});
    if (!user) {
        return sendError(res, 'User not found!');
    }

    const token = await ResetToken.findOne({owner: user._id});
    if (token) {
        return sendError(res, 'Only after one hour you can request for another reset password link!');
    }

    const RandomBytes = await createRandomBytes();
    const resetToken = new ResetToken({
        owner: user._id,
        token: RandomBytes
    });

    await resetToken.save();

    mailTransport().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: 'Password reset',
        html: generatePasswordResetTemplate(
            `http://localhost:5173/reset-password?token=${RandomBytes}&id=${user._id}`,
        )
    });

    res.json({success: true, message: 'Reset password link sent to your email'});
}

exports.resetPassword = async (req, res) => {
    const {password} = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
        return sendError(res, 'User not found!');
    }
    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword) {
        return sendError(res, 'New password must be different!');
    }

    if (password.trim().length < 8 || password.trim().length > 20) {
        return sendError(res, 'Password must be between 8 to 20 characters!');
    }
    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({owner: user._id});

    mailTransport().sendMail({
        from: 'security@email.com',
        to: user.email,
        subject: 'Password reset successfully',
        html: plainEmailTemplate(
            "Password Reset Successfully",
            "Your password has been reset successfully. You can now login to your account."
        )
    });

    res.json({success: true, message: 'Password reset successfully'});
}

exports.getUserInfo = async (req, res) => {
    const user = req.user;
    res.json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            emergencyContacts: user.emergencyContacts,
            avatar: user.avatar,
            city: user.city,
            state: user.state,
            age: user.age,
            gender: user.gender,
            id: user._id,
            verified: user.verified
        }
    });

    exports.submitResource = async (req, res) => {
        try {
            const {name, category, requirements, priority, area, city, state} = req.body;

            const newResource = new Resource({
                name,
                category,
                requirements,
                priority,
                area,
                city,
                state
            });

            await newResource.save();

            res.json({
                success: true,
                message: 'Resource request submitted successfully!',
                resource: newResource
            });
        } catch (error) {
            res.status(500).json({success: false, message: error.message});
        }
    };
};
