const StudentModel = require("../../models/student");

const getStudentPastClubs = async (req, res) => {
    const student = await StudentModel.findOne({
       userID: new mongoose.mongo.ObjectId(req.userInfo._id),
    });
    let clubsID = student.clubs;
    let pastclubs = [];
    for (let i = 0; i < clubsID.length; i++) {
       clubs.push(await clubModel.find({$and:[{ '_id': clubsID[i] }, { status: { $ne: 'Studying' }}]}));
    }
    res.json({ clubs: pastclubs });
 };
 
 module.exports = getStudentPastClubs;