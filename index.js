const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("ok");
})
app.get('/test',(req,res)=>{
    res.status(200).json({status:200, message:"ok"});
})
app.get('/time',(req,res)=>{
    const date = new Date();
    const hours = date.getHours().toString()
    const minute = date.getMinutes().toString()
    const time = `${hours}:${minute}`;
    res.status(200).json({status:200, message:time})
})
app.listen(3000);