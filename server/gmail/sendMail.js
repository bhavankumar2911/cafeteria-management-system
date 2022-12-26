const nodeMailer = require("nodemailer");
const { google } = require("googleapis");

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
OAuth2Client.setCredentials({ refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN });

// sending the mail
module.exports = async (resetID, email) => {
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
      subject: "Password reset mail",
      text: `Use this link to reset your password ${process.env.CLIENT_HOST}/user/reset-password?id=${resetID}`,
      html: `
              <a href=${process.env.CLIENT_HOST}/user/reset-password?id=${resetID}>Click this link to reset your password</a>
          `,
    };

    // sending the mail
    const info = await transport.sendMail(mailOptions);

    if (!info) return { success: false };

    return { success: true };
  } catch (error) {
    console.log("Cannot send mail", error);
    return { success: false };
  }
};
