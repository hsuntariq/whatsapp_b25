import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt'

import nodemailer from 'nodemailer'

const generateOTP = () => {
  let random = Math.random() * 10000;

  if ( random < 10 ) {
    random *= 1000; // 0–9 becomes 0–9000
  } else if ( random < 100 ) {
    random *= 100; // 10–99 becomes 1000–9900
  } else if ( random < 1000 ) {
    random *= 10; // 100–999 becomes 1000–9990
  }

  let floor = Math.floor( random );
  return floor;
}



const otpMail = ( email, myOTP ) => {
  // configurations for mailing

  const transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
      user: 'hsuntariq@gmail.com',
      pass: 'jmgcnefbqivjcfyd',
    }
  } )



  // make mail option

  const mailOptions = {
    from: 'hsuntariq@gmail.com',
    to: email,
    subject: 'OTP Verification',
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code</title>
  <style type="text/css">
    /* Reset styles */
    body { margin:0; padding:0; -webkit-font-smoothing: antialiased; }
    table, td { border-collapse: collapse; }
    a { color: #6366f1; text-decoration: none; }

    /* Dark mode support (optional but nice) */
    @media (prefers-color-scheme: dark) {
      .dark-bg { background-color: #111827 !important; }
      .dark-text { color: #f3f4f6 !important; }
      .dark-muted { color: #9ca3af !important; }
      .dark-card { background-color: #1f2937 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <!-- Main container -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 10px;">

        <!-- Content wrapper (max 600px) -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border-radius: 16px; overflow:hidden; box-shadow: 0 10px 30px rgba(99,102,241,0.2);">
          
          <!-- Gradient header -->
          <tr>
            <td align="center" style="padding: 48px 30px 32px;">
              <h1 style="margin:0; font-size:28px; color:white; font-weight:700; letter-spacing:-0.5px;">
                Verify Your Account
              </h1>
              <p style="margin:16px 0 0; font-size:16px; color:rgba(255,255,255,0.9);">
                Enter this code to continue
              </p>
            </td>
          </tr>

          <!-- White card with content -->
          <tr>
            <td style="background-color:#ffffff; border-radius:0 0 16px 16px; padding:0 30px 40px;">
              
              <!-- Animated GIF area (subtle pulse or secure lock animation) -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 32px 0 24px;">
                    <!-- 
                      Replace with your own animated GIF URL 
                      Suggestion: subtle pulsing shield / lock / sparkle animation (3-4 sec loop)
                      Free sources: loading.io, icons8.com, or Lottie → GIF export
                    -->
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/3840px-WhatsApp.svg.png" 
                         width="120" alt="Secure Verification" 
                         style="display:block; max-width:120px; height:auto;" 
                         border="0">
                  </td>
                </tr>
              </table>

              <!-- Greeting -->
              <p style="font-size:16px; color:#1f2937; line-height:1.5; margin:0 0 24px;">
                Hello,
              </p>
              <p style="font-size:16px; color:#1f2937; line-height:1.5; margin:0 0 32px;">
                Use the verification code below to complete your sign-in / sign-up / password reset. 
                This code will expire in 10 minutes.
              </p>

              <!-- OTP Code - big, bold, copy-friendly -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:20px 0; background:#f8fafc; border-radius:12px; border:2px dashed #6366f1;">
                    <div style="font-size:40px; font-weight:800; letter-spacing:12px; color:#4f46e5; font-family: monospace;">
                      <!-- Replace with real OTP -->
                      ${myOTP}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security note -->
              <p style="font-size:14px; color:#6b7280; text-align:center; margin:24px 0 32px; line-height:1.5;">
                <strong>Never share this code with anyone.</strong><br>
                Our team will never ask for it.
              </p>

              <!-- CTA fallback (if someone can't copy) -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td style="border-radius:12px; background: linear-gradient(90deg, #6366f1, #8b5cf6);">
                    <a href="#" target="_blank" 
                       style="display:inline-block; padding:16px 48px; font-size:16px; color:white; font-weight:600; text-decoration:none;">
                      Open in Browser
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <p style="font-size:13px; color:#9ca3af; text-align:center; margin:40px 0 0; line-height:1.6;">
                If you didn't request this code, you can safely ignore this email.<br>
                © 2026 Your Company Name • All rights reserved.
              </p>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
    `
  }



  // send mail

  transporter.sendMail( mailOptions, ( err, info ) => {
    try {
      console.log( 'mail sent' )
    } catch ( error ) {
      console.log( error )
    }
  } )



}





export const registerUser = async ( req, res ) => {
  const { name, email, number, password } = req.body;
  if ( !name || !email || !number || !password ) {
    res.status( 400 );
    throw new Error( "Please enter all the fields" );
  }

  let myOTP = generateOTP()


  // hash the password

  const hashPassword = await bcrypt.hash( password, 10 )


  otpMail( email, myOTP )


  const newUser = await User.create( {
    name, email, password: hashPassword, number, otp: myOTP
  } )




  res.send( newUser )
};


// verify otp

export const verifyOTP = async ( req, res ) => {

  const { otp, email } = req.body


  // check if the otp and email are present

  if ( !otp || !email ) {
    res.status( 400 )
    throw new Error( 'Please enter the OTP' )
  }

  // banda dhond k lao

  const findUser = await User.findOne( { email } )

  // kia banda exist karta ha ya nahi

  if ( !findUser ) {
    res.status( 404 )
    throw new Error( 'Invalid Email' )
  }


  // kia otp match karta ha ya nahi,us banday k sath jis ko dhonda ha
  if ( findUser.otp == otp ) {
    findUser.emailVerfied = true
    findUser.otp = null
    // save the new entries
    await findUser.save()
  }
  // kia otp mismatch karta ha
  else {
    res.status( 401 )
    throw new Error( 'Invalid OTP' )
  }

  // send updated user
  res.send( findUser )


}
