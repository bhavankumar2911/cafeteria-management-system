const CustomOrder = require("../../models/customOrder");
const User = require("../../models/user");
const nodeMailer = require("nodemailer");
const { google } = require("googleapis");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    // get user email
    const order = await CustomOrder.findOne({ where: { id }, include: User });

    const { email } = order.User;

    // delete order
    try {
      await CustomOrder.destroy({ where: { id } });

      // sending mail
      const {
        GOOGLE_OAUTH_CLIENT_ID,
        GOOGLE_OAUTH_CLIENT_SECRET,
        GOOGLE_OAUTH_REFRESH_TOKEN,
      } = process.env;

      // creating the oauth2 client
      const OAuth2Client = new google.auth.OAuth2(
        GOOGLE_OAUTH_CLIENT_ID,
        GOOGLE_OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );
      OAuth2Client.setCredentials({
        refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN,
      });

      try {
        // creating the access token
        const accessToken = await OAuth2Client.getAccessToken();

        // transport options
        const transportOptions = {
          service: "gmail",
          //   host: "smtp.google.com",
          auth: {
            type: "oauth2",
            user: "bhavankumarcse2020@gmail.com",
            clientId: GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
            refreshToken: GOOGLE_OAUTH_REFRESH_TOKEN,
            accessToken,
          },
        };

        // creating nodemailer transport
        const transport = nodeMailer.createTransport(transportOptions);

        // mail options
        const mailOptions = {
          from: "Bhavan <bhavankumarcse2020@gmail.com>",
          to: email,
          subject: "VEC Canteen(custom order)",
          text: `Your order has been rejected.`,
          html: `
                    <p>Your order has been rejected.</p>
                `,
        };

        // sending the mail
        const info = await transport.sendMail(mailOptions);

        if (!info)
          return res.status(500).json({
            success: false,
            message: `Cannot send email to user.`,
          });

        return res.status(200).json({
          success: true,
          message: `Deleted order`,
        });
      } catch (error) {
        console.log("Cannot send mail", error);
        return res.status(500).json({
          success: false,
          message: `Cannot send email to user.`,
        });
      }
    } catch (error) {
      console.log("Cannot delete order", error);
      return res.status(500).json({
        success: false,
        message: `Cannot delete order. Internal server error`,
      });
    }
  } catch (error) {
    console.log("Cannot find user's email", error);
    return res.status(500).json({
      success: false,
      message: `Cannot find user's email for notifying. Internal server error`,
    });
  }
};
