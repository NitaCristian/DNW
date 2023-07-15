const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts')
const blogSettingsRepository = require('./repositories/blogSettingsRepository')
const handleErrors = require('./middleware/errorMiddleware')

app.use(session({
    secret: 'thisismysecretkeyplasedonthack', resave: false, saveUninitialized: false
}));

// Middleware to set user object in response locals
app.use((req, res, next) => {
    if (req.session) res.locals.user = req.session.user; else res.locals.user = null;
    next();
});

app.use(handleErrors)


//set the app to use ejs for rendering
app.set('view engine', 'ejs');
app.use(expressLayouts)
app.set('views', __dirname + '/views/')
app.set('layout', 'shared/layout')

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

async function fetchBlogSettings() {
    try {
        const row = await blogSettingsRepository.get();
        global.title = row.title;
        global.description = row.description;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fetchBlogSettings();


// Middleware for serving static files
app.use('/public', express.static(__dirname + '/public'))
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons'))

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes')
const homeRoutes = require('./routes/homeRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use('/', homeRoutes)
app.use('/user', userRoutes);
app.use('/articles', articleRoutes)
app.use('/comments', commentRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}! You can access it at: http://localhost:${port}.`)
})

