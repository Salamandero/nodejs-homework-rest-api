const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use (${email})`);
  }
  const avatarURL = gravatar.url(email, { protocol: "https", s: "250" });

  const newUser = new User({ email, subscription, avatarURL });

  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      status: "success",
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
        },
      },
    },
  });
};

module.exports = register;
