const clubModel = require("../../models/club");
const SchoolModel = require("../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getSchoolClubsName = async (req, res) => {
   const tmpClub = await clubModel.find({schoolID:req.userInfo.schoolID}).select({clubName:1, _id:0});
   result = []
   for(let i=0; i<tmpClub.length; i++){
      result.push(tmpClub[i].clubName);
   }
   res.send(result);
};

module.exports = getSchoolClubsName;
