const express = require('express');
const { status } = require('express/lib/response');
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
app.get('/movies/read/:id?',(req,res)=>{
    const {id} = req.params;
    if(id > movies.length){
       res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`});
}
else
    res.status(200).json({status:200, data:movies[id-1]});
})
app.get('/movies/add/:title?/:year?/:rating?',(req,res)=>{
    const {title,year,rating} = req.params;
    if(!title || !year){
        res.status(403).json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'}
    )
    }
    else if(year.length !== 4 || isNaN(year)){
        res.status(403).json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'}

        )
    }
    else if(!rating){
        const newMovie = {title:title, year:year, rating:4};
        movies.push(newMovie);
        res.status(200).json({status:200, message:"movie added with default rating of 4"})

    }
    else{
        const newMovie = {title:title, year:year, rating:rating};
        movies.push(newMovie);
        res.status(200).json({status:200, message:"movie added"})
    }

})
app.get("/movies/delete/:id?",(req,res)=>{
    const {id} = req.params;
    if(id > movies.length)
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`})
    else if (id == 1){
    movies.shift()
    res.status(404).json({status:404,  message:`the movie  with id ${id} has been deleted`})
    }
    else{
        res.status(404).json({status:404,  message:`the movie  with id ${id} has been deleted`})
        movies.splice(id-1,id-1)
    }
})
app.get("/movies/update/:id?/:title?",(req,res)=>{
    const {id,title} = req.params;
    if(id > movies.length)
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`})
    else
        res.status(404).json({status:404,  message:`the movie with ${id} has been updated`})
        movies[id-1].title = title;
})
app.get("/movies/update/:id?/:title?/:rating?",(req,res)=>{
    const {id,title,rating} = req.params;
    if(id > movies.length)
        res.status(404).json({status:404, error:true, message:`the movie ${id} does not exist`})
    else
        res.status(404).json({status:404,  message:`the movie with ${id} has been updated`})
        movies[id-1].title = title;
        movies[id-1].rating = rating;

})
    


app.listen(3000);