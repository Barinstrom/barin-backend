const schoolModel = require("../../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getAllSchoolID = async (req, res) => {
   try {
      const allSchoolID = await schoolModel
         .find()
         .select({ _id: 0, schoolID: 1, urlLogo: 1 });
      res.send(allSchoolID);
   } catch (err) {
      res.status(400).send({
         success: false,
         message: err,
      });
   }
};

module.exports = getAllSchoolID;
