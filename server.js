const express = require('express');
const app = express();
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use("/assets", express.static("assets"));

app.get('/home', (request,response) => {
    response.render('home')
})
app.get('/account', (request,response) => {
    response.render('account')
})
app.get('/login', (request,response) => {
    response.render('login')
})

app.listen(2000);