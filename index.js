const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');

app.use(session({
    secret: 'your-secret-key', resave: false, saveUninitialized: false
}));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware for method overriding
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//items in the global namespace are accessible throughout the node application
global.db = new sqlite3.Database('./database.db', function (err) {
    if (err) {
        console.error(err);
        process.exit(1); //Bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
    }
});

// Middleware for serving static files
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// TODO: Add a middleware for handling errors
// TODO: Add error pages such as 404 and 512

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes')
const homeRoutes = require('./routes/homeRoutes')

//set the app to use ejs for rendering
app.set('view engine', 'ejs');

//this adds all the userRoutes to the app under the path /user
app.use('/', homeRoutes)
app.use('/users', userRoutes);
app.use('/articles', articleRoutes)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}! You can access it at: http://localhost:${port}.`)
})

