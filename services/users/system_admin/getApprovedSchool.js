const schoolModel = require("../../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getApprovedSchool = (req, res) => {
   const query = { ...req.body.query, status: "approve" };
   const page = req.body.page || 1;
   const limit = 2;
   //{ color: "blue", published: true }, { page: 1, limit: 10, projection: { color: 1 } }
   schoolModel
      .paginate(query, { page, limit })
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         res.status(400).send("paginate error");
      });
};

module.exports = getApprovedSchool;
