const express = require("express");

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { joiSchema, updateFavorite } = require("../../utils/validation");
const {
  contacts: {
    getContacts,
    getContactById,
    add,
    removeById,
    updateById,
    updateStatusContact,
  },
} = require("../../controllers");

const router = express.Router();
router.get("/", auth, ctrlWrapper(getContacts));
router.get("/:id", auth, isValidId, ctrlWrapper(getContactById));
router.post("/", auth, validation(joiSchema), ctrlWrapper(add));
router.delete("/:id", auth, isValidId, ctrlWrapper(removeById));
router.put(
  "/:id",
  auth,
  isValidId,
  validation(joiSchema),
  ctrlWrapper(updateById)
);
router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validation(updateFavorite, "missing field favorite"),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
