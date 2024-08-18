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
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`,
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
