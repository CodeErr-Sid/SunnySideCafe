const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, email, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'primesite.mailer@gmail.com',
        pass: 'coru rxlx yzaw hhvc',
      },
    });

    const mailOptions = {
      from: 'primesite.mailer@gmail.com',
      to: 'primesiteinnovation@gmail.com',
      subject: 'SunnySideCafe | Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
