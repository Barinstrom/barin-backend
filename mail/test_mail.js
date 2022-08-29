const {sender} = require("./mail.js")
const express = require("express");
const app = express();


// ใช้ในการทำbody-parser middleware
app.use(express.json());


app.post('/mail', async (req, res)=>{
    const payload = req.body
    sender(payload.email, payload.userId)
    // console.log(payload)
    res.send("send sucess").status(200).end()
})      

app.listen(3000, () => {
    console.log('Application is running on port 3000');
});