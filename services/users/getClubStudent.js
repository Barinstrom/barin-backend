const { default: mongoose } = require('mongoose');
const logModel = require('../../models/registerLogs');
const studentModel = require('../../models/student');

const getClubStudent = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 1;
    let tmp = ""
    if (req.query.query)
       tmp = new RegExp("^" + req.query.query );
    if(!req.query || !req.query.clubID ){
        return res.status(400).send({
            "success":false,
            "message":"clubID is required"
        })
    }
    const clubID = req.query.clubID;

    let _docs = await logModel
    .aggregate([
       {
          $match:
             // {role:"teacher"}
             {
                $and: [
                   { clubID: new mongoose.mongo.ObjectId(clubID) },
                ],
             },
       },
       {
          $lookup: {
             from: "students", // ตารางที่อยาก join
             localField: "studentID", // user
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
        date:1
        }}
    ])
    .exec(); 

    let docs = [];
    for(let i=0;i<_docs.length;i++){
        if(_docs[i].action == 'register'){
            docs.push(_docs[i]);
        }
        if(_docs[i].action == 'drop'){
            for(let j=0;j<docs.length;j++){
                if(_docs[i].student.userID.toString() == docs[j].student.userID.toString()){
                    docs.splice(j,1);
                    break;
                }
            }
        }
    }

    let count = docs.length;

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
    let finalDocs = [];
    for(let i=limit*(page-1);i<limit*(page-1)+limit;i++){
        finalDocs.push(docs[i].student);
    }
    res.send({docs: finalDocs,totalDocs,limit,totalPages,page,pagingCounter,hasPrevPage,hasNextPage,prevPage,nextPage});
}

module.exports = getClubStudent;