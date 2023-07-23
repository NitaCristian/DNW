// Import packages and middlewares
const express = require('express');
const sqlite3 = require('sqlite3')
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts')
const blogSettingsRepository = require('./repositories/blogSettingsRepository')
const handleErrors = require('./middleware/errorMiddleware')
const userInResponse = require('./middleware/userInResponseMiddleware')

// Create the Express.js app
const app = express();

// Create a session to store the current user
app.use(session({
    secret: 'thisismysecretkeyplasedonthack', resave: false, saveUninitialized: false
}));

// Use middleware to set the user data in each response
app.use(userInResponse)

// Use middleware to catch errors and handle them
app.use(handleErrors)

// Set the app to use ejs for rendering
app.set('view engine', 'ejs');

// Use layout files with views
app.use(expressLayouts)
// Set the views directory
app.set('views', __dirname + '/views/')
// Set the layouts directory
app.set('layout', 'shared/layout')

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Create a connection to the database in the global namespace to be accessible throughout the node application
global.db = new sqlite3.Database('./database.db', function (err) {
    if (err) {
        console.error(err);
        process.exit(1); //Bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
    }
});

// Retrieve title and description of the blog from the database
async function fetchBlogSettings() {
    try {
        const row = await blogSettingsRepository.get();
        global.title = row.title;
        global.description = row.description;
        global.subtitle = row.subtitle;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

fetchBlogSettings();

// Middleware for serving static files
app.use('/public', express.static(__dirname + '/public'))
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons'))

// Import the routes of the app
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes')
const homeRoutes = require('./routes/homeRoutes')
const commentRoutes = require('./routes/commentRoutes')

// Use the imported routes
app.use('/', homeRoutes)
app.use('/user', userRoutes);
app.use('/articles', articleRoutes)
app.use('/comments', commentRoutes)

// Start the application
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}! You can access it at: http://localhost:${port}.`)
})

