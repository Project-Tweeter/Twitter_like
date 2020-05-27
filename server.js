const express = require('express');
const app = express();
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use("/assets", express.static("assets"));

app.get('/', (request,response) => {
    // response.send("bonjour")
    response.render('home')
})


app.listen(2000);