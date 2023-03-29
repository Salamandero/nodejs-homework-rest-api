const express = require("express");

const { auth, upload, ctrlWrapper } = require("../../middlewares");
const {
  users: { updateAvatar, getCurrent },
} = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
