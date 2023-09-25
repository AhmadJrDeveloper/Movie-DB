const express = require('express');
const app = express();
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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
        res.status(200).json({status:200, message:"ok", data:search});
    else
        res.status(500).json({status:500, error:true, message:"you have to provide a search"});
})
app.get('/movies/create',(req,res)=>{
})
app.get('/movies/read',(req,res)=>{
    res.status(200).json({status:200, data:movies});
})
app.get('/movies/update',(req,res)=>{
})
app.get('/movies/delete',(req,res)=>{
})
app.get('/movies/read/by-date',(req,res)=>{
    movies.sort((a,b)=>
    a.year-b.year);
    res.status(200).json({status:200, data:movies});
})
app.get('/movies/read/by-rate',(req,res)=>{
    movies.sort((a,b)=>
    b.rating-a.rating);
    res.status(200).json({status:200, data:movies});
})
app.get('/movies/read/by-title',(req,res)=>{
    movies.sort((a,b)=>
    a.title.localeCompare(b.title));
    res.status(200).json({status:200, data:movies});
})
app.listen(3000);