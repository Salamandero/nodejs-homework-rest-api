const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  getContactById(id);
  if (!result) {
    throw new HttpError(404, `Contacts with id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getContactById;
