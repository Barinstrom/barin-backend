const schoolModel = require("../../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getPendingSchool = (req, res) => {

   let tmp = ""
   if (req.query.query)
      tmp = new RegExp("^" + req.query.query );
   const query = {
      schoolID: {$regex: tmp ,$options:'i'},
      status: "pending"
   }
   const page = req.query.page || 1;
   const limit = 3;

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
