const userModel = require('../../models/user');
const studentModel = require('../../models/student');

const getSchoolStudent = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 3;
    let tmp = ""
    if (req.query.query)
       tmp = new RegExp("^" + req.query.query );
       
    let count = await userModel
       .aggregate([
          {
             $match:
                // {role:"teacher"}
                {
                   $and: [
                      { role: "student" },
                      { schoolID: req.userInfo.schoolID },
                   ],
                },
          },
          {
             $lookup: {
                from: "students", // ตารางที่อยาก join
                localField: "_id", // user
                foreignField: "userID", // teacher
                as: "student", // ชื่อผลลัพท์
             }, // [{... userData, teacher:{userID:[objectID]}},...]
          },
          { $unwind: "$student" },
          {
             $project: {
                email: 1,
                schoolID: 1,
                teacher: 1,
             },
          },
       ])
       .exec();
}