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

const fBuilderRoutes = require('./app/routes/fBuilder.routes')
app.use('/api/fBuilder', fBuilderRoutes);

const submitRoutes = require('./app/routes/submit.routes')
app.use('/api/submit', submitRoutes);

const surveyFillRoutes = require('./app/routes/surveyFill.routes')
app.use('/api/surveyFill', surveyFillRoutes);

const surveyResRoutes = require('./app/routes/surveyRes.routes')
app.use('/api/surveyRes', surveyResRoutes);
