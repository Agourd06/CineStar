const nodemailer = require('nodemailer');

const sendReservationEmail = async (userEmail, reservationDetails) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'oualidagourd@gmail.com',
                pass: 'klnx ltdp fswn cffi'
            }
        });

        const mailOptions = {
            from: 'oualidagourd@gmail.com',
            to: userEmail,
            subject: 'Reservation Confirmation',
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h2 style="color: #333;">Your Reservation is Confirmed</h2>
                <p>Dear Customer,</p>
                <p>We are pleased to inform you that your reservation has been successfully created.</p>

                <h3>Reservation Details</h3>
                <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
                    <tr>
                        <th>Session ID</th>
                        <td>${reservationDetails.session}</td>
                    </tr>
                    <tr>
                        <th>Seats</th>
                        <td>${reservationDetails.seat.join(' / ')}</td>
                    </tr>
                    <tr>
                        <th>Total Price</th>
                        <td>${reservationDetails.totalPrice} DH</td>
                    </tr>
                </table>

                <p style="margin-top: 20px;">Thank you for choosing our service!</p>

                <footer style="margin-top: 20px; font-size: 12px; color: #999;">
                    <p>If you have any questions, feel free to contact us at CineStar@movies.com.</p>
                    <p>&copy; ${new Date().getFullYear()} CineStar. All rights reserved.</p>
                </footer>
            </div>
        `
            };

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = {
    sendReservationEmail
};
