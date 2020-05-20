const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//const handlebarHelpers = require('./handlebars-helpers');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const csvToJson = require('csvtojson');
const request = require("request");

// set up session
app.use(session({
    secret: 'joifhjoweifoikwenfokerjnofmweakmndlew',
    resave: false,
    saveUninitialized: false
}));
// Include controllers
const errorController = require('./controllers/error');

// Set up express-handlebars
app.engine('handlebars', exphbs({ default: 'main' }));
app.set('view engine', 'handlebars');

csvToJson().fromStream(request.get("https://raw.githubusercontent.com/dsfsi/covid19za/master/data/lockdown/covid19za_provincial_cumulative_timeline_lockdown.csv"))
    .then(source => {
        console.log(source);

    });
// Include routers
//const homeRoutes = require('./routes/home');

// Set up server related variable
// TODO Change to port 80
const port = 3000;

// add middle-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


app.use(flash());
app.use((req, res, next) => {
    // safe user info
    res.locals.user = req.user;
    // reminder message
    res.locals.reminder = req.flash('reminder');
    // error message
    res.locals.error = req.flash('error');
    // success message
    res.locals.success = req.flash('success');
    next()
});

// use method-override to override using a query value
app.use(methodOverride('_method'));

// serve static files
app.use(express.static('public'));

// home route
//app.use('/', homeRoutes);

app.use(errorController.getError);

// Start and listen to server
app.listen(process.env.PORT || port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
});
