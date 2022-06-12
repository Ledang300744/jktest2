var express = require("express");
var router = express.Router();
var contests = require("../controls/contests");
var problems = require("../controls/problems");
var contest_problem = require("../controls/contest_problem");
var enforceAuthentication = require("../controls/auth").enforceAuthentication;
/**Getting the homepage */
// router.get("/", (req, res) => {
//     res.render("index");
// });
router.get("/", problems.recentProbNrank);

/**Display the contribution page */
router.get("/contribution", (req, res) => {
  res.render("contribution");
});

router.get('/viewfileuser', problems.viewfile1);  
/**Display the user contest page */
router.get("/contests", contests.showContests);

/**Display the contest */
router.get("/contests/:contestCode", contests.showContest);

/**Display the ranklist */
router.get("/contests/:contestCode/standings", contests.ranklist);

/**Display the problem set visible to the users */
router.get("/problems/all", problems.problemSet);

/**Display the problem with qID */
router.get("/problem/:qID",enforceAuthentication(true, false), problems.displayProblem);

/**Display the user ranklist page */
router.get("/rankings", problems.userRankings);

/**Display the IDE page */
router.get("/ide", problems.getIde);

/**POST: submitting the IDE code, input */
router.post("/ide", problems.postIde);

/**Display the contest problem */
router.get("/contests/:contestCode/:qID" ,enforceAuthentication(true, false), contest_problem.displayProblem);


/**Display the page Suggestions */
router.get("/choose_subjects",problems.chooseSubjects);

/**Display question Subjects  */
router.get("/question_subjects/:idSubject",enforceAuthentication(true, false),problems.questionSubjects);
/**Display About Us page*/
router.get("/about", problems.about);

module.exports = router;
