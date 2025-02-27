const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new HttpError(
      404,
      `Missing field favorite. Contacts with id=${id} not found`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateStatusContact;
