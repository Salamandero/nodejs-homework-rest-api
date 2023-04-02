const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, `Email already exist (${email})`);
  }
  const avatarURL = gravatar.url(email, { protocol: "https", s: "250" });

  const verificationToken = uuidv4();
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    from: "korchevskyi@meta.ua",
    subject: "Send confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Сonfirm email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    user: {
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
          verificationToken,
        },
      },
    },
  });
};

module.exports = register;
