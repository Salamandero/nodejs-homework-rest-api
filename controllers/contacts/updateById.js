const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, `Contacts with id=${id} not found`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateById;
