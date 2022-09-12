const ClubModel = require("../../models/club");

const deleteClub = async (req, res) =>{
    clubIDs = req.body.clubIDs
    console.log(clubIDs)
    for(let i=0; i<clubIDs.length; i++)
    {
        let _club = await ClubModel.findById(clubIDs[i])
        if(!_club)
        {
            return res.status(400).json({"success":false}).end()
        }
    }
    for(let i=0; i<clubIDs.length; i++)
    {
        await ClubModel.findByIdAndDelete(clubIDs[i])
    }
    res.json({'success': true})
}

module.exports = deleteClub;