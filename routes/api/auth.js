const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  auth: { register, login, logout },
} = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../utils/validation");

const router = express.Router();

router.post("/register", validation(joiRegisterSchema), ctrlWrapper(register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(login));
router.get("/logout", auth, ctrlWrapper(logout));

module.exports = router;
