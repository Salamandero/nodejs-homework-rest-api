const express = require("express");

const { auth, upload, validation } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { joiVerifyEmailSchema } = require("../../utils/validation");
const {
  users: { updateAvatar, getCurrent, verifyEmail, resendVerifyEmail },
} = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));
router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  ctrlWrapper(resendVerifyEmail)
);

module.exports = router;
