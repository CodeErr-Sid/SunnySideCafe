const nodemailer = require('nodemailer');

export default async (req, res) => {
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

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'siddiquetestemail@gmail.com',
          pass: 'kdox juvy mjln unxt',
        },
      });

      const mailOptions = {
        from: 'siddiquetestemail@gmail.com',
        to: 'siddiquetestemail@gmail.com',
        subject: 'SunnySideCafe | Contact Form Submission',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                margin: 0;
                padding: 0;
              }
              .email-container {
                width: 100%;
                height: 100vh;
                background: url('https://sunnysidecafe.vercel.app/imgs/logo/logo.png') no-repeat center center;
                background-size: cover;
                text-align: center;
                padding: 20px;
              }
              .logo {
                margin: 20px auto;
              }
              .content {
                background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
                border-radius: 8px;
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                text-align: left;
              }
              h1 {
                color: #333;
              }
              p {
                color: #555;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <img src="https://sunnysidecafe.vercel.app/imgs/logo/logo.png" alt="Logo" class="logo">
              <div class="content">
                <h1>Contact Form Submission</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${text}</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

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
