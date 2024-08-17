const nodemailer = require('nodemailer');
const path = require('path');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, email, text } = req.body;

      // Configure the transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'siddiquetestemail@gmail.com',
          pass: 'kdox juvy mjln unxt', // Use your correct App Password here
        },
      });

      // Verify the transporter configuration
      transporter.verify((error, success) => {
        if (error) {
          console.error('Error with transporter configuration:', error);
        } else {
          console.log('Transporter is ready to send emails:', success);
        }
      });

      // Define the email options
      const mailOptions = {
        from: 'siddiquetestemail@gmail.com',
        to: 'siddiqueofl@gmail.com',
        subject: 'SunnySideCafe | Contact Form Submission',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden;">
              <!-- Header with logo and background -->
              <div style="background-image: url('https://sunnysidecafe.vercel.app/imgs/logo/logo.png'); background-size: cover; padding: 20px; text-align: center; color: white;">
                <img src="https://sunnysidecafe.vercel.app/imgs/logo/logo.png" alt="SunnySideCafe" style="max-width: 150px; margin-bottom: 20px;">
                <h1 style="margin: 0;">New Contact Form Submission</h1>
              </div>

              <!-- Body Content -->
              <div style="padding: 20px; color: #333;">
                <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
                <p style="font-size: 16px;"><strong>Message:</strong></p>
                <p style="font-size: 16px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">${text}</p>
              </div>

              <!-- Footer -->
              <div style="background-color: #333; color: white; text-align: center; padding: 10px;">
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} SunnySideCafe. All rights reserved.</p>
              </div>
            </div>
          </div>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
