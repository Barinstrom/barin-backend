const teacherModel = require("../../models/teacher");
const userModel = require("../../models/user");


const getClubTeachers = async (req, res) => {
    const docs = await userModel
      .aggregate([
         {
            $match:
               // {role:"teacher"}
               {
                  $and: [
                     { role: "teacher" },
                     { schoolID: req.userInfo.schoolID },
                  ],
               },
         },
         {
            $lookup: {
               from: "teachers", // ตารางที่อยาก join
               localField: "_id", // user
               foreignField: "userID", // teacher
               as: "teacher", // ชื่อผลลัพท์
            }, // [{... userData, teacher:{userID:[objectID]}},...]
         },
         { $unwind: "$teacher" },
         {
            $project: {
               email: 1,
               schoolID: 1,
               teacher: 1,
            },
         },
      ])
      .exec();

    const teachers = [];
    for(let i=0;i<docs.length;i++){
        for(const Club of docs[i].teacher.clubs){
            if(Club.toString()==req.query.clubID){
                teachers.push(docs[i].teacher)
            }
        }
    }
   res.send(teachers);
};

module.exports = getClubTeachers;
