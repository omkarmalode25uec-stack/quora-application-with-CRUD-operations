const express = require('express');
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
app.set('view engine', 'ejs');
const { v4: uuidv4 } = require("uuid");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
let posts = [
    {
        id: uuidv4(),
        username: "vishnu",
        content: "i `completed my vlsi design course",
    },
    {
        id: uuidv4(),
        username: "unnati",
        content: "i selected for the Lr of our dept",
    },
    {
        id: uuidv4(),
        username: "renuka",
        content: "i became the CR of my class",
    }
]
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { content } = req.body;

    let post = posts.find((p) => p.id === id);

    post.content = content;

    res.redirect("/posts");
});
app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
})
app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    res.render("edit.ejs",{post:posts.find((p)=>p.id===id)});
    res.redirect("/posts");
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
 posts=posts.filter((p)=>p.id!==id);
    res.redirect("/posts");
})
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });

})

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
})