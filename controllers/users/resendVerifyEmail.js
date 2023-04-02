const { sendEmail, HttpError } = require("../../helpers");
const { User } = require("../../models");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(404, "No found");
  }
  if (user.verify) {
    throw new HttpError(400, "User already verify");
  }
  const mail = {
    to: email,
    from: "korchevskyi@meta.ua",
    subject: "Send confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Сonfirm email</a>`,
  };
  await sendEmail(mail);
  res.json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
