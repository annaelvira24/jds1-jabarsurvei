const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// var session = require('express-session');
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "testing" });
});

const adminRoutes = require('./app/routes/admin.routes')
// using as middleware
app.use('/api/admin', adminRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const listSurveyRoutes = require('./app/routes/listSurvey.routes')
app.use('/api/listSurvey', listSurveyRoutes);

const surveyAdminRoutes = require('./app/routes/surveyAdmin.routes')
app.use('/api/surveyAdmin', surveyAdminRoutes);

const surveyLinkRoutes = require('./app/routes/surveyLink.routes')
app.use('/api/surveyLink', surveyLinkRoutes);