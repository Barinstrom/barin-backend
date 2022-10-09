const StudentModel = require("../../models/student");
const ClubModel = require("../../models/club");

const updateStudyStatus = async (req, res) => {
    const clubID = req.body.clubID
    const _club = await ClubModel.findById(clubID)
    if(!_club)
       return res.status(400).send("Invalid clubID")
        
    const docs = req.body.doc

    for(let i=0;i<docs.length;i++){
        student = await StudentModel.findOne({
            firstname: docs[i].firstname,
            lastname: docs[i].lastname,
         });
         if (!student)
            return res.status(400).send({ error: "Some student doesn't exist." });
        
        for(let j=0;j<student.clubs.length;j++){
            if(student.clubs[j].clubID == clubID ){
                student.clubs[j].status = docs[i].status
                
            }
        }

        await student.save();
    }
    
    res.json({ 'success': true });
};

module.exports = updateStudyStatus;