const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = Contact.findByIdAndRemove(id);
  if (!result) {
    throw new HttpError(404, `Contacts with id=${id} not found`);
  }

  res.sendStatus(204);
};

module.exports = removeById;
