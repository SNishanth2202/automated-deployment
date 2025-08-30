const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/blog")

const contact = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";

const about = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.";

let publish = { "Home": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." };

const publishSchema = {
    title: String,
    info: String
};

const Content = mongoose.model("Content", publishSchema);

app.get('/', function (req, res) {
    Content.find().then(contents => {
        if (contents.length == 0) {
            console.log("Nothing in here");
        }
        else {
            res.render("home",{publish: contents});
        }
    })
})

app.get('/contact', function (req, res) {
    res.render("contact", { para:contact });
})

app.get('/about', function (req, res) {
    res.render("about", { para: about });
})

app.get('/compose', function (req, res) {
    res.render('compose');
})

app.post('/compose', function (req,res) {
    publish[req.body.heading] = req.body.publish;
    Content.find({ title: req.body.heading }).then(contents => {
        if (contents.length === 0) {
            const item = new Content({
                title: req.body.heading,
                info: req.body.publish
            });
            item.save();
            res.redirect('/compose');
        }
        else {
            res.redirect('/');
        }
    });
})

app.get("/posts/:postname", function (req, res) {
    let postname = req.params.postname;
    res.render("post", {postname : postname, publish: publish});
})

app.listen(3000, function () {
    console.log("the app is serving in the port 3000");
})