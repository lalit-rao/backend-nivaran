const nodemailer = require('nodemailer');

exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i <= 3; i++) {
        const randVal = Math.round(Math.random() * 9)
        otp += randVal
    }
    return otp;
}

exports.mailTransport = () => nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
    }
});

exports.generateEmailTemplate = code => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 20px;
            padding: 20px;
            text-align: center;
        }
        .email-header {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }
        .email-content {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #007BFF;
            margin: 20px 0;
        }
        .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style><title>Email</title>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Your OTP Code
        </div>
        <div class="email-content">
            <p>Hi</p>
            <p>We have received a request to verify your account. Please use the following OTP code to complete the verification process:</p>
            <div class="otp-code">
                ${code}
            </div>
            <p>If you did not request this, please ignore this email or contact our support team.</p>
            <a href="#" class="button">Verify Now</a>
        </div>
        <div class="footer">
            <p>Thank you for using our service.</p>
        </div>
    </div>
</body>
</html>
`
}

exports.plainEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 20px;
            padding: 20px;
            text-align: center;
        }
        .email-header {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }
        .email-content {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .welcome-message {
            font-size: 18px;
            color: #007BFF;
            margin: 20px 0;
        }
        .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Welcome to [Your Company]!
        </div>
        <div class="email-content">
            <p>Hi</p>
            <p>Congratulations! Your account has been successfully verified.</p>
            <p class="welcome-message">We're excited to have you on board.</p>
            <p>Here are some resources to get you started:</p>
            <ul>
                <li><a href="#">Getting Started Guide</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Support</a></li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <a href="#" class="button">Go to Your Dashboard</a>
        </div>
        <div class="footer">
            <p>Thank you for choosing [Your Company].</p>
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact support</a>.</p>
        </div>
    </div>
</body>
</html>
`
}


exports.generatePasswordResetTemplate = url => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 20px;
            padding: 20px;
            text-align: center;
        }
        .email-header {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }
        .email-content {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .reset-instructions {
            font-size: 16px;
            color: #555555;
            margin: 20px 0;
        }
        .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Password Reset Request
        </div>
        <div class="email-content">
            <p>Hi [User's Name],</p>
            <p>We received a request to reset your password for your account. If you did not make this request, you can ignore this email.</p>
            <p class="reset-instructions">To reset your password, click the button below:</p>
            <a href="${url}" class="button">Reset Password</a>
            <p class="reset-instructions">If the button above does not work, copy and paste the following link into your browser:</p>
            <p><a href="${url}">[Reset Link]</a></p>
            <p>This link will expire in 24 hours for your security.</p>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact support</a>.</p>
            <p>Thank you for using [Your Company].</p>
        </div>
    </div>
</body>
</html>
`
}


exports.plainEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 20px;
            padding: 20px;
            text-align: center;
        }
        .email-header {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }
        .email-content {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }
        .welcome-message {
            font-size: 18px;
            color: #007BFF;
            margin: 20px 0;
        }
        .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
        }
        .footer a {
            color: #007BFF;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Welcome to [Your Company]!
        </div>
        <div class="email-content">
            <p>Hi</p>
            <p>${heading}</p>
            <p class="welcome-message">${message}</p>
            <p>Here are some resources to get you started:</p>
            <ul>
                <li><a href="#">Getting Started Guide</a></li>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Support</a></li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <a href="#" class="button">Go to Your Dashboard</a>
        </div>
        <div class="footer">
            <p>Thank you for choosing [Your Company].</p>
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact support</a>.</p>
        </div>
    </div>
</body>
</html>
`
}
