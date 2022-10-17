const userModel = require('../../models/user');
const studentModel = require('../../models/student');

const getSchoolStudent = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 5;
    let tmp = ""
    if (req.query.query)
       tmp = new RegExp("^" + req.query.query );

    let temp = await userModel
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
                foreignField: "userID", // student
                as: "student", // ชื่อผลลัพท์
             }, // [{... userData, student:{userID:[objectID]}},...]
          },
          { $unwind: "$student" },
          {
             $match: {
                "student.firstname" : {$regex: tmp ,$options:'i'},
             },
          },
          {
            $count: "count"
          }
       ])
       .exec();
       /*[
            {
                "count": 1
            }
         ] */

    let count = temp[0].count;
    console.log(count);

    const totalDocs = count;
    const totalPages = Math.ceil( count/limit );
    const pagingCounter = (page-1)*limit +1 ;
    const hasPrevPage = page!=1;
    const hasNextPage = page<totalPages;
    let prevPage = null;
    if (hasPrevPage){
        prevPage = parseInt(page)-1;
    }
    let nextPage = null;
    if(hasNextPage){
        nextPage = parseInt(page)+1;
    }

    let _docs = await userModel
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
             foreignField: "userID", // student
             as: "student", // ชื่อผลลัพท์
          }, // [{... userData, student:{userID:[objectID]}},...]
       },
       { $unwind: "$student" },
       {
          $match: {
             "student.firstname" : {$regex: tmp ,$options:'i'},
          },
       },
       { $sort: {
        email:1
        }},
        {
         $skip: limit*(page-1)
        },
       {
        $limit: limit
       }
    ])
    .exec();

    let docs = [];
    for(let i=0;i<_docs.length;i++){
        let tmp1 = _docs[i].student;
        console.log('asfghj', tmp1);
        docs.push(tmp1);
    }

    res.send({docs,totalDocs,limit,totalPages,page,pagingCounter,hasPrevPage,hasNextPage,prevPage,nextPage});
}

module.exports = getSchoolStudent;
