const schoolModel = require("../../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getPendingSchool = (req, res) => {
   const query = { ...req.body.query, status: "pending" };
   const page = req.body.page || 1;
   const limit = 1;
   console.log(req.body);
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

module.exports = getPendingSchool;
