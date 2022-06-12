var express = require("express");

var csv = require("fast-csv");
var bodyParser = require("body-parser");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");
var favicon = require("serve-favicon");
var expressValidator = require("express-validator");
var session = require("express-session");
//var configDb = require("./config/database");
var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var publicRoute = require("./routes/index");
var adminRoute = require("./routes/admin");
var usersRoute = require("./routes/users");
var problems = require("./controls/problems");
var enforceAuthentication = require("./controls/auth").enforceAuthentication;
var lang = require("./config/lang");

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
mongoose.Promise = global.Promise;
// mongoose.connect(configDb.database, { useNewUrlParser: true });
// var db = mongoose.connection;

// db.once("open", () => {
//     ("MongoDB connected!");
// });

// db.on("error", (err) => {
//     console.log(err);
// });

// try {
//   await mongoose.connect('mongodb://localhost:27017/coderace', { useNewUrlParser: true ,useUnifiedTopology: true});
// } catch (error) {
//   console.log(error);
// }

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  function (err, db) {
    if (err) {
      throw err;
    }
    console.log("MongoDB connected!");
  }
);

var Question = require("./models/problems");
Question.deleteMany({name: ""}, function (err,res) {
  if (err) throw err;
});
var app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.json({ limit: "30MB", extended: true }));
app.use(express.urlencoded({ limit: "30MB", extended: true }));
app.engine("html", require("ejs").renderFile);
app.use(favicon(__dirname + "/public/photos/favicon.png"));
app.use(express.static(path.join(__dirname, "public")));

// Express-session-middleware
app.use(
  session({
    secret: "code-race-session",
    resave: true,
    saveUninitialized: true,
  })
);

// Express-validator-middleware
app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

var user = require("./models/users");
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.listen(port, () => {
  console.log("Server started at port " + port);
});

/**GET: Setting global variable for the logged in user */
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  console.log("User: " + res.locals.user);
  next();
});

/**POST: Setting global variable for the logged in user */
app.post("*", (req, res, next) => {
  res.locals.user = req.user || null;
  console.log("User: " + res.locals.user);
  next();
});

app.use("/", publicRoute);
app.use("/user", usersRoute);
app.use('/filedocument', express.static('filedocument'));
app.use('/fileexcel', express.static('fileexcel'));
app.use('/latex.js-0.12.4', express.static('latex.js-0.12.4'));
app.use("/admin", enforceAuthentication(true, true), adminRoute);


/**Display the page to submit problem qID */

app.post(
  "/contests/:contestCode/submit/:qID",
  enforceAuthentication(true, false),
  problems.submitContestSolution
);
app.post(
  "/contests/:contestCode/submit/test/:qID",
  enforceAuthentication(true, false),
  problems.submitContestSolutionTest
);
app.post(
  "/submit/test/:qID",
  enforceAuthentication(true, false),
  problems.submitSolutionTest
);


/**POST: submitting the problem qID */
app.post(
  "/submit/:qID",
  enforceAuthentication(true, false),
  problems.submitSolution
);

/**POST: after clicking the submit button on the problem display page */
app.post("/problem/:qID", (req, res, next) => {
  res.redirect("/submit/" + req.params.qID);
});

/**Display page when error 404: page not found occur */
app.use((req, res, next) => {
  res.status(404);
  res.render("not_found");
});

exports = module.exports = app;
