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
app.get('/hello/:id?',(req,res)=>{
    const {id} = req.params;
    if(id)
        res.status(200).json({status:200, message:"hello", id});
    else
        res.status(200).json({status:200, message:"hello"});

})
app.get('/search',(req,res)=>{
    const search = req.query.s;
    if(search)
        res.status(200).json({status:200, message:"ok", data:search})
    else
    res.status(500).json({status:500, error:true, message:"you have to provide a search"});
})
app.listen(3000);